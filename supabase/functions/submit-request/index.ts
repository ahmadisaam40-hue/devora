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

    const { request } = await req.json();
    console.log('Submitting new request:', request.request_type);

    // Validate required fields
    if (!request.name || !request.email || !request.details || !request.request_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data, error } = await supabase
      .from('project_requests')
      .insert({
        request_type: request.request_type,
        name: request.name,
        email: request.email,
        phone: request.phone || null,
        project_id: request.project_id || null,
        details: request.details,
        company_name: request.company_name || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting request:', error);
      throw error;
    }

    console.log('Request submitted successfully:', data.id);
    return new Response(
      JSON.stringify({ success: true, request: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Submit request error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
