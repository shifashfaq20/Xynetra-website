// import { createClient } from '@/lib/supabase/server';
// import { redirect } from 'next/navigation';
// import {
//   getDashboardStats,
//   getUpcomingAppointments,
//   getRecentReminders,
//   getWaitlist,
// } from '@/lib/dashboard/action';
// import { StatsCards } from '@/components/dashbaord/StatsCards';
// import { UpcomingAppointments } from '@/components/dashbaord/UpcomingAppointments';
// import { WaitlistManager } from '@/components/dashbaord/WaitlistManager';
// import { ActivityFeed } from '@/components/dashbaord/ActivityFeed';
// import { AccountStatus } from '@/components/dashbaord/AccountStatus';

// export default async function ClientDashboardPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) redirect('/login');

//   // Gate: must have completed onboarding
//   const { data: ops } = await supabase
//     .from('client_operations')
//     .select('id')
//     .eq('user_id', user.id)
//     .single();
//   if (!ops) redirect('/onboarding');

//   // Fetch data
//   const [stats, appointments, reminders, waitlist] = await Promise.all([
//     getDashboardStats('week'),
//     getUpcomingAppointments(),
//     getRecentReminders(),
//     getWaitlist(),
//   ]);

//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('plan, subscription_status, paddle_customer_id')
//     .eq('id', user.id)
//     .single();

//   return (
//     <div className="space-y-8 p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//       <StatsCards initialStats={stats} />
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed reminders={reminders} />
//         <AccountStatus profile={profile} />
//       </div>
//     </div>
//   );
// }




// import { createClient } from '@/lib/supabase/server';
// import { redirect } from 'next/navigation';
// import {
//   getDashboardStats,
//   getUpcomingAppointments,
//   getRecentReminders,
//   getWaitlist,
// } from '@/lib/dashboard/action';
// import { StatsCards } from '@/components/dashbaord/StatsCards';
// import { UpcomingAppointments } from '@/components/dashbaord/UpcomingAppointments';
// import { WaitlistManager } from '@/components/dashbaord/WaitlistManager';
// import { ActivityFeed } from '@/components/dashbaord/ActivityFeed';
// import { AccountStatus } from '@/components/dashbaord/AccountStatus';

// export default async function ClientDashboardPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) redirect('/login');

//   // Gate: must have completed onboarding (defensive)
//   let ops: any = null;
//   try {
//     const { data } = await supabase
//       .from('client_operations')
//       .select('id')
//       .eq('user_id', user.id)
//       .maybeSingle();
//     ops = data;
//   } catch {
//     ops = null;
//   }
//   if (!ops) redirect('/onboarding');

//   const [stats, appointments, reminders, waitlist] = await Promise.all([
//     getDashboardStats('week'),
//     getUpcomingAppointments(),
//     getRecentReminders(),
//     getWaitlist(),
//   ]);

//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('plan, subscription_status, paddle_customer_id')
//     .eq('id', user.id)
//     .single();

//   return (
//     <div className="space-y-8 p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//       <StatsCards initialStats={stats} />
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed reminders={reminders} />
//         <AccountStatus profile={profile} />
//       </div>
//     </div>
//   );
// }



// src/app/(app)/client/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  getDashboardStats,
  getUpcomingAppointments,
  getRecentReminders,
  getWaitlist,
} from "@/lib/dashboard/action";
import { StatsCards } from "@/components/dashbaord/StatsCards";
import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
import { AccountStatus } from "@/components/dashbaord/AccountStatus";
import { isAdminEmail } from "@/lib/admin/roles";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Client dashboard (legacy path under /client/dashboard).
 * Flow: login → checkout (if unpaid) → onboarding → dashboard
 */
export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/client/dashboard");

  // Admins use the main control panel
  if (user.email && isAdminEmail(user.email)) {
    redirect("/app/dashboard");
  }

  // Profile for billing + onboarding gates
  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "plan, subscription_status, paddle_customer_id, billing_region, business_name, onboarding_completed_at"
    )
    .eq("id", user.id)
    .maybeSingle();

  // 1) Must be paid (Paddle / admin-activated) before onboarding or dashboard
  if (profile?.subscription_status !== "active") {
    redirect("/app/checkout");
  }

  // 2) Onboarding must be finished
  let onboardingDone = Boolean(profile?.onboarding_completed_at);
  if (!onboardingDone) {
    try {
      const { data: onboarding } = await supabase
        .from("onboarding")
        .select("completed_at")
        .eq("user_id", user.id)
        .maybeSingle();
      onboardingDone = Boolean(onboarding?.completed_at);
    } catch {
      /* fall through */
    }
  }

  // Legacy fallback used by this route historically
  if (!onboardingDone) {
    try {
      const { data: ops } = await supabase
        .from("client_operations")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      onboardingDone = Boolean(ops?.id);
    } catch {
      /* fall through */
    }
  }

  if (!onboardingDone) redirect("/onboarding");

  const [stats, appointments, reminders, waitlistPayload] = await Promise.all([
    getDashboardStats("week"),
    getUpcomingAppointments(),
    getRecentReminders(),
    getWaitlist(),
  ]);

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Client Dashboard
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {profile?.business_name || "Dashboard"}
        </h1>
      </header>

      <StatsCards initialStats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointments appointments={appointments} />
        <WaitlistManager
          initialWaitlist={waitlistPayload.entries}
          initialAutoExpire={waitlistPayload.autoExpire}
          ttlDays={waitlistPayload.ttlDays}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed reminders={reminders} />
        <AccountStatus profile={profile} email={user.email ?? undefined} />
      </div>
    </div>
  );
}