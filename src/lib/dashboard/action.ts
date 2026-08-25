// "use server";

// import { createClient } from "@/lib/supabase/server";
// import { revalidatePath } from "next/cache";

// /** Allowed auto-remove windows (days) */
// export const WAITLIST_TTL_OPTIONS = [7, 15, 30, 45, 60] as const;
// export type WaitlistTtlDays = (typeof WAITLIST_TTL_OPTIONS)[number];

// const DEFAULT_TTL: WaitlistTtlDays = 15;

// function normalizeTtl(value: unknown): WaitlistTtlDays {
//   const n = Number(value);
//   if ((WAITLIST_TTL_OPTIONS as readonly number[]).includes(n)) {
//     return n as WaitlistTtlDays;
//   }
//   return DEFAULT_TTL;
// }

// async function getAuthedClient() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();
//   if (!user || error) throw new Error("Unauthorized");
//   return { supabase, user };
// }

// export async function getDashboardStats(period: "week" | "month") {
//   try {
//     const { supabase, user } = await getAuthedClient();
//     const dateLimit = new Date();
//     dateLimit.setDate(dateLimit.getDate() - (period === "week" ? 7 : 30));

//     const [
//       { data: appointments, error },
//       { count: reminded, error: remindersError },
//     ] = await Promise.all([
//       supabase
//         .from("appointments")
//         .select("status, value, recovered_from_waitlist")
//         .eq("client_id", user.id)
//         .gte("appointment_time", dateLimit.toISOString()),
//       supabase
//         .from("reminders")
//         .select("*", { count: "exact", head: true })
//         .eq("client_id", user.id)
//         .gte("sent_at", dateLimit.toISOString()),
//     ]);

//     if (error || remindersError) {
//       return {
//         handled: 0,
//         confirmed: 0,
//         cancelled: 0,
//         recovered: 0,
//         revenueSaved: 0,
//         reminded: 0,
//       };
//     }

//     const a = appointments || [];
//     return {
//       handled: a.length,
//       confirmed: a.filter((x) => x.status === "confirmed").length,
//       cancelled: a.filter((x) => x.status === "cancelled").length,
//       recovered: a.filter((x) => x.recovered_from_waitlist).length,
//       revenueSaved: a
//         .filter((x) => x.recovered_from_waitlist)
//         .reduce((s, x) => s + (Number(x.value) || 0), 0),
//       reminded: reminded || 0,
//     };
//   } catch {
//     return {
//       handled: 0,
//       confirmed: 0,
//       cancelled: 0,
//       recovered: 0,
//       revenueSaved: 0,
//       reminded: 0,
//     };
//   }
// }

// export async function getUpcomingAppointments() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from("appointments")
//     .select("id, customer_name, appointment_time, status")
//     .eq("client_id", user.id)
//     .gte("appointment_time", new Date().toISOString())
//     .order("appointment_time", { ascending: true })
//     .limit(10);
//   if (error) return [];
//   return data || [];
// }

// export async function getRecentReminders() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from("reminders")
//     .select("id, message, sent_at")
//     .eq("client_id", user.id)
//     .order("sent_at", { ascending: false })
//     .limit(20);
//   if (error) return [];
//   return data || [];
// }

// export type WaitlistEntry = {
//   id: string;
//   name: string;
//   phone: string;
//   created_at: string;
// };

// export type WaitlistPayload = {
//   entries: WaitlistEntry[];
//   autoExpire: boolean;
//   ttlDays: WaitlistTtlDays;
// };

// /** Load waitlist; purge rows older than chosen TTL when auto-expire is on. */
// export async function getWaitlist(): Promise<WaitlistPayload> {
//   try {
//     const { supabase, user } = await getAuthedClient();

//     const { data: clientRow } = await supabase
//       .from("clients")
//       .select("waitlist_auto_expire, waitlist_ttl_days")
//       .eq("id", user.id)
//       .maybeSingle();

//     const autoExpire = clientRow?.waitlist_auto_expire !== false;
//     const ttlDays = normalizeTtl(clientRow?.waitlist_ttl_days);

