import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { adminId } = await req.json();
    if (!adminId) throw new Error('adminId is required');

    // Service-role client (needed for auth admin API + table writes)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Mark as inactive in admin_users
    const { error: deactivateErr } = await supabase
      .from('admin_users')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', adminId);
    if (deactivateErr) throw deactivateErr;

    // 2. Attempt to invalidate Supabase Auth sessions (if the admin also has a
    //    Supabase Auth account with the same UUID).
    //    signOut with scope='global' revokes all refresh tokens for the user.
    //    This is a best-effort step — it's fine if no auth account exists.
    try {
      await supabase.auth.admin.signOut(adminId, 'global');
    } catch (_) { /* no-op: admin_users may not have a matching auth account */ }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
