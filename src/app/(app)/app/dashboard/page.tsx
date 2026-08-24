// import type { Metadata } from "next";
// import type { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import { getAccount } from "@/lib/account";
// import { createClient } from "@/lib/supabase/server";
// import { isAdminEmail } from "@/lib/admin/roles";
// import { listClients } from "@/lib/admin/actions";
// import { AdminControlPanel } from "@/components/admin/AdminControlPanel";

// import { StatsCards } from "@/components/dashbaord/StatsCards";
// import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
// import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
// import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
// import { NeedsAttention } from "@/components/dashbaord/NeedsAttention";
// import { AccountStatus } from "@/components/dashbaord/AccountStatus";
// import {
//   getDashboardStats,
//   getUpcomingAppointments,
//   getRecentReminders,
//   getWaitlist,
//   getOpenHandoffs,
// } from "@/lib/dashboard/action";

// export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// /**
//  * ⚠️ `redirect()` throws a NEXT_REDIRECT sentinel error. Never call it inside
//  * a try/catch that swallows errors, or the redirect silently becomes a no-op.
//  * Every redirect below therefore sits OUTSIDE any try block.
//  */

// type ProfileRow = {
//   subscription_status: string | null;
//   billing_region: string | null;
// } | null;

// type ClientRow = {
//   paused: boolean | null;
//   whatsapp_status: string | null;
//   whatsapp_display_name: string | null;
//   whatsapp_number: string | null;
// } | null;

// /** Grouped so a failure can be caught without losing tuple types. */
// async function loadDashboard(supabase: any, userId: string) {
//   const [stats, appointments, reminders, waitlist, handoffs, clientRes] =
//     await Promise.all([
//       getDashboardStats("week"),
//       getUpcomingAppointments(),
//       getRecentReminders(),
//       getWaitlist(),
//       getOpenHandoffs(),
//       supabase
//         .from("clients")
//         .select("paused, whatsapp_status, whatsapp_display_name, whatsapp_number")
//         .eq("id", userId)
//         .maybeSingle(),
//     ]);

//   if (clientRes?.error) {
//     console.error(
//       "[XYNETRA] dashboard.clients",
//       clientRes.error.code ?? "",
//       clientRes.error.message ?? clientRes.error
//     );
//   }

//   return {
//     stats,
//     appointments,
//     reminders,
//     waitlist,
//     handoffs,
//     client: (clientRes?.data ?? null) as ClientRow,
//   };
// }

// export default async function DashboardPage() {
//   // ── account ───────────────────────────────────────────────────────────────
//   let account: Awaited<ReturnType<typeof getAccount>> | null = null;
//   try {
//     account = await getAccount();
//   } catch (e: any) {
//     console.error("[XYNETRA] dashboard.getAccount", e?.message ?? e);
//   }
//   if (!account) redirect("/login?next=/app/dashboard");

//   // ── admin branch ──────────────────────────────────────────────────────────
//   if (isAdminEmail(account.email)) {
//     const res = await listClients(); // returns a Result; never throws
//     const clients = res.ok ? res.data : [];
//     const clientsError = res.ok ? null : res.error;

//     if (clientsError) {
//       console.error("[XYNETRA] dashboard.listClients", clientsError);
//     }

//     return (
//       <div>
//         <header className="mb-8 border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Internal</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//             Control Panel
//           </h1>
//         </header>
//         <AdminControlPanel initialClients={clients} loadError={clientsError} />
//       </div>
//     );
//   }

//   const supabase = await createClient();

//   // ── subscription gate ─────────────────────────────────────────────────────
//   let profile: ProfileRow = null;
//   let profileFailed = false;
//   try {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("subscription_status, billing_region")
//       .eq("id", account.userId)
//       .maybeSingle();

//     if (error) {
//       profileFailed = true;
//       console.error("[XYNETRA] dashboard.profile", error.code, error.message);
//     }
//     profile = (data ?? null) as ProfileRow;
//   } catch (e: any) {
//     profileFailed = true;
//     console.error("[XYNETRA] dashboard.profile.threw", e?.message ?? e);
//   }

//   // Only gate on a status we actually read. A failed query must not trap a
//   // paying customer in a /app/checkout redirect loop.
//   if (!profileFailed && profile && profile.subscription_status !== "active") {
//     redirect("/app/checkout");
//   }