//     if (autoExpire) {
//       const cutoff = new Date();
//       cutoff.setDate(cutoff.getDate() - ttlDays);
//       await supabase
//         .from("client_waitlist")
//         .delete()
//         .eq("client_id", user.id)
//         .lt("created_at", cutoff.toISOString());
//     }

//     const { data, error } = await supabase
//       .from("client_waitlist")
//       .select("id, name, phone, created_at")
//       .eq("client_id", user.id)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("[XYNETRA] getWaitlist", error.message);
//       return { entries: [], autoExpire, ttlDays };
//     }

//     return {
//       entries: (data || []) as WaitlistEntry[],
//       autoExpire,
//       ttlDays,
//     };
//   } catch {
//     return { entries: [], autoExpire: true, ttlDays: DEFAULT_TTL };
//   }
// }

// /** Toggle auto-remove on/off */
// export async function setWaitlistAutoExpire(enabled: boolean): Promise<void> {
//   const { supabase, user } = await getAuthedClient();

//   const { data: clientRow } = await supabase
//     .from("clients")
//     .select("waitlist_ttl_days")
//     .eq("id", user.id)
//     .maybeSingle();

//   const ttlDays = normalizeTtl(clientRow?.waitlist_ttl_days);

//   const { error } = await supabase.from("clients").upsert(
//     {
//       id: user.id,
//       waitlist_auto_expire: enabled,
//       waitlist_ttl_days: ttlDays,
//       updated_at: new Date().toISOString(),
//     },
//     { onConflict: "id" }
//   );

//   if (error) throw new Error(error.message);

//   if (enabled) {
//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - ttlDays);
//     await supabase
//       .from("client_waitlist")
//       .delete()
//       .eq("client_id", user.id)
//       .lt("created_at", cutoff.toISOString());
//   }

//   revalidatePath("/app/dashboard");
// }

// /** Set auto-remove window: 7 | 15 | 30 | 45 | 60 */
// export async function setWaitlistTtlDays(days: number): Promise<void> {
//   const ttlDays = normalizeTtl(days);
//   const { supabase, user } = await getAuthedClient();

//   const { data: clientRow } = await supabase
//     .from("clients")
//     .select("waitlist_auto_expire")
//     .eq("id", user.id)
//     .maybeSingle();

//   const autoExpire = clientRow?.waitlist_auto_expire !== false;

//   const { error } = await supabase.from("clients").upsert(
//     {
//       id: user.id,
//       waitlist_ttl_days: ttlDays,
//       waitlist_auto_expire: autoExpire,
//       updated_at: new Date().toISOString(),
//     },
//     { onConflict: "id" }
//   );

//   if (error) throw new Error(error.message);

//   // If auto-expire is on, purge immediately with the new window
//   if (autoExpire) {
//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - ttlDays);
//     await supabase
//       .from("client_waitlist")
//       .delete()
//       .eq("client_id", user.id)
//       .lt("created_at", cutoff.toISOString());
//   }

//   revalidatePath("/app/dashboard");
// }

// export async function getOpenHandoffs() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from("handoffs")
//     .select("id, customer_name, customer_phone, message, created_at")
//     .eq("client_id", user.id)
//     .eq("status", "open")
//     .order("created_at", { ascending: false })
//     .limit(20);
//   if (error) return [];
//   return data || [];
// }

// export async function resolveHandoff(id: string) {
//   const { supabase, user } = await getAuthedClient();
//   const { error } = await supabase
//     .from("handoffs")
//     .update({ status: "resolved", resolved_at: new Date().toISOString() })
//     .eq("id", id)
//     .eq("client_id", user.id);
//   if (error) throw new Error(error.message);
//   revalidatePath("/app/dashboard");
// }

// export async function addWaitlistEntry(
//   name: string,
//   phone: string
// ): Promise<WaitlistEntry> {
//   const { supabase, user } = await getAuthedClient();

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("subscription_status")
//     .eq("id", user.id)
//     .single();

//   if (profile?.subscription_status !== "active") {
//     throw new Error("Your subscription is inactive — the dashboard is read-only.");
//   }

