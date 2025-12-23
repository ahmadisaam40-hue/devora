import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, requestId } = await req.json();
    console.log(`Admin requests action: ${action}`);

    if (action === 'list') {
      const { data, error } = await supabase
        .from('project_requests')
        .select(`
          *,
          projects (
            id,
            title,
            category
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} requests`);
      return new Response(
        JSON.stringify({ requests: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'mark-read') {
      const { error } = await supabase
        .from('project_requests')
        .update({ is_read: true })
        .eq('id', requestId);

      if (error) {
        console.error('Error marking request as read:', error);
        throw error;
      }

      console.log('Request marked as read:', requestId);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'delete') {
      const { error } = await supabase
        .from('project_requests')
        .delete()
        .eq('id', requestId);

      if (error) {
        console.error('Error deleting request:', error);
        throw error;
      }

      console.log('Request deleted:', requestId);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Admin requests error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