//   // ── onboarding gate ───────────────────────────────────────────────────────
//   let onboardingCompleted: boolean | null = null; // null = could not determine
//   try {
//     const { data, error } = await supabase
//       .from("onboarding")
//       .select("completed_at")
//       .eq("user_id", account.userId)
//       .maybeSingle();

//     if (error) {
//       console.error("[XYNETRA] dashboard.onboarding", error.code, error.message);
//     } else {
//       onboardingCompleted = Boolean(data?.completed_at);
//     }
//   } catch (e: any) {
//     console.error("[XYNETRA] dashboard.onboarding.threw", e?.message ?? e);
//   }

//   if (onboardingCompleted === false) redirect("/onboarding");

//   // ── data ──────────────────────────────────────────────────────────────────
//   let dash: Awaited<ReturnType<typeof loadDashboard>> | null = null;
//   try {
//     dash = await loadDashboard(supabase, account.userId);
//   } catch (e: any) {
//     console.error("[XYNETRA] dashboard.load", e?.message ?? e);
//   }

//   if (!dash) {
//     return (
//       <div className="space-y-10">
//         <header className="border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Client Dashboard</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//             {account.businessName}
//           </h1>
//         </header>
//         <Banner tone="warn">
//           We couldn&apos;t load your dashboard data just now. Please refresh — if this
//           keeps happening,{" "}
//           <a href="/contact" className="font-semibold underline">
//             contact support
//           </a>
//           .
//         </Banner>
//       </div>
//     );
//   }

//   const { stats, appointments, reminders, waitlist, handoffs, client } = dash;
//   const paused = Boolean(client?.paused);
//   const linePending = client?.whatsapp_status === "pending";
//   const currency = profile?.billing_region === "pakistan" ? "PKR" : "USD";

//   return (
//     <div className="space-y-10">
//       <header className="border-b border-grey-line pb-6">
//         <p className="eyebrow text-ink/50">Client Dashboard</p>
//         <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//           {account.businessName}
//         </h1>
//         <p className="mt-1 font-body text-sm text-ink/60">
//           Reminders, confirmations, and recovered slots — live.
//         </p>
//       </header>

//       {paused && (
//         <Banner tone="warn">
//           Your service is paused — no reminders are going out. Resume it in{" "}
//           <a href="/app/settings" className="font-semibold underline">
//             Settings
//           </a>
//           .
//         </Banner>
//       )}

//       {!paused && linePending && (
//         <Banner tone="info">
//           Your dedicated number is being set up — usually within one business day.
//           Reminders start automatically once it&apos;s live.
//         </Banner>
//       )}

//       <StatsCards initialStats={stats} currency={currency} />

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} readOnly={false} />
//       </div>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <NeedsAttention initialHandoffs={handoffs} />
//         <ActivityFeed reminders={reminders} />
//       </div>

//       <AccountStatus profile={profile} email={account.email} client={client} />
//     </div>
//   );
// }

// function Banner({ tone, children }: { tone: "warn" | "info"; children: ReactNode }) {
//   const cls =
//     tone === "warn"
//       ? "border-coral/40 bg-coral-light text-ink"
//       : "border-grey-line bg-grey-light text-ink/70";
//   return (
//     <div className={`rounded-lg border px-4 py-3 font-body text-sm ${cls}`}>
//       {children}
//     </div>
//   );
// }


// import type { Metadata } from "next";
// import type { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import { getAccount } from "@/lib/account";
// import { createClient } from "@/lib/supabase/server";
// import { isAdminEmail } from "@/lib/admin/roles";
// import { listClients } from "@/lib/admin/actions";
// import { AdminControlPanel } from "@/components/admin/AdminControlPanel";

// import { StatsCards } from "@/components/dashbaord/StatsCards";
// import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
// import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
// import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
// import { NeedsAttention } from "@/components/dashbaord/NeedsAttention";
// import { AccountStatus } from "@/components/dashbaord/AccountStatus";
// import {
//   getDashboardStats,
//   getUpcomingAppointments,
//   getRecentReminders,
//   getWaitlist,
//   getOpenHandoffs,
// } from "@/lib/dashboard/action";

// export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// /**
//  * Flow for non-admins:
//  *   login → (if not active) /app/checkout → (paid) /onboarding → /app/dashboard
//  * redirect() must stay outside swallow-all try/catch.
//  */

// type ProfileRow = {
//   subscription_status: string | null;
//   billing_region: string | null;
//   onboarding_completed_at?: string | null;
// } | null;

