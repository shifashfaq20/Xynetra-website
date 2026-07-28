// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// async function getUser() {
//   const supabase = await createClient();
//   const { data: { user }, error } = await supabase.auth.getUser();
//   if (!user || error) throw new Error('Unauthorized');
//   return { supabase, user };
// }

// export async function getDashboardStats(period: 'week' | 'month') {
//   const { supabase, user } = await getUser();
//   const now = new Date();
//   const start = period === 'week'
//     ? new Date(now.setDate(now.getDate() - now.getDay()))
//     : new Date(now.setDate(now.getDate() - 30));

//   const { data, error } = await supabase
//     .from('appointments')
//     .select('status, value, recovered_from_waitlist')
//     .eq('client_id', user.id)
//     .gte('appointment_time', start.toISOString());

//   if (error) throw error;

//   const appointments = data || [];
//   const handled = appointments.length;
//   const confirmed = appointments.filter(a => a.status === 'confirmed').length;
//   const cancelled = appointments.filter(a => a.status === 'cancelled').length;
//   const recovered = appointments.filter(a => a.recovered_from_waitlist).length;
//   const revenueSaved = appointments
//     .filter(a => a.recovered_from_waitlist)
//     .reduce((sum, a) => sum + (Number(a.value) || 0), 0);

//   return { handled, confirmed, cancelled, recovered, revenueSaved };
// }

// export async function getUpcomingAppointments() {
//   const { supabase, user } = await getUser();
//   const { data, error } = await supabase
//     .from('appointments')
//     .select('id, customer_name, appointment_time, status, timezone')
//     .eq('client_id', user.id)
//     .gte('appointment_time', new Date().toISOString())
//     .order('appointment_time', { ascending: true })
//     .limit(20);
//   if (error) throw error;
//   return data || [];
// }

// export async function getRecentReminders() {
//   const { supabase, user } = await getUser();
//   const { data, error } = await supabase
//     .from('reminders')
//     .select('id, message, sent_at, appointments!inner(customer_name, appointment_time)')
//     .eq('client_id', user.id)
//     .order('sent_at', { ascending: false })
//     .limit(20);
//   if (error) throw error;
//   return data || [];
// }

// export async function getWaitlist() {
//   const { supabase, user } = await getUser();
//   const { data, error } = await supabase
//     .from('waitlist')
//     .select('id, name, phone, created_at')
//     .eq('client_id', user.id)
//     .order('created_at', { ascending: false });
//   if (error) throw error;
//   return data || [];
// }

// export async function addWaitlistEntry(name: string, phone: string) {
//   const { supabase, user } = await getUser();
//   const phoneRegex = /^\+\d{10,15}$/;
//   if (!phoneRegex.test(phone)) throw new Error('Use international format: +14155551234');

//   const { error } = await supabase
//     .from('waitlist')
//     .insert({ client_id: user.id, name, phone });
//   if (error) throw error;
//   revalidatePath('/client/dashboard');
// }

// export async function removeWaitlistEntry(id: string) {
//   const { supabase, user } = await getUser();
//   const { error } = await supabase
//     .from('waitlist')
//     .delete()
//     .eq('id', id)
//     .eq('client_id', user.id);
//   if (error) throw error;
//   revalidatePath('/client/dashboard');
// }





// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// async function getAuthedClient() {
//   const supabase = await createClient();
//   const { data: { user }, error } = await supabase.auth.getUser();
//   if (!user || error) throw new Error('Unauthorized');
//   return { supabase, user };
// }

// export async function getDashboardStats(period: 'week' | 'month') {
//   const { supabase, user } = await getAuthedClient();
//   const dateLimit = new Date();
  
//   if (period === 'week') {
//     dateLimit.setDate(dateLimit.getDate() - 7);
//   } else {
//     dateLimit.setDate(dateLimit.getDate() - 30);
//   }

