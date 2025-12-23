-- Create enum for project categories
CREATE TYPE public.project_category AS ENUM ('student', 'business');

-- Create enum for request types
CREATE TYPE public.request_type AS ENUM ('trial', 'graduation');

-- Create projects table for portfolio
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category project_category NOT NULL,
    image_url TEXT,
    technologies TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    demo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project requests table (only admin can view)
CREATE TABLE public.project_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    request_type request_type NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_id UUID REFERENCES public.projects(id),
    details TEXT NOT NULL,
    company_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_read BOOLEAN DEFAULT false
);

-- Create admin_passwords table for secret route authentication
CREATE TABLE public.admin_passwords (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_passwords ENABLE ROW LEVEL SECURITY;

-- Projects are publicly readable (for portfolio display)
CREATE POLICY "Projects are publicly readable"
ON public.projects
FOR SELECT
USING (true);

-- No public access to project_requests (admin only via edge function)
-- No policies needed since we'll use service role in edge function

-- No public access to admin_passwords
-- Admin will authenticate via edge function with service role

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();