//   const phoneRegex = /^\+\d{10,15}$/;
//   if (!phoneRegex.test(phone.trim())) {
//     throw new Error(
//       "Invalid format. Phone must start with + and contain 10-15 digits (e.g. +14155551234)"
//     );
//   }

//   const trimmedName = name.trim();
//   if (!trimmedName) throw new Error("Contact name is required.");

//   const { data, error } = await supabase
//     .from("client_waitlist")
//     .insert({
//       client_id: user.id,
//       name: trimmedName,
//       phone: phone.trim(),
//     })
//     .select("id, name, phone, created_at")
//     .single();

//   if (error) throw new Error(error.message);
//   revalidatePath("/app/dashboard");
//   return data as WaitlistEntry;
// }

// export async function removeWaitlistEntry(id: string) {
//   const { supabase, user } = await getAuthedClient();
//   const { error } = await supabase
//     .from("client_waitlist")
//     .delete()
//     .eq("id", id)
//     .eq("client_id", user.id);

//   if (error) throw new Error(error.message);
//   revalidatePath("/app/dashboard");
// }



// "use server";

// import { createClient } from "@/lib/supabase/server";
// import { revalidatePath } from "next/cache";
// import {
//   normalizeTtl,
//   DEFAULT_TTL,
//   type WaitlistEntry,
//   type WaitlistPayload,
// } from "@/lib/dashboard/waitlist-types";

// async function getAuthedClient() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();
//   if (!user || error) throw new Error("Unauthorized");
//   return { supabase, user };
// }

// export async function getDashboardStats(period: "week" | "month") {
//   try {
//     const { supabase, user } = await getAuthedClient();
//     const dateLimit = new Date();
//     dateLimit.setDate(dateLimit.getDate() - (period === "week" ? 7 : 30));

//     const [
//       { data: appointments, error },
//       { count: reminded, error: remindersError },
//     ] = await Promise.all([
//       supabase
//         .from("appointments")
//         .select("status, value, recovered_from_waitlist")
//         .eq("client_id", user.id)
//         .gte("appointment_time", dateLimit.toISOString()),
//       supabase
//         .from("reminders")
//         .select("*", { count: "exact", head: true })
//         .eq("client_id", user.id)
//         .gte("sent_at", dateLimit.toISOString()),
//     ]);

//     if (error || remindersError) {
//       return {
//         handled: 0,
//         confirmed: 0,
//         cancelled: 0,
//         recovered: 0,
//         revenueSaved: 0,
//         reminded: 0,
//       };
//     }

//     const a = appointments || [];
//     return {
//       handled: a.length,
//       confirmed: a.filter((x) => x.status === "confirmed").length,
//       cancelled: a.filter((x) => x.status === "cancelled").length,
//       recovered: a.filter((x) => x.recovered_from_waitlist).length,
//       revenueSaved: a
//         .filter((x) => x.recovered_from_waitlist)
//         .reduce((s, x) => s + (Number(x.value) || 0), 0),
//       reminded: reminded || 0,
//     };
//   } catch {
//     return {
//       handled: 0,
//       confirmed: 0,
//       cancelled: 0,
//       recovered: 0,
//       revenueSaved: 0,
//       reminded: 0,
//     };
//   }
// }

// export async function getUpcomingAppointments() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from("appointments")
//     .select("id, customer_name, appointment_time, status")
//     .eq("client_id", user.id)
//     .gte("appointment_time", new Date().toISOString())
//     .order("appointment_time", { ascending: true })
//     .limit(10);
//   if (error) return [];
//   return data || [];
// }

// export async function getRecentReminders() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from("reminders")
//     .select("id, message, sent_at")
//     .eq("client_id", user.id)
//     .order("sent_at", { ascending: false })
//     .limit(20);
//   if (error) return [];
//   return data || [];
// }

// /** Load waitlist; purge rows older than chosen TTL when auto-expire is on. */
// export async function getWaitlist(): Promise<WaitlistPayload> {
//   try {
//     const { supabase, user } = await getAuthedClient();

//     const { data: clientRow } = await supabase
//       .from("clients")
//       .select("waitlist_auto_expire, waitlist_ttl_days")
//       .eq("id", user.id)
//       .maybeSingle();