//   const { data: appointments, error } = await supabase
//     .from('appointments')
//     .select('status, value, recovered_from_waitlist')
//     .eq('client_id', user.id)
//     .gte('appointment_time', dateLimit.toISOString());

//   if (error) {
//     console.error(error);
//     return { handled: 0, confirmed: 0, cancelled: 0, recovered: 0, revenueSaved: 0 };
//   }

//   const handled = appointments.length;
//   const confirmed = appointments.filter(a => a.status === 'confirmed').length;
//   const cancelled = appointments.filter(a => a.status === 'cancelled').length;
//   const recovered = appointments.filter(a => a.recovered_from_waitlist).length;
//   const revenueSaved = appointments
//     .filter(a => a.recovered_from_waitlist)
//     .reduce((sum, a) => sum + (Number(a.value) || 0), 0);

//   return { handled, confirmed, cancelled, recovered, revenueSaved };
// }

// export async function getUpcomingAppointments() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('appointments')
//     .select('id, customer_name, appointment_time, status, timezone')
//     .eq('client_id', user.id)
//     .gte('appointment_time', new Date().toISOString())
//     .order('appointment_time', { ascending: true })
//     .limit(10);

//   if (error) return [];
//   return data || [];
// }

// export async function getRecentReminders() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('reminders')
//     .select('id, message, sent_at')
//     .eq('client_id', user.id)
//     .order('sent_at', { ascending: false })
//     .limit(20);

//   if (error) return [];
//   return data || [];
// }

// export async function getWaitlist() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('client_waitlist')
//     .select('id, name, phone, created_at')
//     .eq('client_id', user.id)
//     .order('created_at', { ascending: false });

//   if (error) return [];
//   return data || [];
// }

// export async function addWaitlistEntry(name: string, phone: string) {
//   const { supabase, user } = await getAuthedClient();
  
//   // Strict format check (+14155551234 style)
//   const phoneRegex = /^\+\d{10,15}$/;
//   if (!phoneRegex.test(phone.trim())) {
//     throw new Error('Invalid format. Phone must be in international format (e.g. +14155551234)');
//   }

//   const { error } = await supabase
//     .from('client_waitlist')
//     .insert({
//       client_id: user.id,
//       name: name.trim(),
//       phone: phone.trim(),
//     });

//   if (error) throw new Error(error.message);
//   revalidatePath('/app/dashboard');
// }

// export async function removeWaitlistEntry(id: string) {
//   const { supabase, user } = await getAuthedClient();
//   const { error } = await supabase
//     .from('client_waitlist')
//     .delete()
//     .eq('id', id)
//     .eq('client_id', user.id);

//   if (error) throw new Error(error.message);
//   revalidatePath('/app/dashboard');
// }



// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// async function getAuthedClient() {
//   const supabase = await createClient();
//   const { data: { user }, error } = await supabase.auth.getUser();
//   if (!user || error) throw new Error('Unauthorized');
//   return { supabase, user };
// }

// export async function getDashboardStats(period: 'week' | 'month') {
//   const { supabase, user } = await getAuthedClient();
//   const dateLimit = new Date();
//   dateLimit.setDate(dateLimit.getDate() - (period === 'week' ? 7 : 30));

//   const [{ data: appointments, error }, { count: reminded }] = await Promise.all([
//     supabase
//       .from('appointments')
//       .select('status, value, recovered_from_waitlist')
//       .eq('client_id', user.id)
//       .gte('appointment_time', dateLimit.toISOString()),
//     supabase
//       .from('reminders')
//       .select('*', { count: 'exact', head: true })
//       .eq('client_id', user.id)
//       .gte('sent_at', dateLimit.toISOString()),
//   ]);

//   if (error) {
//     console.error(error);
//     return { handled: 0, confirmed: 0, cancelled: 0, recovered: 0, revenueSaved: 0, reminded: 0 };
//   }

