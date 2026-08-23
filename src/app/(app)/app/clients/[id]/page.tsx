// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { createServiceClient, createAuthAdminClient } from "@/lib/supabase/service";
// import { requireAdmin, getAdminStatsForClient } from "@/lib/admin/actions";
// import { StatsCards } from "@/components/dashbaord/StatsCards";
// import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
// import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
// import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
// import { AccountStatus } from "@/components/dashbaord/AccountStatus";

// export const dynamic = "force-dynamic";

// export default async function ClientPreviewPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   await requireAdmin();

//   const svc = createServiceClient();
//   const { data: profile } = await svc
//     .from("profiles")
//     .select("business_name, billing_region, subscription_status")
//     .eq("id", id)
//     .single();
//   if (!profile) notFound();

//   const auth = createAuthAdminClient();
//   const { data: u } = await auth.from("users").select("email").eq("id", id).single();
//   const email = u?.email || "—";

//   const nowIso = new Date().toISOString();
//   const [stats, appointments, reminders, waitlist] = await Promise.all([
//     getAdminStatsForClient(id, "week"),
//     svc.from("appointments").select("id, customer_name, appointment_time, status, timezone")
//       .eq("client_id", id).gte("appointment_time", nowIso)
//       .order("appointment_time", { ascending: true }).limit(10).then((r: any) => r.data || []),
//     svc.from("reminders").select("id, message, sent_at")
//       .eq("client_id", id).order("sent_at", { ascending: false }).limit(20).then((r: any) => r.data || []),
//     svc.from("client_waitlist").select("id, name, phone, created_at")
//       .eq("client_id", id).order("created_at", { ascending: false }).then((r: any) => r.data || []),
//   ]);

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between border-b border-grey-line pb-6">
//         <div>
//           <p className="eyebrow text-ink/50">Admin preview · read‑only</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//             {profile.business_name}
//           </h1>
//           <p className="mt-1 font-body text-sm text-ink/60">{email}</p>
//         </div>
//         <Link href="/app/dashboard" className="font-body text-sm font-semibold text-indigo-600 hover:underline">
//           ← Back to Control Panel
//         </Link>
//       </div>

//       <StatsCards
//         initialStats={stats}
//         periodFetcher={(p) => getAdminStatsForClient(id, p)}
//       />
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} readOnly />
//       </div>
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <ActivityFeed reminders={reminders} />
//         <AccountStatus profile={profile} email={email} />
//       </div>
//     </div>
//   );
// }






// // src/app/(app)/app/clients/[id]/page.tsx
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { createServiceClient } from "@/lib/supabase/service"; // <-- FIXED PATH HERE
// import { requireAdmin, getAdminStatsForClient } from "@/lib/admin/actions";
// import { StatsCards } from "@/components/dashbaord/StatsCards"; // <-- MATCHED YOUR FOLDER SPELLING
// import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
// import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
// import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
// import { AccountStatus } from "@/components/dashbaord/AccountStatus";

// export const dynamic = "force-dynamic";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function ClientPreviewPage({ params }: PageProps) {
//   const { id } = await params;
//   await requireAdmin();

//   const svc = createServiceClient();
//   const { data: profile } = await svc
//     .from("profiles")
//     .select("business_name, billing_region, subscription_status")
//     .eq("id", id)
//     .single();

//   if (!profile) notFound();

//   // Safely get authentication account details from admin payload
//   const { data: authUser } = await svc.auth.admin.getUserById(id);
//   const email = authUser?.user?.email || "—";

//   const nowIso = new Date().toISOString();
//   const [stats, appointments, reminders, waitlist] = await Promise.all([
//     getAdminStatsForClient(id, "week"),
//     svc.from("appointments").select("id, customer_name, appointment_time, status, timezone")
//       .eq("client_id", id).gte("appointment_time", nowIso)
//       .order("appointment_time", { ascending: true }).limit(10).then((r: any) => r.data || []),
//     svc.from("reminders").select("id, message, sent_at")
//       .eq("client_id", id).order("sent_at", { ascending: false }).limit(20).then((r: any) => r.data || []),
//     svc.from("client_waitlist").select("id, name, phone, created_at")
//       .eq("client_id", id).order("created_at", { ascending: false }).then((r: any) => r.data || []),
//   ]);

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between border-b border-grey-line pb-6">
//         <div>
//           <p className="eyebrow text-ink/50">Admin preview · read‑only</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//             {profile.business_name}
//           </h1>
//           <p className="mt-1 font-body text-sm text-ink/60">{email}</p>
//         </div>
//         <Link href="/app/dashboard" className="font-body text-sm font-semibold text-indigo-600 hover:underline">
//           ← Back to Control Panel
//         </Link>
//       </div>

