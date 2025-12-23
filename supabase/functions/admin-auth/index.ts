import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, password, newPassword } = await req.json();
    console.log(`Admin auth action: ${action}`);

    if (action === 'check-setup') {
      // Check if admin password is set up
      const { data, error } = await supabase
        .from('admin_passwords')
        .select('id')
        .limit(1);

      if (error) {
        console.error('Error checking setup:', error);
        throw error;
      }

      return new Response(
        JSON.stringify({ isSetup: data && data.length > 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'setup') {
      // Initial setup - create admin password
      const { data: existing } = await supabase
        .from('admin_passwords')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        return new Response(
          JSON.stringify({ error: 'Admin password already set up' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Simple hash for demo - in production use proper hashing
      const encoder = new TextEncoder();
      const data = encoder.encode(newPassword);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const { error } = await supabase
        .from('admin_passwords')
        .insert({ password_hash: hashHex });

      if (error) {
        console.error('Error setting up password:', error);
        throw error;
      }

      console.log('Admin password set up successfully');
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'login') {
      // Verify admin password
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const { data: passwords, error } = await supabase
        .from('admin_passwords')
        .select('password_hash')
        .limit(1);

      if (error) {
        console.error('Error verifying password:', error);
        throw error;
      }

      if (!passwords || passwords.length === 0) {
        return new Response(
          JSON.stringify({ error: 'Admin not set up' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const isValid = passwords[0].password_hash === hashHex;
      
      if (isValid) {
        // Generate a simple session token
        const tokenData = encoder.encode(`${Date.now()}-${Math.random()}`);
        const tokenBuffer = await crypto.subtle.digest('SHA-256', tokenData);
        const tokenArray = Array.from(new Uint8Array(tokenBuffer));
        const sessionToken = tokenArray.map(b => b.toString(16).padStart(2, '0')).join('');

        console.log('Admin login successful');
        return new Response(
          JSON.stringify({ success: true, token: sessionToken }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        console.log('Admin login failed - invalid password');
        return new Response(
          JSON.stringify({ error: 'Invalid password' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Admin auth error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