//   const a = appointments || [];
//   return {
//     handled: a.length,
//     confirmed: a.filter((x) => x.status === 'confirmed').length,
//     cancelled: a.filter((x) => x.status === 'cancelled').length,
//     recovered: a.filter((x) => x.recovered_from_waitlist).length,
//     revenueSaved: a
//       .filter((x) => x.recovered_from_waitlist)
//       .reduce((s, x) => s + (Number(x.value) || 0), 0),
//     reminded: reminded || 0,
//   };
// }

// export async function getUpcomingAppointments() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('appointments')
//     .select('id, customer_name, appointment_time, status, timezone')
//     .eq('client_id', user.id)
//     .gte('appointment_time', new Date().toISOString())
//     .order('appointment_time', { ascending: true })
//     .limit(10);
//   if (error) return [];
//   return data || [];
// }

// export async function getRecentReminders() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('reminders')
//     .select('id, message, sent_at')
//     .eq('client_id', user.id)
//     .order('sent_at', { ascending: false })
//     .limit(20);
//   if (error) return [];
//   return data || [];
// }

// export async function getWaitlist() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('client_waitlist')
//     .select('id, name, phone, created_at')
//     .eq('client_id', user.id)
//     .order('created_at', { ascending: false });
//   if (error) return [];
//   return data || [];
// }

// /* ── Needs-a-human: replies the system couldn't sort (v1.1 §4 Step 3) ── */
// export async function getOpenHandoffs() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('handoffs')
//     .select('id, customer_name, customer_phone, message, created_at')
//     .eq('client_id', user.id)
//     .eq('status', 'open')
//     .order('created_at', { ascending: false })
//     .limit(20);
//   if (error) return [];
//   return data || [];
// }

// export async function resolveHandoff(id: string) {
//   const { supabase, user } = await getAuthedClient();
//   const { error } = await supabase
//     .from('handoffs')
//     .update({ status: 'resolved', resolved_at: new Date().toISOString() })
//     .eq('id', id)
//     .eq('client_id', user.id);
//   if (error) throw new Error(error.message);
//   revalidatePath('/app/dashboard');
// }

// export async function addWaitlistEntry(name: string, phone: string) {
//   const { supabase, user } = await getAuthedClient();

//   // Billing gate — read-only when subscription is not active (v1.1 Rule 9.2)
//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('subscription_status')
//     .eq('id', user.id)
//     .single();
//   if (profile?.subscription_status !== 'active') {
//     throw new Error('Your subscription is inactive — the dashboard is read-only.');
//   }

//   const phoneRegex = /^\+\d{10,15}$/;
//   if (!phoneRegex.test(phone.trim())) {
//     throw new Error('Invalid format. Phone must be in international format (e.g. +14155551234)');
//   }

//   const { error } = await supabase
//     .from('client_waitlist')
//     .insert({ client_id: user.id, name: name.trim(), phone: phone.trim() });
//   if (error) throw new Error(error.message);
//   revalidatePath('/app/dashboard');
// }

// export async function removeWaitlistEntry(id: string) {
//   const { supabase, user } = await getAuthedClient();
//   const { error } = await supabase
//     .from('client_waitlist')
//     .delete()
//     .eq('id', id)
//     .eq('client_id', user.id);
//   if (error) throw new Error(error.message);
//   revalidatePath('/app/dashboard');
// }



'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function getAuthedClient() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) throw new Error('Unauthorized');
  return { supabase, user };
}

