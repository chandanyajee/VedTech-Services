import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// ─── Validators ──────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  // Accept E.164 (+91...) or local 10-digit formats
  const cleaned = phone.replace(/[\s\-().]/g, '');
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

function sanitizeText(s: string): string {
  return s.trim().replace(/\s+/g, ' ');
}

// ─── Validation rules per table ───────────────────────────────────────────────

interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized?: Record<string, unknown>;
}

function validateLead(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const estimatedDealValue = Number(data.estimated_deal_value ?? 0);
  const leadScore = data.lead_score !== undefined ? Number(data.lead_score) : undefined;

  if (!name) errors.push('Name is required.');
  else if (name.length < 2) errors.push('Name must be at least 2 characters.');
  else if (name.length > 100) errors.push('Name must not exceed 100 characters.');

  if (!email) errors.push('Email is required.');
  else if (!isValidEmail(email)) errors.push('Email address is not valid.');

  if (phone && !isValidPhone(phone)) errors.push('Phone number format is invalid.');

  if (isNaN(estimatedDealValue) || estimatedDealValue < 0)
    errors.push('Estimated deal value must be 0 or greater.');

  if (leadScore !== undefined && (isNaN(leadScore) || leadScore < 0 || leadScore > 100))
    errors.push('Lead score must be between 0 and 100.');

  const validSources = ['Website Form', 'Cold Call', 'Referral', 'Social Media', 'Trade Show', 'Email Campaign', 'Other'];
  if (data.lead_source && !validSources.includes(String(data.lead_source)))
    errors.push(`Lead source must be one of: ${validSources.join(', ')}.`);

  const validStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];
  if (data.lead_status && !validStatuses.includes(String(data.lead_status)))
    errors.push(`Lead status must be one of: ${validStatuses.join(', ')}.`);

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      ...data,
      name: sanitizeText(name),
      email: email.toLowerCase(),
      phone: phone || null,
      estimated_deal_value: estimatedDealValue,
    } : undefined,
  };
}

function validateMeeting(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const title = String(data.meeting_title ?? '').trim();
  const date = String(data.meeting_date ?? '').trim();

  if (!title) errors.push('Meeting title is required.');
  else if (title.length < 3) errors.push('Meeting title must be at least 3 characters.');

  if (!date) errors.push('Meeting date is required.');
  else if (isNaN(Date.parse(date))) errors.push('Meeting date is not a valid date.');

  const validTypes = ['In-Person', 'Phone', 'Video Call'];
  if (data.meeting_type && !validTypes.includes(String(data.meeting_type)))
    errors.push(`Meeting type must be one of: ${validTypes.join(', ')}.`);

  const validStatuses = ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'];
  if (data.meeting_status && !validStatuses.includes(String(data.meeting_status)))
    errors.push(`Meeting status must be one of: ${validStatuses.join(', ')}.`);

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      ...data,
      meeting_title: sanitizeText(title),
    } : undefined,
  };
}

function validateCallLog(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const duration = Number(data.call_duration ?? 0);

  if (isNaN(duration) || duration < 0)
    errors.push('Call duration must be 0 or greater.');

  const validTypes = ['Inbound', 'Outbound'];
  if (data.call_type && !validTypes.includes(String(data.call_type)))
    errors.push(`Call type must be one of: ${validTypes.join(', ')}.`);

  const validOutcomes = ['Answered', 'No Answer', 'Busy', 'Left Voicemail', 'Callback Requested'];
  if (data.call_outcome && !validOutcomes.includes(String(data.call_outcome)))
    errors.push(`Call outcome must be one of: ${validOutcomes.join(', ')}.`);

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      ...data,
      call_duration: duration,
    } : undefined,
  };
}

function validateTask(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const title = String(data.task_title ?? '').trim();
  if (!title) errors.push('Task title is required.');
  else if (title.length < 3) errors.push('Task title must be at least 3 characters.');

  const validStatuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
  if (data.task_status && !validStatuses.includes(String(data.task_status)))
    errors.push(`Task status must be one of: ${validStatuses.join(', ')}.`);

  const validPriorities = ['Low', 'Medium', 'High', 'Urgent'];
  if (data.priority && !validPriorities.includes(String(data.priority)))
    errors.push(`Priority must be one of: ${validPriorities.join(', ')}.`);

  if (data.due_date && isNaN(Date.parse(String(data.due_date))))
    errors.push('Due date is not a valid date.');

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      ...data,
      task_title: sanitizeText(title),
    } : undefined,
  };
}

