import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdminEmail } from "@/lib/admin/roles";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function authorized(req: Request): Promise<{ ok: boolean; via: string }> {
  const key = process.env.HEALTH_KEY?.trim();
  const provided = new URL(req.url).searchParams.get("key")?.trim();

  if (key && provided && provided === key) return { ok: true, via: "key" };

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (isAdminEmail(data.user?.email)) return { ok: true, via: "session" };
  } catch { /* ignore */ }

  console.error("[XYNETRA] health.denied", {
    healthKeyConfigured: Boolean(key),
    keyProvided: Boolean(provided),
    keyMatched: Boolean(key && provided && key === provided),
  });
  return { ok: false, via: "none" };
}

export async function GET(req: Request) {
  const auth = await authorized(req);
  if (!auth.ok) return new Response("Not found", { status: 404 });

  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const env = {
    authorizedVia: auth.via,
    hasUrl: !!raw,
    urlHost: (() => { try { return new URL(raw!).host; } catch { return "INVALID"; } })(),
    urlHasWhitespace: raw !== raw?.trim(),
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasHealthKey: !!process.env.HEALTH_KEY,
    hasAdminEmails: !!process.env.ADMIN_EMAILS,
    hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
    proxyVarsSet: !!(process.env.HTTP_PROXY || process.env.HTTPS_PROXY),
    tlsVerifyDisabled: process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0",
  };

  let ping: any;
  try {
    const r = await fetch(`${raw}/auth/v1/health`, { cache: "no-store" });
    ping = { ok: r.ok, status: r.status };
  } catch (e: any) {
    ping = { ok: false, message: e?.message, code: e?.cause?.code, host: e?.cause?.hostname };
  }

  const schema: Record<string, any> = {};
  try {
    const svc = createServiceClient();
    const probes: [string, string][] = [
      ["profiles", "id, business_name, billing_region, subscription_status, plan, updated_at"],
      ["clients", "id, business_name, whatsapp_phone_number_id, phone_provisioning, timezone, owner_whatsapp, subscription_status, paused, whatsapp_status"],
      ["appointments", "id, client_id, status, value, recovered_from_waitlist, appointment_time"],
      ["onboarding", "user_id, completed_at"],
      ["reminders", "id, client_id, message, sent_at"],
      ["client_waitlist", "id, client_id, name, phone, created_at"],
    ];
    for (const [table, cols] of probes) {
      const { error } = await svc.from(table).select(cols).limit(1);
      schema[table] = error
        ? { ok: false, code: error.code, message: error.message }
        : { ok: true };
    }
    const { error: uErr } = await svc.auth.admin.listUsers({ page: 1, perPage: 1 });
    schema.authAdmin = uErr ? { ok: false, message: uErr.message } : { ok: true };
  } catch (e: any) {
    schema.error = e?.message;
  }

  return Response.json({ env, ping, schema }, { headers: { "cache-control": "no-store" } });
}