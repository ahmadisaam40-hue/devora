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

    const { action, project, projectId } = await req.json();
    // Bucket name for project images (configurable via env)
    const BUCKET = Deno.env.get('PROJECT_IMAGES_BUCKET') || 'project-images';
    console.log(`Admin projects action: ${action}`);

    async function downloadAndUploadImage(url: string) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch remote image');
        const arrayBuffer = await res.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        // derive extension from content-type or url
        const contentType = res.headers.get('content-type') || '';
        let ext = '';
        if (contentType.startsWith('image/')) ext = contentType.split('/')[1].split(';')[0];
        if (!ext) {
          const parts = url.split('?')[0].split('/');
          const last = parts[parts.length - 1] || '';
          if (last.includes('.')) ext = last.split('.').pop() || 'png';
        }
        if (!ext) ext = 'png';
        const filePath = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from(BUCKET).upload(filePath, uint8, { contentType });
        if (uploadError) throw uploadError;
        const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
        return publicData.publicUrl;
      } catch (err) {
        console.error('downloadAndUploadImage error', err);
        throw err;
      }
    }

    if (action === 'create') {
      // If a remote image URL is supplied, fetch it and upload to storage
      // Skip if the URL already points to the configured bucket public path
      if (
        project &&
        project.image_url &&
        project.image_url.startsWith('http') &&
        !project.image_url.includes(`/storage/v1/object/public/${BUCKET}/`)
      ) {
        try {
          project.image_url = await downloadAndUploadImage(project.image_url);
        } catch (err) {
          console.error('Image fetch/upload failed', err);
          return new Response(
            JSON.stringify({ error: 'Image fetch/upload failed' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          description: project.description,
          category: project.category,
          image_url: project.image_url,
          technologies: project.technologies || [],
          features: project.features || [],
          demo_url: project.demo_url
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        throw error;
      }

      console.log('Project created:', data.id);
      return new Response(
        JSON.stringify({ success: true, project: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'update') {
      // If a remote image URL is supplied, fetch it and upload to storage
      // Skip if the URL already points to the configured bucket public path
      if (
        project &&
        project.image_url &&
        project.image_url.startsWith('http') &&
        !project.image_url.includes(`/storage/v1/object/public/${BUCKET}/`)
      ) {
        try {
          project.image_url = await downloadAndUploadImage(project.image_url);
        } catch (err) {
          console.error('Image fetch/upload failed', err);
          return new Response(
            JSON.stringify({ error: 'Image fetch/upload failed' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      const { data, error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description,
          category: project.category,
          image_url: project.image_url,
          technologies: project.technologies || [],
          features: project.features || [],
          demo_url: project.demo_url
        })
        .eq('id', projectId)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        throw error;
      }

      console.log('Project updated:', projectId);
      return new Response(
        JSON.stringify({ success: true, project: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'delete') {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        console.error('Error deleting project:', error);
        throw error;
      }

      console.log('Project deleted:', projectId);
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
    console.error('Admin projects error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
