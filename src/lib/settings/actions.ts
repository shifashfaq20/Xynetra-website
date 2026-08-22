'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import type { ReminderTiming, BusinessHours, Tone, Language, ServiceItem } from '@/lib/onboarding/types';

async function authed() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  return { supabase, user, svc: createServiceClient() };
}

async function assertActive(supabase: any, userId: string) {
  const { data } = await supabase
    .from('profiles').select('subscription_status').eq('id', userId).single();
  if (data?.subscription_status !== 'active') {
    return { error: 'Your subscription is inactive — settings are read-only.' };
  }
  return null;
}

export async function updateReminderTiming(timing: ReminderTiming) {
  const { supabase, user, svc } = await authed();
  const gate = await assertActive(supabase, user.id);
  if (gate) return gate;
  if (!timing.r1.enabled && !timing.r2.enabled && !timing.r3.enabled)
    return { error: 'Enable at least one reminder.' };
  const { error } = await svc.from('clients')
    .update({ reminder_timing: timing, updated_at: new Date().toISOString() })
    .eq('id', user.id);
  if (error) return { error: error.message };
  revalidatePath('/app/settings');
  return { success: true };
}

export async function updateServices(services: ServiceItem[]) {
  const { supabase, user, svc } = await authed();
  const gate = await assertActive(supabase, user.id);
  if (gate) return gate;
  const clean = services.filter((s) => s.name.trim() && s.price > 0);
  if (!clean.length) return { error: 'Add at least one service.' };

  const { error: delErr } = await svc.from('services').delete().eq('client_id', user.id);
  if (delErr) return { error: delErr.message };
  const { error } = await svc.from('services').insert(
    clean.map((s) => ({ client_id: user.id, name: s.name.trim(), price: s.price, duration_minutes: s.duration_minutes ?? null }))
  );
  if (error) return { error: error.message };
  revalidatePath('/app/settings');
  return { success: true };
}

export async function updateToneLanguage(input: { tone: Tone; language: Language; sign_off: string }) {
  const { supabase, user, svc } = await authed();
  const gate = await assertActive(supabase, user.id);
  if (gate) return gate;
  const { error } = await svc.from('clients')
    .update({ tone: input.tone, language: input.language, sign_off: input.sign_off.trim(), updated_at: new Date().toISOString() })
    .eq('id', user.id);
  if (error) return { error: error.message };
  revalidatePath('/app/settings');
  return { success: true };
}

export async function updateBusinessHours(hours: BusinessHours) {
  const { supabase, user, svc } = await authed();
  const gate = await assertActive(supabase, user.id);
  if (gate) return gate;
  const { error } = await svc.from('clients')
    .update({ business_hours: hours, updated_at: new Date().toISOString() })
    .eq('id', user.id);
  if (error) return { error: error.message };
  revalidatePath('/app/settings');
  return { success: true };
}

export async function setServicePaused(paused: boolean) {
  const { user, svc } = await authed(); // pausing allowed even if past_due
  const { error } = await svc.from('clients')
    .update({ paused, updated_at: new Date().toISOString() })
    .eq('id', user.id);
  if (error) return { error: error.message };
  revalidatePath('/app/settings');
  revalidatePath('/app/dashboard');
  return { success: true };
}