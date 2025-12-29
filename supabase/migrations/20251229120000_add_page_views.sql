-- Create table to record page views
CREATE TABLE public.page_views (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    path TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (we'll use client-side insert with rate-limiting via localStorage)
CREATE POLICY "Allow public inserts for page_views" ON public.page_views
  FOR INSERT
  USING (true)
  WITH CHECK (true);

-- Allow public selects so admin dashboard can read the total count
CREATE POLICY "Allow public select for page_views" ON public.page_views
  FOR SELECT
  USING (true);
