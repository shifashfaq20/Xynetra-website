// // src/lib/dashboard/action.ts
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
//   try {
//     const { supabase, user } = await getAuthedClient();
//     const dateLimit = new Date();
//     dateLimit.setDate(dateLimit.getDate() - (period === 'week' ? 7 : 30));

//     const [
//       { data: appointments, error },
//       { count: reminded, error: remindersError },
//     ] = await Promise.all([
//       supabase
//         .from('appointments')
//         .select('status, value, recovered_from_waitlist')
//         .eq('client_id', user.id)
//         .gte('appointment_time', dateLimit.toISOString()),
//       supabase
//         .from('reminders')
//         .select('*', { count: 'exact', head: true })
//         .eq('client_id', user.id)
//         .gte('sent_at', dateLimit.toISOString()),
//     ]);

//     if (error || remindersError) {
//       return { handled: 0, confirmed: 0, cancelled: 0, recovered: 0, revenueSaved: 0, reminded: 0 };
//     }

//     const a = appointments || [];
//     return {
//       handled: a.length,
//       confirmed: a.filter((x) => x.status === 'confirmed').length,
//       cancelled: a.filter((x) => x.status === 'cancelled').length,
//       recovered: a.filter((x) => x.recovered_from_waitlist).length,
//       revenueSaved: a
//         .filter((x) => x.recovered_from_waitlist)
//         .reduce((s, x) => s + (Number(x.value) || 0), 0),
//       reminded: reminded || 0,
//     };
//   } catch {
//     return { handled: 0, confirmed: 0, cancelled: 0, recovered: 0, revenueSaved: 0, reminded: 0 };
//   }
// }

// export async function getUpcomingAppointments() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from('appointments')
//     .select('id, customer_name, appointment_time, status')
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

// // ── GET WITH AUTOMATIC 30-DAY PURGE ──
// export async function getWaitlist() {
//   try {
//     const { supabase, user } = await getAuthedClient();

//     // Delete records older than 30 days
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - 30);

//     await supabase
//       .from('client_waitlist')
//       .delete()
//       .eq('client_id', user.id)
//       .lt('created_at', cutoffDate.toISOString());

//     const { data, error } = await supabase
//       .from('client_waitlist')
//       .select('id, name, phone, created_at')
//       .eq('client_id', user.id)
//       .order('created_at', { ascending: false });

//     if (error) return [];
//     return data || [];
//   } catch {
//     return [];
//   }
// }

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
//     throw new Error('Invalid format. Phone must start with + and contain 10-15 digits (e.g. +14155551234)');
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


"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const WAITLIST_TTL_DAYS = 15;

async function getAuthedClient() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) throw new Error("Unauthorized");
  return { supabase, user };
}

export async function getDashboardStats(period: "week" | "month") {
  try {
    const { supabase, user } = await getAuthedClient();
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - (period === "week" ? 7 : 30));

    const [
      { data: appointments, error },
      { count: reminded, error: remindersError },
    ] = await Promise.all([
      supabase
        .from("appointments")
        .select("status, value, recovered_from_waitlist")
        .eq("client_id", user.id)
        .gte("appointment_time", dateLimit.toISOString()),
      supabase
        .from("reminders")
        .select("*", { count: "exact", head: true })
        .eq("client_id", user.id)
        .gte("sent_at", dateLimit.toISOString()),
    ]);

    if (error || remindersError) {
      return {
        handled: 0,
        confirmed: 0,
        cancelled: 0,
        recovered: 0,
        revenueSaved: 0,
        reminded: 0,
      };
    }

    const a = appointments || [];
    return {
      handled: a.length,
      confirmed: a.filter((x) => x.status === "confirmed").length,
      cancelled: a.filter((x) => x.status === "cancelled").length,
      recovered: a.filter((x) => x.recovered_from_waitlist).length,
      revenueSaved: a
        .filter((x) => x.recovered_from_waitlist)
        .reduce((s, x) => s + (Number(x.value) || 0), 0),
      reminded: reminded || 0,
    };
  } catch {
    return {
      handled: 0,
      confirmed: 0,
      cancelled: 0,
      recovered: 0,
      revenueSaved: 0,
      reminded: 0,
    };
  }
}