//     const autoExpire = clientRow?.waitlist_auto_expire !== false;
//     const ttlDays = normalizeTtl(clientRow?.waitlist_ttl_days);

//     if (autoExpire) {
//       const cutoff = new Date();
//       cutoff.setDate(cutoff.getDate() - ttlDays);
//       await supabase
//         .from("client_waitlist")
//         .delete()
//         .eq("client_id", user.id)
//         .lt("created_at", cutoff.toISOString());
//     }

//     const { data, error } = await supabase
//       .from("client_waitlist")
//       .select("id, name, phone, created_at")
//       .eq("client_id", user.id)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("[XYNETRA] getWaitlist", error.message);
//       return { entries: [], autoExpire, ttlDays };
//     }

//     return {
//       entries: (data || []) as WaitlistEntry[],
//       autoExpire,
//       ttlDays,
//     };
//   } catch {
//     return { entries: [], autoExpire: true, ttlDays: DEFAULT_TTL };
//   }
// }

// /** Toggle auto-remove on/off */
// export async function setWaitlistAutoExpire(enabled: boolean): Promise<void> {
//   const { supabase, user } = await getAuthedClient();

//   const { data: clientRow } = await supabase
//     .from("clients")
//     .select("waitlist_ttl_days")
//     .eq("id", user.id)
//     .maybeSingle();

//   const ttlDays = normalizeTtl(clientRow?.waitlist_ttl_days);

//   const { error } = await supabase.from("clients").upsert(
//     {
//       id: user.id,
//       waitlist_auto_expire: enabled,
//       waitlist_ttl_days: ttlDays,
//       updated_at: new Date().toISOString(),
//     },
//     { onConflict: "id" }
//   );

//   if (error) throw new Error(error.message);

//   if (enabled) {
//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - ttlDays);
//     await supabase
//       .from("client_waitlist")
//       .delete()
//       .eq("client_id", user.id)
//       .lt("created_at", cutoff.toISOString());
//   }

//   revalidatePath("/app/dashboard");
// }

// /** Set auto-remove window: 7 | 15 | 30 | 45 | 60 */
// export async function setWaitlistTtlDays(days: number): Promise<void> {
//   const ttlDays = normalizeTtl(days);
//   const { supabase, user } = await getAuthedClient();

//   const { data: clientRow } = await supabase
//     .from("clients")
//     .select("waitlist_auto_expire")
//     .eq("id", user.id)
//     .maybeSingle();

//   const autoExpire = clientRow?.waitlist_auto_expire !== false;

//   const { error } = await supabase.from("clients").upsert(
//     {
//       id: user.id,
//       waitlist_ttl_days: ttlDays,
//       waitlist_auto_expire: autoExpire,
//       updated_at: new Date().toISOString(),
//     },
//     { onConflict: "id" }
//   );

//   if (error) throw new Error(error.message);

//   if (autoExpire) {
//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - ttlDays);
//     await supabase
//       .from("client_waitlist")
//       .delete()
//       .eq("client_id", user.id)
//       .lt("created_at", cutoff.toISOString());
//   }

//   revalidatePath("/app/dashboard");
// }

// export async function getOpenHandoffs() {
//   const { supabase, user } = await getAuthedClient();
//   const { data, error } = await supabase
//     .from("handoffs")
//     .select("id, customer_name, customer_phone, message, created_at")
//     .eq("client_id", user.id)
//     .eq("status", "open")
//     .order("created_at", { ascending: false })
//     .limit(20);
//   if (error) return [];
//   return data || [];
// }

// export async function resolveHandoff(id: string) {
//   const { supabase, user } = await getAuthedClient();
//   const { error } = await supabase
//     .from("handoffs")
//     .update({ status: "resolved", resolved_at: new Date().toISOString() })
//     .eq("id", id)
//     .eq("client_id", user.id);
//   if (error) throw new Error(error.message);
//   revalidatePath("/app/dashboard");
// }

// export async function addWaitlistEntry(
//   name: string,
//   phone: string
// ): Promise<WaitlistEntry> {
//   const { supabase, user } = await getAuthedClient();

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("subscription_status")
//     .eq("id", user.id)
//     .single();

