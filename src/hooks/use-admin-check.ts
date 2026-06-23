import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';

export type AdminCheckState = 'loading' | 'valid' | 'invalid' | 'no-session';

export function useAdminCheck() {
  const [state, setState] = useState<AdminCheckState>('loading');
  const [adminName, setAdminName] = useState<string>('');

  useEffect(() => {
    const adminId = localStorage.getItem('vts_admin_id');
    const adminAuth = localStorage.getItem('vts_admin_auth');

    if (!adminAuth || !adminId) {
      setState('no-session');
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await (supabase
          .from('admin_users') as any)
          .select('id, full_name, is_active')
          .eq('id', adminId)
          .eq('is_active', true)
          .maybeSingle();

        if (cancelled) return;

        if (error || !data) {
          setState('invalid');
        } else {
          setAdminName(data.full_name || '');
          setState('valid');
        }
      } catch {
        if (!cancelled) setState('invalid');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { state, adminName };
}