export async function getUpcomingAppointments() {
  const { supabase, user } = await getAuthedClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("id, customer_name, appointment_time, status")
    .eq("client_id", user.id)
    .gte("appointment_time", new Date().toISOString())
    .order("appointment_time", { ascending: true })
    .limit(10);
  if (error) return [];
  return data || [];
}

export async function getRecentReminders() {
  const { supabase, user } = await getAuthedClient();
  const { data, error } = await supabase
    .from("reminders")
    .select("id, message, sent_at")
    .eq("client_id", user.id)
    .order("sent_at", { ascending: false })
    .limit(20);
  if (error) return [];
  return data || [];
}

export type WaitlistEntry = {
  id: string;
  name: string;
  phone: string;
  created_at: string;
};

export type WaitlistPayload = {
  entries: WaitlistEntry[];
  autoExpire: boolean;
  ttlDays: number;
};

/** Load waitlist; if auto-expire is on, purge rows older than 15 days. */
export async function getWaitlist(): Promise<WaitlistPayload> {
  try {
    const { supabase, user } = await getAuthedClient();

    const { data: clientRow } = await supabase
      .from("clients")
      .select("waitlist_auto_expire")
      .eq("id", user.id)
      .maybeSingle();

    const autoExpire = clientRow?.waitlist_auto_expire !== false;

    if (autoExpire) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - WAITLIST_TTL_DAYS);
      await supabase
        .from("client_waitlist")
        .delete()
        .eq("client_id", user.id)
        .lt("created_at", cutoff.toISOString());
    }

    const { data, error } = await supabase
      .from("client_waitlist")
      .select("id, name, phone, created_at")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[XYNETRA] getWaitlist", error.message);
      return { entries: [], autoExpire, ttlDays: WAITLIST_TTL_DAYS };
    }

    return {
      entries: (data || []) as WaitlistEntry[],
      autoExpire,
      ttlDays: WAITLIST_TTL_DAYS,
    };
  } catch {
    return { entries: [], autoExpire: true, ttlDays: WAITLIST_TTL_DAYS };
  }
}

export async function setWaitlistAutoExpire(enabled: boolean): Promise<void> {
  const { supabase, user } = await getAuthedClient();

  const { error } = await supabase.from("clients").upsert(
    {
      id: user.id,
      waitlist_auto_expire: enabled,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) throw new Error(error.message);

  // If turning ON, purge immediately
  if (enabled) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - WAITLIST_TTL_DAYS);
    await supabase
      .from("client_waitlist")
      .delete()
      .eq("client_id", user.id)
      .lt("created_at", cutoff.toISOString());
  }

  revalidatePath("/app/dashboard");
}

export async function getOpenHandoffs() {
  const { supabase, user } = await getAuthedClient();
  const { data, error } = await supabase
    .from("handoffs")
    .select("id, customer_name, customer_phone, message, created_at")
    .eq("client_id", user.id)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return [];
  return data || [];
}

export async function resolveHandoff(id: string) {
  const { supabase, user } = await getAuthedClient();
  const { error } = await supabase
    .from("handoffs")
    .update({ status: "resolved", resolved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("client_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/app/dashboard");
}

export async function addWaitlistEntry(
  name: string,
  phone: string
): Promise<WaitlistEntry> {
  const { supabase, user } = await getAuthedClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  if (profile?.subscription_status !== "active") {
    throw new Error("Your subscription is inactive — the dashboard is read-only.");
  }

  const phoneRegex = /^\+\d{10,15}$/;
  if (!phoneRegex.test(phone.trim())) {
    throw new Error(
      "Invalid format. Phone must start with + and contain 10-15 digits (e.g. +14155551234)"
    );
  }

  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("Contact name is required.");

  const { data, error } = await supabase
    .from("client_waitlist")
    .insert({
      client_id: user.id,
      name: trimmedName,
      phone: phone.trim(),
    })
    .select("id, name, phone, created_at")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/app/dashboard");
  return data as WaitlistEntry;
}

export async function removeWaitlistEntry(id: string) {
  const { supabase, user } = await getAuthedClient();
  const { error } = await supabase
    .from("client_waitlist")
    .delete()
    .eq("id", id)
    .eq("client_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/app/dashboard");
}