// type ClientRow = {
//   paused: boolean | null;
//   whatsapp_status: string | null;
//   whatsapp_display_name: string | null;
//   whatsapp_number: string | null;
// } | null;

// async function loadDashboard(supabase: any, userId: string) {
//   const [stats, appointments, reminders, waitlistPayload, handoffs, clientRes] =
//     await Promise.all([
//       getDashboardStats("week"),
//       getUpcomingAppointments(),
//       getRecentReminders(),
//       getWaitlist(),
//       getOpenHandoffs(),
//       supabase
//         .from("clients")
//         .select("paused, whatsapp_status, whatsapp_display_name, whatsapp_number")
//         .eq("id", userId)
//         .maybeSingle(),
//     ]);

//   if (clientRes?.error) {
//     console.error(
//       "[XYNETRA] dashboard.clients",
//       clientRes.error.code ?? "",
//       clientRes.error.message ?? clientRes.error
//     );
//   }

//   return {
//     stats,
//     appointments,
//     reminders,
//     waitlistPayload,
//     handoffs,
//     client: (clientRes?.data ?? null) as ClientRow,
//   };
// }

// export default async function DashboardPage() {
//   let account: Awaited<ReturnType<typeof getAccount>> | null = null;
//   try {
//     account = await getAccount();
//   } catch (e: any) {
//     console.error("[XYNETRA] dashboard.getAccount", e?.message ?? e);
//   }
//   if (!account) redirect("/login?next=/app/dashboard");

//   // ── admin ────────────────────────────────────────────────────────────────
//   if (isAdminEmail(account.email)) {
//     const res = await listClients();
//     const clients = res.ok ? res.data : [];
//     const clientsError = res.ok ? null : res.error;

//     if (clientsError) {
//       console.error("[XYNETRA] dashboard.listClients", clientsError);
//     }

//     return (
//       <div>
//         <header className="mb-8 border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Internal</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//             Control Panel
//           </h1>
//         </header>
//         <AdminControlPanel initialClients={clients} loadError={clientsError} />
//       </div>
//     );
//   }

//   const supabase = await createClient();

//   // ── 1) Must pay (Paddle) before anything else ────────────────────────────
//   let profile: ProfileRow = null;
//   let profileFailed = false;
//   try {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("subscription_status, billing_region, onboarding_completed_at")
//       .eq("id", account.userId)
//       .maybeSingle();

//     if (error) {
//       profileFailed = true;
//       console.error("[XYNETRA] dashboard.profile", error.code, error.message);
//     }
//     profile = (data ?? null) as ProfileRow;
//   } catch (e: any) {
//     profileFailed = true;
//     console.error("[XYNETRA] dashboard.profile.threw", e?.message ?? e);
//   }

//   if (!profileFailed && profile && profile.subscription_status !== "active") {
//     redirect("/app/checkout");
//   }

//   // ── 2) Then onboarding ───────────────────────────────────────────────────
//   let onboardingDone: boolean | null = null;
//   try {
//     if (profile?.onboarding_completed_at) {
//       onboardingDone = true;
//     } else {
//       const { data, error } = await supabase
//         .from("onboarding")
//         .select("completed_at")
//         .eq("user_id", account.userId)
//         .maybeSingle();

//       if (error) {
//         console.error("[XYNETRA] dashboard.onboarding", error.code, error.message);
//       } else {
//         onboardingDone = Boolean(data?.completed_at);
//       }
//     }
//   } catch (e: any) {
//     console.error("[XYNETRA] dashboard.onboarding.threw", e?.message ?? e);
//   }

//   if (onboardingDone === false) redirect("/onboarding");

//   // ── data ─────────────────────────────────────────────────────────────────
//   let dash: Awaited<ReturnType<typeof loadDashboard>> | null = null;
//   try {
//     dash = await loadDashboard(supabase, account.userId);
//   } catch (e: any) {
//     console.error("[XYNETRA] dashboard.load", e?.message ?? e);
//   }

//   if (!dash) {
//     return (
//       <div className="space-y-10">
//         <header className="border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Client Dashboard</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//             {account.businessName}
//           </h1>
//         </header>
//         <Banner tone="warn">
//           We couldn&apos;t load your dashboard data just now. Please refresh — if this
//           keeps happening,{" "}
//           <a href="/contact" className="font-semibold underline">
//             contact support
//           </a>
//           .
//         </Banner>
//       </div>
//     );
//   }