export async function getDashboardStats(period: 'week' | 'month') {
  const { supabase, user } = await getAuthedClient();
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - (period === 'week' ? 7 : 30));

  const [
    { data: appointments, error },
    { count: reminded, error: remindersError },
  ] = await Promise.all([
    supabase
      .from('appointments')
      .select('status, value, recovered_from_waitlist')
      .eq('client_id', user.id)
      .gte('start_time', dateLimit.toISOString()),
    supabase
      .from('reminders')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', user.id)
      .gte('sent_at', dateLimit.toISOString()),
  ]);

  if (error) {
    console.error(
      'DASHBOARD STATS ERROR (appointments):',
      error.message,
      '| code:', error.code,
      '| details:', error.details,
      '| hint:', error.hint
    );
  }
  if (remindersError) {
    console.error(
      'DASHBOARD STATS ERROR (reminders):',
      remindersError.message,
      '| code:', remindersError.code,
      '| details:', remindersError.details,
      '| hint:', remindersError.hint
    );
  }

  if (error) {
    return { handled: 0, confirmed: 0, cancelled: 0, recovered: 0, revenueSaved: 0, reminded: 0 };
  }

  const a = appointments || [];
  return {
    handled: a.length,
    confirmed: a.filter((x) => x.status === 'confirmed').length,
    cancelled: a.filter((x) => x.status === 'cancelled').length,
    recovered: a.filter((x) => x.recovered_from_waitlist).length,
    revenueSaved: a
      .filter((x) => x.recovered_from_waitlist)
      .reduce((s, x) => s + (Number(x.value) || 0), 0),
    reminded: reminded || 0,
  };
}

export async function getUpcomingAppointments() {
  const { supabase, user } = await getAuthedClient();
  const { data, error } = await supabase
    .from('appointments')
    .select('id, customer_name, appointment_time:start_time, status')
    .eq('client_id', user.id)
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })
    .limit(10);
  if (error) {
    console.error(
      'UPCOMING APPOINTMENTS ERROR:',
      error.message,
      '| code:', error.code,
      '| details:', error.details,
      '| hint:', error.hint
    );
    return [];
  }
  return data || [];
}

export async function getRecentReminders() {
  const { supabase, user } = await getAuthedClient();
  const { data, error } = await supabase
    .from('reminders')
    .select('id, message, sent_at')
    .eq('client_id', user.id)
    .order('sent_at', { ascending: false })
    .limit(20);
  if (error) return [];
  return data || [];
}

export async function getWaitlist() {
  const { supabase, user } = await getAuthedClient();
  const { data, error } = await supabase
    .from('client_waitlist')
    .select('id, name, phone, created_at')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

/* ── Needs-a-human: replies the system couldn't sort (v1.1 §4 Step 3) ── */
export async function getOpenHandoffs() {
  const { supabase, user } = await getAuthedClient();
  const { data, error } = await supabase
    .from('handoffs')
    .select('id, customer_name, customer_phone, message, created_at')
    .eq('client_id', user.id)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) return [];
  return data || [];
}

export async function resolveHandoff(id: string) {
  const { supabase, user } = await getAuthedClient();
  const { error } = await supabase
    .from('handoffs')
    .update({ status: 'resolved', resolved_at: new Date().toISOString() })
    .eq('id', id)
    .eq('client_id', user.id);
  if (error) throw new Error(error.message);
  revalidatePath('/app/dashboard');
}

export async function addWaitlistEntry(name: string, phone: string) {
  const { supabase, user } = await getAuthedClient();

  // Billing gate — read-only when subscription is not active (v1.1 Rule 9.2)
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single();
  if (profile?.subscription_status !== 'active') {
    throw new Error('Your subscription is inactive — the dashboard is read-only.');
  }

  const phoneRegex = /^\+\d{10,15}$/;
  if (!phoneRegex.test(phone.trim())) {
    throw new Error('Invalid format. Phone must be in international format (e.g. +14155551234)');
  }

  const { error } = await supabase
    .from('client_waitlist')
    .insert({ client_id: user.id, name: name.trim(), phone: phone.trim() });
  if (error) throw new Error(error.message);
  revalidatePath('/app/dashboard');
}

export async function removeWaitlistEntry(id: string) {
  const { supabase, user } = await getAuthedClient();
  const { error } = await supabase
    .from('client_waitlist')
    .delete()
    .eq('id', id)
    .eq('client_id', user.id);
  if (error) throw new Error(error.message);
  revalidatePath('/app/dashboard');
}