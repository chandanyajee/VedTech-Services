-- Disable RLS on engineers table since the application uses custom authentication
-- Access control is handled at the application level with admin_users table and localStorage

-- Drop all existing RLS policies on engineers table
DROP POLICY IF EXISTS "Allow public to view engineers" ON public.engineers;
DROP POLICY IF EXISTS "Allow admins to insert engineers" ON public.engineers;
DROP POLICY IF EXISTS "Allow admins to update engineers" ON public.engineers;
DROP POLICY IF EXISTS "Allow admins to delete engineers" ON public.engineers;
DROP POLICY IF EXISTS "Anyone can view engineers" ON public.engineers;

-- Disable RLS on engineers table
ALTER TABLE public.engineers DISABLE ROW LEVEL SECURITY;

-- Add comment explaining the security model
COMMENT ON TABLE public.engineers IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';