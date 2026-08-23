"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  isAdminEmail,
  adminEmails,
  isBillingRegion,
  isSubscriptionStatus,
  EMPTY_STATS,
  type AdminClient,
  type ClientStats,
} from "@/lib/admin/roles";
import { ok, bad, fail, type Result } from "@/lib/result";

// ── internals ───────────────────────────────────────────────────────────────
// A "use server" file may only export async functions, so these stay private.

async function guard(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const email = data.user?.email ?? null;
    return email && isAdminEmail(email) ? email : null;
  } catch (e: any) {
    console.error("[XYNETRA] admin.guard", e?.message ?? e);
    return null;
  }
}

async function allAuthUsers(svc: any): Promise<any[]> {
  const users: any[] = [];
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await svc.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    const batch: any[] = data?.users ?? [];
    users.push(...batch);
    if (batch.length < 1000) break;
  }
  return users;
}

function touchAdminViews(userId?: string): void {
  revalidatePath("/app/dashboard");
  if (userId) revalidatePath(`/app/clients/${userId}`);
}

// ── read ────────────────────────────────────────────────────────────────────

export async function listClients(): Promise<Result<AdminClient[]>> {
  if (!(await guard())) return bad("Admin access required", "FORBIDDEN");

  try {
    const svc = createServiceClient();

    const { data: profiles, error } = await svc
      .from("profiles")
      .select("id, full_name, business_name, billing_region, subscription_status");
    if (error) return fail("listClients.profiles", error);

    const { data: tenants, error: tErr } = await svc
      .from("clients")
      .select("id, whatsapp_phone_number_id, phone_provisioning, timezone, owner_whatsapp");
    if (tErr) return fail("listClients.clients", tErr);

    const tenantRows: any[] = (tenants ?? []) as any[];
    const tenantById = new Map<string, any>(
      tenantRows.map((t: any): [string, any] => [t.id, t])
    );

    const authUsers: any[] = await allAuthUsers(svc);
    const emailById = new Map<string, string>(
      authUsers.map((u: any): [string, string] => [u.id, u.email ?? ""])
    );

    const admins: string[] = adminEmails();

    // The service client is untyped, so `profiles` is `any`. Calling .map() on
    // `any` yields `any`, which makes every downstream callback parameter an
    // implicit any (TS7006). Annotating this intermediate array restores
    // inference for the .filter() and .sort() below.
    const profileRows: any[] = (profiles ?? []) as any[];

    const mapped: AdminClient[] = profileRows.map((p: any): AdminClient => {
      const tenant: any = tenantById.get(p.id);
      const prov: any = tenant?.phone_provisioning ?? {};
      return {
        id: p.id,
        email: emailById.get(p.id) ?? "",
        business_name: p.business_name || "Unnamed business",
        full_name: p.full_name ?? null,
        billing_region: p.billing_region || "international",
        subscription_status: p.subscription_status || "inactive",
        whatsapp_phone_number_id: tenant?.whatsapp_phone_number_id ?? null,
        phone_option: prov.option ?? null,
        phone_number: prov.phone_number ?? null,
        phone_country: prov.country ?? null,
        timezone: tenant?.timezone ?? null,
        owner_whatsapp: tenant?.owner_whatsapp ?? null,
      };
    });

    const rows: AdminClient[] = mapped
      .filter(
        (c: AdminClient): boolean =>
          Boolean(c.email) && !admins.includes(c.email.toLowerCase())
      )
      .sort((a: AdminClient, b: AdminClient): number =>
        a.business_name.localeCompare(b.business_name)
      );

    return ok(rows);
  } catch (e) {
    return fail("listClients", e);
  }
}

export async function getAdminStatsForClient(
  userId: string,
  period: "week" | "month"
): Promise<Result<ClientStats>> {
  if (!(await guard())) return bad("Admin access required", "FORBIDDEN");
  if (!userId) return bad("Missing client id");

  try {
    const svc = createServiceClient();
    const limit = new Date();
    limit.setDate(limit.getDate() - (period === "week" ? 7 : 30));

    const { data, error } = await svc
      .from("appointments")
      .select("status, value, recovered_from_waitlist")
      .eq("client_id", userId)
      .gte("appointment_time", limit.toISOString());
    if (error) return fail("getAdminStatsForClient", error);

    const rows: any[] = (data ?? []) as any[];

    return ok({
      handled: rows.length,
      confirmed: rows.filter((a: any): boolean => a.status === "confirmed").length,
      cancelled: rows.filter((a: any): boolean => a.status === "cancelled").length,
      recovered: rows.filter((a: any): boolean => Boolean(a.recovered_from_waitlist))
        .length,
      revenueSaved: rows
        .filter((a: any): boolean => Boolean(a.recovered_from_waitlist))
        .reduce((sum: number, a: any): number => sum + (Number(a.value) || 0), 0),
    });
  } catch (e) {
    return fail("getAdminStatsForClient", e);
  }
}

/**
 * Plain-object variant for Client Components (StatsCards).
 * Returns zeros instead of a Result so the UI never has to branch.
 * Pass it across the boundary with `.bind(null, userId)` — an inline arrow
 * function is not a registered Server Action and will throw at render.
 */
export async function getClientStatsForPeriod(
  userId: string,
  period: "week" | "month"
): Promise<ClientStats> {
  const res = await getAdminStatsForClient(userId, period);
  if (!res.ok) {
    console.error("[XYNETRA] getClientStatsForPeriod", res.error);
    return EMPTY_STATS;
  }
  return res.data;
}