//       <StatsCards
//         initialStats={stats}
//         periodFetcher={(p) => getAdminStatsForClient(id, p)}
//       />
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} readOnly />
//       </div>
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <ActivityFeed reminders={reminders} />
//         <AccountStatus profile={profile} email={email} />
//       </div>
//     </div>
//   );
// }





// src/app/(app)/app/clients/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import { requireAdmin } from "@/lib/admin/guard";
import { getAdminStatsForClient, getClientStatsForPeriod } from "@/lib/admin/actions";
import type { ClientStats } from "@/lib/admin/roles";
import { StatsCards } from "@/components/dashbaord/StatsCards";
import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
import { AccountStatus } from "@/components/dashbaord/AccountStatus";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

const EMPTY_STATS: ClientStats = {
  handled: 0,
  confirmed: 0,
  cancelled: 0,
  recovered: 0,
  revenueSaved: 0,
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Runs a Supabase query without ever throwing. A missing table or column
 * degrades one panel instead of blowing up the whole page with the opaque
 * "An error occurred in the Server Components render" message.
 */
async function safeRows<T>(
  label: string,
  query: PromiseLike<{ data: T[] | null; error: any }>
): Promise<T[]> {
  try {
    const { data, error } = await query;
    if (error) {
      console.error(`[XYNETRA] clients/[id] ${label}`, error.code ?? "", error.message ?? error);
      return [];
    }
    return data ?? [];
  } catch (e: any) {
    console.error(`[XYNETRA] clients/[id] ${label} threw`, e?.message ?? e);
    return [];
  }
}

export default async function ClientPreviewPage({ params }: PageProps) {
  const { id } = await params;

  // Redirects (never throws) if the viewer is not an admin.
  await requireAdmin();

  // A malformed id would make Postgres raise 22P02 rather than 404.
  if (!UUID_RE.test(id)) notFound();

  const svc = createServiceClient();

  const { data: profile, error: profileError } = await svc
    .from("profiles")
    .select("business_name, billing_region, subscription_status")
    .eq("id", id)
    .maybeSingle();

  if (profileError) {
    console.error("[XYNETRA] clients/[id] profile", profileError.code, profileError.message);
  }
  if (!profile) notFound();

  // Auth lookup is non-fatal — a missing email should not 500 the page.
  let email = "—";
  try {
    const { data: authUser, error: authError } = await svc.auth.admin.getUserById(id);
    if (authError) console.error("[XYNETRA] clients/[id] getUserById", authError.message);
    email = authUser?.user?.email ?? "—";
  } catch (e: any) {
    console.error("[XYNETRA] clients/[id] getUserById threw", e?.message ?? e);
  }

  const nowIso = new Date().toISOString();

  const [statsRes, appointments, reminders, waitlist] = await Promise.all([
    getAdminStatsForClient(id, "week"),
    safeRows(
      "appointments",
      svc
        .from("appointments")
        .select("id, customer_name, appointment_time, status, timezone")
        .eq("client_id", id)
        .gte("appointment_time", nowIso)
        .order("appointment_time", { ascending: true })
        .limit(10)
    ),
    safeRows(
      "reminders",
      svc
        .from("reminders")
        .select("id, message, sent_at")
        .eq("client_id", id)
        .order("sent_at", { ascending: false })
        .limit(20)
    ),
    safeRows(
      "client_waitlist",
      svc
        .from("client_waitlist")
        .select("id, name, phone, created_at")
        .eq("client_id", id)
        .order("created_at", { ascending: false })
    ),
  ]);

  const stats: ClientStats = statsRes.ok ? statsRes.data : EMPTY_STATS;
  if (!statsRes.ok) console.error("[XYNETRA] clients/[id] stats", statsRes.error);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-grey-line pb-6">
        <div>
          <p className="eyebrow text-ink/50">Admin preview · read-only</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
            {profile.business_name || "Unnamed business"}
          </h1>
          <p className="mt-1 font-body text-sm text-ink/60">{email}</p>
        </div>
        <Link
          href="/app/dashboard"
          className="font-body text-sm font-semibold text-indigo-600 hover:underline"
        >
          ← Back to Control Panel
        </Link>
      </div>

      {!statsRes.ok && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 font-body text-sm text-amber-800">
          Stats could not be loaded: {statsRes.error}
        </div>
      )}

      {/*
        `.bind(null, id)` creates a real bound Server Action.
        An inline arrow `(p) => getClientStatsForPeriod(id, p)` is NOT
        serializable and throws if StatsCards is a Client Component.
      */}
      <StatsCards
        initialStats={stats}
        periodFetcher={getClientStatsForPeriod.bind(null, id)}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <UpcomingAppointments appointments={appointments} />
        <WaitlistManager initialWaitlist={waitlist} readOnly />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ActivityFeed reminders={reminders} />
        <AccountStatus profile={profile} email={email} />
      </div>
    </div>
  );
}