function validateEmailCampaign(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const name = String(data.campaign_name ?? '').trim();
  const subject = String(data.email_subject ?? '').trim();

  if (!name) errors.push('Campaign name is required.');
  else if (name.length < 3) errors.push('Campaign name must be at least 3 characters.');

  if (!subject) errors.push('Email subject is required.');
  else if (subject.length < 5) errors.push('Email subject must be at least 5 characters.');
  else if (subject.length > 255) errors.push('Email subject must not exceed 255 characters.');

  const validStatuses = ['Draft', 'Scheduled', 'Sent', 'Paused', 'Cancelled'];
  if (data.campaign_status && !validStatuses.includes(String(data.campaign_status)))
    errors.push(`Campaign status must be one of: ${validStatuses.join(', ')}.`);

  if (data.scheduled_date && isNaN(Date.parse(String(data.scheduled_date))))
    errors.push('Scheduled date is not a valid date.');

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      ...data,
      campaign_name: sanitizeText(name),
      email_subject: sanitizeText(subject),
    } : undefined,
  };
}

// ─── Duplicate checks ─────────────────────────────────────────────────────────

async function checkLeadDuplicate(
  supabase: ReturnType<typeof createClient>,
  email: string,
  excludeId?: string
): Promise<boolean> {
  let query = supabase.from('leads').select('id').eq('email', email.toLowerCase());
  if (excludeId) query = query.neq('id', excludeId);
  const { data } = await query.limit(1);
  return (data?.length ?? 0) > 0;
}

async function checkCampaignDuplicate(
  supabase: ReturnType<typeof createClient>,
  name: string,
  excludeId?: string
): Promise<boolean> {
  let query = supabase.from('email_campaigns').select('id').ilike('campaign_name', name);
  if (excludeId) query = query.neq('id', excludeId);
  const { data } = await query.limit(1);
  return (data?.length ?? 0) > 0;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    const {
      table,        // 'leads' | 'meetings' | 'call_logs' | 'tasks' | 'email_campaigns'
      action,       // 'CREATE' | 'UPDATE' | 'DELETE'
      data,         // new record data
      record_id,    // existing record id (UPDATE / DELETE)
      admin_id,
      admin_email,
      admin_role,
    } = body;

    if (!table || !action) {
      return new Response(JSON.stringify({ error: 'table and action are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Validate ────────────────────────────────────────────────────────────
    let validationResult: ValidationResult = { valid: true, errors: [] };

    if (action !== 'DELETE' && data) {
      switch (table) {
        case 'leads':           validationResult = validateLead(data); break;
        case 'meetings':        validationResult = validateMeeting(data); break;
        case 'call_logs':       validationResult = validateCallLog(data); break;
        case 'tasks':           validationResult = validateTask(data); break;
        case 'email_campaigns': validationResult = validateEmailCampaign(data); break;
      }

      if (!validationResult.valid) {
        return new Response(JSON.stringify({ valid: false, errors: validationResult.errors }), {
          status: 422,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // ── Duplicate checks ────────────────────────────────────────────────
      if (table === 'leads' && data.email) {
        const isDuplicate = await checkLeadDuplicate(
          supabase, String(data.email), action === 'UPDATE' ? record_id : undefined
        );
        if (isDuplicate) {
          return new Response(
            JSON.stringify({ valid: false, errors: ['A lead with this email already exists.'] }),
            { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      if (table === 'email_campaigns' && data.campaign_name) {
        const isDuplicate = await checkCampaignDuplicate(
          supabase, String(data.campaign_name), action === 'UPDATE' ? record_id : undefined
        );
        if (isDuplicate) {
          return new Response(
            JSON.stringify({ valid: false, errors: ['A campaign with this name already exists.'] }),
            { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // ── Fetch old data for audit (UPDATE / DELETE) ───────────────────────
    let oldData: Record<string, unknown> | null = null;
    if (record_id && (action === 'UPDATE' || action === 'DELETE')) {
      const { data: existing } = await supabase.from(table).select('*').eq('id', record_id).maybeSingle();
      oldData = existing;
    }

    // ── Perform database operation ───────────────────────────────────────
    const sanitized = validationResult.sanitized ?? data;
    let dbResult: { id?: string } = {};

    if (action === 'CREATE' && sanitized) {
      const { data: created, error } = await supabase.from(table).insert([sanitized]).select('id').maybeSingle();
      if (error) throw error;
      dbResult = created ?? {};
    } else if (action === 'UPDATE' && record_id && sanitized) {
      const { error } = await supabase.from(table).update(sanitized).eq('id', record_id);
      if (error) throw error;
      dbResult = { id: record_id };
    } else if (action === 'DELETE' && record_id) {
      const { error } = await supabase.from(table).delete().eq('id', record_id);
      if (error) throw error;
      dbResult = { id: record_id };
    }

    const finalId = dbResult?.id ?? record_id ?? null;

    // ── Write audit log ───────────────────────────────────────────────────
    await supabase.rpc('log_crm_audit', {
      p_table_name:  table,
      p_record_id:   finalId ? String(finalId) : null,
      p_action:      action,
      p_admin_id:    admin_id ?? null,
      p_admin_email: admin_email ?? null,
      p_admin_role:  admin_role ?? null,
      p_old_data:    oldData ? JSON.stringify(oldData) : null,
      p_new_data:    sanitized ? JSON.stringify(sanitized) : null,
    });

    return new Response(
      JSON.stringify({ valid: true, id: finalId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: unknown) {
    console.error('crm-validate-and-log error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