// ── write ───────────────────────────────────────────────────────────────────

export async function createClientAccount(input: {
  email: string;
  password: string;
  business_name: string;
  billing_region: string;
}): Promise<Result<{ userId: string }>> {
  if (!(await guard())) return bad("Admin access required", "FORBIDDEN");

  const email = input.email.trim().toLowerCase();
  const business_name = input.business_name.trim();

  if (!email) return bad("Login email is required");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return bad("That email address looks invalid");
  if (!business_name) return bad("Business name is required");
  if (!input.password || input.password.length < 8)
    return bad("Temporary password must be at least 8 characters");
  if (!isBillingRegion(input.billing_region)) return bad("Invalid billing region");

  try {
    const svc = createServiceClient();

    const { data, error } = await svc.auth.admin.createUser({
      email,
      password: input.password,
      email_confirm: true,
      user_metadata: {
        full_name: business_name,
        business_name,
        billing_region: input.billing_region,
      },
    });

    if (error) {
      const msg: string = /already|registered|exists/i.test(error.message ?? "")
        ? `An account already exists for ${email}.`
        : error.message ||
          `Supabase rejected the request (status ${(error as any).status}).`;
      return fail("createClientAccount.createUser", { ...error, message: msg });
    }

    const userId: string | undefined = data?.user?.id;
    if (!userId) return bad("Supabase returned no user.");

    const stamp = new Date().toISOString();

    // Service role bypasses RLS; runs whether or not the DB trigger fired.
    const { error: pErr } = await svc.from("profiles").upsert(
      {
        id: userId,
        full_name: business_name,
        business_name,
        billing_region: input.billing_region,
        subscription_status: "active",
        plan: "pro",
        updated_at: stamp,
      },
      { onConflict: "id" }
    );
    if (pErr) return fail("createClientAccount.profile", pErr);

    const { error: cErr } = await svc.from("clients").upsert(
      {
        id: userId,
        business_name,
        subscription_status: "active",
        updated_at: stamp,
      },
      { onConflict: "id" }
    );
    if (cErr) return fail("createClientAccount.clients", cErr);

    touchAdminViews(userId);
    return ok({ userId });
  } catch (e) {
    return fail("createClientAccount", e);
  }
}

export async function updateClientSettings(
  userId: string,
  input: { billing_region: string; subscription_status: string }
): Promise<Result> {
  if (!(await guard())) return bad("Admin access required", "FORBIDDEN");
  if (!userId) return bad("Missing client id");
  if (!isBillingRegion(input.billing_region)) return bad("Invalid billing region");
  if (!isSubscriptionStatus(input.subscription_status))
    return bad("Invalid subscription status");

  try {
    const svc = createServiceClient();
    const stamp = new Date().toISOString();

    const { error } = await svc
      .from("profiles")
      .update({
        billing_region: input.billing_region,
        subscription_status: input.subscription_status,
        updated_at: stamp,
      })
      .eq("id", userId);
    if (error) return fail("updateClientSettings.profile", error);

    const { error: cErr } = await svc.from("clients").upsert(
      {
        id: userId,
        subscription_status: input.subscription_status,
        updated_at: stamp,
      },
      { onConflict: "id" }
    );
    if (cErr) return fail("updateClientSettings.clients", cErr);

    touchAdminViews(userId);
    return ok(null);
  } catch (e) {
    return fail("updateClientSettings", e);
  }
}

export async function setClientPhoneNumberId(
  userId: string,
  phoneNumberId: string | null
): Promise<Result> {
  if (!(await guard())) return bad("Admin access required", "FORBIDDEN");
  if (!userId) return bad("Missing client id");

  const value: string | null = phoneNumberId?.trim() || null;
  if (value && !/^\d{5,}$/.test(value))
    return bad("Phone Number ID should be the numeric ID from Meta (digits only).");

  try {
    const svc = createServiceClient();
    const { error } = await svc.from("clients").upsert(
      {
        id: userId,
        whatsapp_phone_number_id: value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) return fail("setClientPhoneNumberId", error);

    touchAdminViews(userId);
    return ok(null);
  } catch (e) {
    return fail("setClientPhoneNumberId", e);
  }
}

export async function runSimulationForClient(userId: string): Promise<Result> {
  if (!(await guard())) return bad("Admin access required", "FORBIDDEN");
  if (!userId) return bad("Missing client id");

  try {
    const svc = createServiceClient();
    const day = 86_400_000;
    const now = Date.now();

    const mk = (
      name: string,
      offsetDays: number,
      status: string,
      value: number
    ): Record<string, unknown> => {
      const at = new Date(now + offsetDays * day).toISOString();
      return {
        client_id: userId,
        customer_name: name,
        appointment_time: at,
        start_time: at,
        status,
        timezone: "America/New_York",
        value,
        recovered_from_waitlist: status === "confirmed",
      };
    };

    const { error } = await svc.from("appointments").insert([
      mk("Sim: Olivia Hart", 2, "confirmed", 140),
      mk("Sim: Daniel Cho", 3, "cancelled", 180),
    ]);
    if (error) return fail("runSimulationForClient", error);

    touchAdminViews(userId);
    return ok(null);
  } catch (e) {
    return fail("runSimulationForClient", e);
  }
}