//   if (profile?.subscription_status !== "active") {
//     throw new Error("Your subscription is inactive — the dashboard is read-only.");
//   }

//   const phoneRegex = /^\+\d{10,15}$/;
//   if (!phoneRegex.test(phone.trim())) {
//     throw new Error(
//       "Invalid format. Phone must start with + and contain 10-15 digits (e.g. +14155551234)"
//     );
//   }

//   const trimmedName = name.trim();
//   if (!trimmedName) throw new Error("Contact name is required.");

//   const { data, error } = await supabase
//     .from("client_waitlist")
//     .insert({
//       client_id: user.id,
//       name: trimmedName,
//       phone: phone.trim(),
//     })
//     .select("id, name, phone, created_at")
//     .single();

//   if (error) throw new Error(error.message);
//   revalidatePath("/app/dashboard");
//   return data as WaitlistEntry;
// }

// export async function removeWaitlistEntry(id: string) {
//   const { supabase, user } = await getAuthedClient();
//   const { error } = await supabase
//     .from("client_waitlist")
//     .delete()
//     .eq("id", id)
//     .eq("client_id", user.id);

//   if (error) throw new Error(error.message);
//   revalidatePath("/app/dashboard");
// }



"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  normalizeTtl,
  DEFAULT_TTL,
  type WaitlistEntry,
  type WaitlistPayload,
} from "@/lib/dashboard/waitlist-types";

// NOTE: This file is a "use server" module, so it can ONLY export
// async functions. All types/constants/helpers live in waitlist-types.ts.

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

/** Load waitlist; purge rows older than chosen TTL when auto-expire is on. */
export async function getWaitlist(): Promise<WaitlistPayload> {
  try {
    const { supabase, user } = await getAuthedClient();

    const { data: clientRow } = await supabase
      .from("clients")
      .select("waitlist_auto_expire, waitlist_ttl_days")
      .eq("id", user.id)
      .maybeSingle();

    const autoExpire = clientRow?.waitlist_auto_expire !== false;
    const ttlDays = normalizeTtl(clientRow?.waitlist_ttl_days);

    if (autoExpire) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - ttlDays);
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
      return { entries: [], autoExpire, ttlDays };
    }

    return {
      entries: (data || []) as WaitlistEntry[],
      autoExpire,
      ttlDays,
    };
  } catch {
    return { entries: [], autoExpire: true, ttlDays: DEFAULT_TTL };
  }
}

/** Toggle auto-remove on/off */
export async function setWaitlistAutoExpire(enabled: boolean): Promise<void> {
  const { supabase, user } = await getAuthedClient();

  const { data: clientRow } = await supabase
    .from("clients")
    .select("waitlist_ttl_days")
    .eq("id", user.id)
    .maybeSingle();

  const ttlDays = normalizeTtl(clientRow?.waitlist_ttl_days);

  const { error } = await supabase.from("clients").upsert(
    {
      id: user.id,
      waitlist_auto_expire: enabled,
      waitlist_ttl_days: ttlDays,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) throw new Error(error.message);

  if (enabled) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - ttlDays);
    await supabase
      .from("client_waitlist")
      .delete()
      .eq("client_id", user.id)
      .lt("created_at", cutoff.toISOString());
  }

  revalidatePath("/app/dashboard");
}

/** Set auto-remove window: 7 | 15 | 30 | 45 | 60 */
export async function setWaitlistTtlDays(days: number): Promise<void> {
  const ttlDays = normalizeTtl(days);
  const { supabase, user } = await getAuthedClient();

  const { data: clientRow } = await supabase
    .from("clients")
    .select("waitlist_auto_expire")
    .eq("id", user.id)
    .maybeSingle();

  const autoExpire = clientRow?.waitlist_auto_expire !== false;

  const { error } = await supabase.from("clients").upsert(
    {
      id: user.id,
      waitlist_ttl_days: ttlDays,
      waitlist_auto_expire: autoExpire,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) throw new Error(error.message);

  if (autoExpire) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - ttlDays);
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
    throw new Error(
      "Your subscription is inactive — the dashboard is read-only."
    );
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