//   const { stats, appointments, reminders, waitlistPayload, handoffs, client } = dash;
//   const paused = Boolean(client?.paused);
//   const linePending = client?.whatsapp_status === "pending";
//   const currency = profile?.billing_region === "pakistan" ? "PKR" : "USD";

//   return (
//     <div className="space-y-10">
//       <header className="border-b border-grey-line pb-6">
//         <p className="eyebrow text-ink/50">Client Dashboard</p>
//         <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//           {account.businessName}
//         </h1>
//         <p className="mt-1 font-body text-sm text-ink/60">
//           Reminders, confirmations, and recovered slots — live.
//         </p>
//       </header>

//       {paused && (
//         <Banner tone="warn">
//           Your service is paused — no reminders are going out. Resume it in{" "}
//           <a href="/app/settings" className="font-semibold underline">
//             Settings
//           </a>
//           .
//         </Banner>
//       )}

//       {!paused && linePending && (
//         <Banner tone="info">
//           Your dedicated number is being set up — usually within one business day.
//           Reminders start automatically once it&apos;s live.
//         </Banner>
//       )}

//       <StatsCards initialStats={stats} currency={currency} />

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager
//           initialWaitlist={waitlistPayload.entries}
//           initialAutoExpire={waitlistPayload.autoExpire}
//           ttlDays={waitlistPayload.ttlDays}
//           readOnly={false}
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <NeedsAttention initialHandoffs={handoffs} />
//         <ActivityFeed reminders={reminders} />
//       </div>

//       <AccountStatus profile={profile} email={account.email} client={client} />
//     </div>
//   );
// }

// function Banner({ tone, children }: { tone: "warn" | "info"; children: ReactNode }) {
//   const cls =
//     tone === "warn"
//       ? "border-coral/40 bg-coral-light text-ink"
//       : "border-grey-line bg-grey-light text-ink/70";
//   return (
//     <div className={`rounded-lg border px-4 py-3 font-body text-sm ${cls}`}>
//       {children}
//     </div>
//   );
// }



import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/lib/account";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/roles";
import { listClients } from "@/lib/admin/actions";
import { AdminControlPanel } from "@/components/admin/AdminControlPanel";

import { StatsCards } from "@/components/dashbaord/StatsCards";
import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
import { NeedsAttention } from "@/components/dashbaord/NeedsAttention";
import { AccountStatus } from "@/components/dashbaord/AccountStatus";
import {
  getDashboardStats,
  getUpcomingAppointments,
  getRecentReminders,
  getWaitlist,
  getOpenHandoffs,
} from "@/lib/dashboard/action";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProfileRow = {
  subscription_status: string | null;
  billing_region: string | null;
  onboarding_completed_at?: string | null;
} | null;

type ClientRow = {
  paused: boolean | null;
  whatsapp_status: string | null;
  whatsapp_display_name: string | null;
  whatsapp_number: string | null;
} | null;

async function loadDashboard(supabase: any, userId: string) {
  const [stats, appointments, reminders, waitlistPayload, handoffs, clientRes] =
    await Promise.all([
      getDashboardStats("week"),
      getUpcomingAppointments(),
      getRecentReminders(),
      getWaitlist(),
      getOpenHandoffs(),
      supabase
        .from("clients")
        .select(
          "paused, whatsapp_status, whatsapp_display_name, whatsapp_number"
        )
        .eq("id", userId)
        .maybeSingle(),
    ]);

  if (clientRes?.error) {
    console.error(
      "[XYNETRA] dashboard.clients",
      clientRes.error.code ?? "",
      clientRes.error.message ?? clientRes.error
    );
  }

  return {
    stats,
    appointments,
    reminders,
    waitlistPayload,
    handoffs,
    client: (clientRes?.data ?? null) as ClientRow,
  };
}

