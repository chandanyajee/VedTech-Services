-- Disable RLS on CRM tables since the application uses custom authentication
-- Access control is handled at the application level with admin_users table and localStorage

-- List of CRM tables to update
-- leads, email_campaigns, customer_segments, call_logs, meetings, tasks, customer_feedback, customer_interactions

-- LEADS TABLE
DROP POLICY IF EXISTS "Allow CRM managers to view leads" ON public.leads;
DROP POLICY IF EXISTS "Allow CRM managers to insert leads" ON public.leads;
DROP POLICY IF EXISTS "Allow CRM managers to update leads" ON public.leads;
DROP POLICY IF EXISTS "Allow CRM managers to delete leads" ON public.leads;
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.leads IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';

-- EMAIL_CAMPAIGNS TABLE
DROP POLICY IF EXISTS "Allow CRM managers to view campaigns" ON public.email_campaigns;
DROP POLICY IF EXISTS "Allow CRM managers to insert campaigns" ON public.email_campaigns;
DROP POLICY IF EXISTS "Allow CRM managers to update campaigns" ON public.email_campaigns;
DROP POLICY IF EXISTS "Allow CRM managers to delete campaigns" ON public.email_campaigns;
ALTER TABLE public.email_campaigns DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.email_campaigns IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';

-- CUSTOMER_SEGMENTS TABLE
DROP POLICY IF EXISTS "Allow CRM managers to view segments" ON public.customer_segments;
DROP POLICY IF EXISTS "Allow CRM managers to insert segments" ON public.customer_segments;
DROP POLICY IF EXISTS "Allow CRM managers to update segments" ON public.customer_segments;
DROP POLICY IF EXISTS "Allow CRM managers to delete segments" ON public.customer_segments;
ALTER TABLE public.customer_segments DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.customer_segments IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';

-- CALL_LOGS TABLE
DROP POLICY IF EXISTS "Allow CRM managers to view call logs" ON public.call_logs;
DROP POLICY IF EXISTS "Allow CRM managers to insert call logs" ON public.call_logs;
DROP POLICY IF EXISTS "Allow CRM managers to update call logs" ON public.call_logs;
DROP POLICY IF EXISTS "Allow CRM managers to delete call logs" ON public.call_logs;
ALTER TABLE public.call_logs DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.call_logs IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';

-- MEETINGS TABLE
DROP POLICY IF EXISTS "Allow CRM managers to view meetings" ON public.meetings;
DROP POLICY IF EXISTS "Allow CRM managers to insert meetings" ON public.meetings;
DROP POLICY IF EXISTS "Allow CRM managers to update meetings" ON public.meetings;
DROP POLICY IF EXISTS "Allow CRM managers to delete meetings" ON public.meetings;
ALTER TABLE public.meetings DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.meetings IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';

-- TASKS TABLE
DROP POLICY IF EXISTS "Allow CRM managers to view tasks" ON public.tasks;
DROP POLICY IF EXISTS "Allow CRM managers to insert tasks" ON public.tasks;
DROP POLICY IF EXISTS "Allow CRM managers to update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Allow CRM managers to delete tasks" ON public.tasks;
ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.tasks IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';

-- CUSTOMER_FEEDBACK TABLE (the old one from CRM)
DROP POLICY IF EXISTS "Allow CRM managers to view feedback" ON public.customer_feedback;
DROP POLICY IF EXISTS "Allow CRM managers to insert feedback" ON public.customer_feedback;
DROP POLICY IF EXISTS "Allow CRM managers to update feedback" ON public.customer_feedback;
DROP POLICY IF EXISTS "Allow CRM managers to delete feedback" ON public.customer_feedback;
ALTER TABLE public.customer_feedback DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.customer_feedback IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';

-- CUSTOMER_INTERACTIONS TABLE
DROP POLICY IF EXISTS "Allow CRM managers to view interactions" ON public.customer_interactions;
DROP POLICY IF EXISTS "Allow CRM managers to insert interactions" ON public.customer_interactions;
ALTER TABLE public.customer_interactions DISABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.customer_interactions IS 'Access control handled at application level via admin_users table. RLS disabled to support custom authentication system.';