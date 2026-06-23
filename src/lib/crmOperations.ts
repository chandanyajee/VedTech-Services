import { supabase } from '@/db/supabase';

export type CrmTable = 'leads' | 'meetings' | 'call_logs' | 'tasks' | 'email_campaigns';
export type CrmAction = 'CREATE' | 'UPDATE' | 'DELETE';

interface CrmOperationOptions {
  table: CrmTable;
  action: CrmAction;
  data?: Record<string, unknown>;
  record_id?: string;
}

interface CrmOperationResult {
  success: boolean;
  id?: string;
  errors?: string[];
  error?: string;
}

/**
 * Performs a validated + audited CRM operation via the Edge Function.
 * Returns { success, id } on success, { success: false, errors } on validation failure.
 */
export async function crmOperation(opts: CrmOperationOptions): Promise<CrmOperationResult> {
  const adminId    = localStorage.getItem('vts_admin_id')    ?? undefined;
  const adminEmail = localStorage.getItem('vts_admin_email') ?? undefined;
  const adminRole  = localStorage.getItem('vts_admin_role')  ?? undefined;

  const { data, error } = await supabase.functions.invoke('crm-validate-and-log', {
    body: {
      table:      opts.table,
      action:     opts.action,
      data:       opts.data,
      record_id:  opts.record_id,
      admin_id:   adminId,
      admin_email: adminEmail,
      admin_role:  adminRole,
    },
  });

  if (error) {
    // Try to extract a structured error message from the edge function
    const raw = await error?.context?.text?.().catch(() => null);
    let parsed: { error?: string; errors?: string[]; valid?: boolean } = {};
    try { parsed = raw ? JSON.parse(raw) : {}; } catch { /* noop */ }

    if (parsed.errors?.length) {
      return { success: false, errors: parsed.errors };
    }
    return { success: false, error: parsed.error ?? error.message ?? 'Operation failed.' };
  }

  if (data && data.valid === false) {
    return { success: false, errors: data.errors ?? ['Validation failed.'] };
  }

  return { success: true, id: data?.id };
}

// ─── Client-side pre-validation helpers (instant feedback before API call) ───

export function validateEmailFormat(email: string): string | null {
  if (!email.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Email address is not valid.';
  return null;
}

export function validatePhoneFormat(phone: string): string | null {
  if (!phone) return null; // phone is optional
  const cleaned = phone.replace(/[\s\-().]/g, '');
  if (!/^\+?[0-9]{7,15}$/.test(cleaned)) return 'Phone number format is invalid (e.g. +91 9876543210).';
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value?.trim()) return `${fieldName} is required.`;
  return null;
}