export default async function DashboardPage() {
  let account: Awaited<ReturnType<typeof getAccount>> | null = null;
  try {
    account = await getAccount();
  } catch (e: any) {
    console.error("[XYNETRA] dashboard.getAccount", e?.message ?? e);
  }
  if (!account) redirect("/login?next=/app/dashboard");

  if (isAdminEmail(account.email)) {
    const res = await listClients();
    const clients = res.ok ? res.data : [];
    const clientsError = res.ok ? null : res.error;
    if (clientsError) {
      console.error("[XYNETRA] dashboard.listClients", clientsError);
    }

    return (
      <div>
        <header className="mb-8 border-b border-grey-line pb-6">
          <p className="eyebrow text-ink/50">Internal</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
            Control Panel
          </h1>
        </header>
        <AdminControlPanel initialClients={clients} loadError={clientsError} />
      </div>
    );
  }

  const supabase = await createClient();

  let profile: ProfileRow = null;
  let profileFailed = false;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("subscription_status, billing_region, onboarding_completed_at")
      .eq("id", account.userId)
      .maybeSingle();

    if (error) {
      profileFailed = true;
      console.error("[XYNETRA] dashboard.profile", error.code, error.message);
    }
    profile = (data ?? null) as ProfileRow;
  } catch (e: any) {
    profileFailed = true;
    console.error("[XYNETRA] dashboard.profile.threw", e?.message ?? e);
  }

  // 1) Pay first
  if (!profileFailed && profile && profile.subscription_status !== "active") {
    redirect("/app/checkout");
  }

  // 2) Then onboarding
  let onboardingDone: boolean | null = null;
  try {
    if (profile?.onboarding_completed_at) {
      onboardingDone = true;
    } else {
      const { data, error } = await supabase
        .from("onboarding")
        .select("completed_at")
        .eq("user_id", account.userId)
        .maybeSingle();

      if (error) {
        console.error(
          "[XYNETRA] dashboard.onboarding",
          error.code,
          error.message
        );
      } else {
        onboardingDone = Boolean(data?.completed_at);
      }
    }
  } catch (e: any) {
    console.error("[XYNETRA] dashboard.onboarding.threw", e?.message ?? e);
  }

  if (onboardingDone === false) redirect("/onboarding");

  let dash: Awaited<ReturnType<typeof loadDashboard>> | null = null;
  try {
    dash = await loadDashboard(supabase, account.userId);
  } catch (e: any) {
    console.error("[XYNETRA] dashboard.load", e?.message ?? e);
  }

  if (!dash) {
    return (
      <div className="space-y-10">
        <header className="border-b border-grey-line pb-6">
          <p className="eyebrow text-ink/50">Client Dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
            {account.businessName}
          </h1>
        </header>
        <Banner tone="warn">
          We couldn&apos;t load your dashboard data just now. Please refresh — if
          this keeps happening,{" "}
          <a href="/contact" className="font-semibold underline">
            contact support
          </a>
          .
        </Banner>
      </div>
    );
  }

  const { stats, appointments, reminders, waitlistPayload, handoffs, client } =
    dash;
  const paused = Boolean(client?.paused);
  const linePending = client?.whatsapp_status === "pending";
  const currency = profile?.billing_region === "pakistan" ? "PKR" : "USD";

  return (
    <div className="space-y-10">
      <header className="border-b border-grey-line pb-6">
        <p className="eyebrow text-ink/50">Client Dashboard</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
          {account.businessName}
        </h1>
        <p className="mt-1 font-body text-sm text-ink/60">
          Reminders, confirmations, and recovered slots — live.
        </p>
      </header>

      {paused && (
        <Banner tone="warn">
          Your service is paused — no reminders are going out. Resume it in{" "}
          <a href="/app/settings" className="font-semibold underline">
            Settings
          </a>
          .
        </Banner>
      )}

      {!paused && linePending && (
        <Banner tone="info">
          Your dedicated number is being set up — usually within one business day.
          Reminders start automatically once it&apos;s live.
        </Banner>
      )}

      <StatsCards initialStats={stats} currency={currency} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <UpcomingAppointments appointments={appointments} />
        <WaitlistManager
          initialWaitlist={waitlistPayload.entries}
          initialAutoExpire={waitlistPayload.autoExpire}
          ttlDays={waitlistPayload.ttlDays}
          readOnly={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <NeedsAttention initialHandoffs={handoffs} />
        <ActivityFeed reminders={reminders} />
      </div>

      <AccountStatus profile={profile} email={account.email} client={client} />
    </div>
  );
}

function Banner({
  tone,
  children,
}: {
  tone: "warn" | "info";
  children: ReactNode;
}) {
  const cls =
    tone === "warn"
      ? "border-coral/40 bg-coral-light text-ink"
      : "border-grey-line bg-grey-light text-ink/70";
  return (
    <div className={`rounded-lg border px-4 py-3 font-body text-sm ${cls}`}>
      {children}
    </div>
  );
}