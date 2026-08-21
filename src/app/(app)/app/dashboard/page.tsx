// import type { Metadata } from "next";
// import Link from "next/link";
// import { getAccount } from "@/lib/account";
// import { getProductResults, currencyForRegion } from "@/lib/demo";
// import { BookDemoButton } from "@/components/CtaButtons";
// import { TrendBars } from "@/components/app/TrendBars";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   robots: { index: false },
// };

// export default async function DashboardPage() {
//   const account = (await getAccount())!;
//   const currency = currencyForRegion(account.billingRegion);
//   const products = getProductResults(account.userId, currency);

//   return (
//     <div>
//       <header className="flex flex-col gap-4 border-b border-grey-line pb-6 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="eyebrow text-ink/50">Results</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//             {account.businessName}
//           </h1>
//           <p className="mt-1 font-body text-sm text-ink/60">
//             Recovered revenue and booked jobs across your Xynetra systems.
//           </p>
//         </div>
//         <BookDemoButton className="px-4 py-2 text-sm" label="Add a product" />
//       </header>

//       <p className="mt-4 inline-block bg-grey-light px-3 py-1.5 font-body text-xs text-ink/60">
//         Demo figures, seeded for your account. These switch to live data once
//         your systems are connected to production reporting.
//       </p>

//       <div className="mt-10 space-y-14">
//         {products.map((p) => (
//           <section key={p.product}>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`eyebrow ${p.live ? "text-coral" : "text-ink/40"}`}
//                 >
//                   {p.name}
//                 </span>
//                 {!p.live && (
//                   <span className="font-body text-xs font-semibold uppercase tracking-caption text-ink/40">
//                     Coming soon
//                   </span>
//                 )}
//               </div>
//               {p.live ? (
//                 <Link
//                   href="/services/recovery"
//                   className="font-body text-sm font-semibold text-coral hover:underline"
//                 >
//                   View product
//                 </Link>
//               ) : (
//                 <Link
//                   href="/services/lead-to-booking"
//                   className="font-body text-sm font-semibold text-ink/60 hover:underline"
//                 >
//                   Learn more
//                 </Link>
//               )}
//             </div>

//             <div className="mt-5 grid gap-px overflow-hidden border border-grey-line bg-grey-line sm:grid-cols-2 lg:grid-cols-4">
//               {p.metrics.map((m) => (
//                 <div key={m.label} className="bg-paper p-5">
//                   <div
//                     className={`font-display text-3xl font-bold ${
//                       p.live
//                         ? p.accent === "coral"
//                           ? "text-coral"
//                           : "text-blue"
//                         : "text-ink/25"
//                     }`}
//                   >
//                     {m.value}
//                   </div>
//                   <div className="mt-2 font-body text-sm font-semibold text-ink">
//                     {m.label}
//                   </div>
//                   <div className="mt-0.5 font-body text-xs text-ink/55">
//                     {m.sub}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {p.live && (
//               <div className="mt-5 border border-grey-line p-5">
//                 <p className="eyebrow text-ink/50">{p.weeklyLabel}</p>
//                 <TrendBars data={p.weekly} accent={p.accent} />
//               </div>
//             )}
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// }



// import type { Metadata } from "next";
// import Link from "next/link";
// import { getAccount } from "@/lib/account";
// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";
// import { getProductResults, currencyForRegion } from "@/lib/demo";
// import { BookDemoButton } from "@/components/CtaButtons";
// import { TrendBars } from "@/components/app/TrendBars";

// // Client Component Dashboard imports
// import { StatsCards } from "@/components/dashbaord/StatsCards";
// import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
// import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
// import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
// import { AccountStatus } from "@/components/dashbaord/AccountStatus";
// import {
//   getDashboardStats,
//   getUpcomingAppointments,
//   getRecentReminders,
//   getWaitlist,
// } from "@/lib/dashboard/action";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   robots: { index: false },
// };

// export default async function DashboardPage() {
//   const account = (await getAccount())!;
//   const supabase = await createClient();

//   // 1. Role Check: If not admin, serve the Client Dashboard
//   const isAdmin = account.email === "admin@xynetra.com";

//   if (!isAdmin) {
//     // Force onboarding if incomplete
//     const { data: onboarding } = await supabase
//       .from("onboarding")
//       .select("completed_at, is_active")
//       .eq("user_id", account.userId)
//       .single();

//     if (!onboarding || !onboarding.completed_at) {
//       redirect("/onboarding");
//     }

//     // Parallel fetch real database collections
//     const [stats, appointments, reminders, waitlist] = await Promise.all([
//       getDashboardStats("week"),
//       getUpcomingAppointments(),
//       getRecentReminders(),
//       getWaitlist(),
//     ]);

//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("plan, subscription_status")
//       .eq("id", account.userId)
//       .single();

//     return (
//       <div className="space-y-10">
//         <header className="border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Client Dashboard</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//             {account.businessName}
//           </h1>
//           <p className="mt-1 font-body text-sm text-ink/60">
//             Monitor real-time WhatsApp reminders, recovered appointments, and optimize your schedule waitlist.
//           </p>
//         </header>

//         {/* Top row: Toggleable result metrics */}
//         <StatsCards initialStats={stats} />

//         {/* Middle row: Read-only calendar agenda alongside real-time Waitlist interaction */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <UpcomingAppointments appointments={appointments} />
//           <WaitlistManager initialWaitlist={waitlist} />
//         </div>

//         {/* Bottom row: System activity outputs alongside active Account control panel */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <ActivityFeed reminders={reminders} />
//           <AccountStatus profile={profile} email={account.email} />
//         </div>
//       </div>
//     );
//   }

//   // 2. Admin View (Legacy marketing demo mode)
//   const currency = currencyForRegion(account.billingRegion);
//   const products = getProductResults(account.userId, currency);

//   return (
//     <div>
//       <header className="flex flex-col gap-4 border-b border-grey-line pb-6 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="eyebrow text-ink/50">Xynetra System Administration</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//             {account.businessName}
//           </h1>
//           <p className="mt-1 font-body text-sm text-ink/60">
//             Overview of client pipelines and platform performance metrics.
//           </p>
//         </div>
//         <BookDemoButton className="px-4 py-2 text-sm" label="Add a product" />
//       </header>

//       <p className="mt-4 inline-block bg-grey-light px-3 py-1.5 font-body text-xs text-ink/60">
//         Administrative demonstration view. Powered by test metrics.
//       </p>

//       <div className="mt-10 space-y-14">
//         {products.map((p) => (
//           <section key={p.product}>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <span className={`eyebrow ${p.live ? "text-coral" : "text-ink/40"}`}>
//                   {p.name}
//                 </span>
//                 {!p.live && (
//                   <span className="font-body text-xs font-semibold uppercase tracking-caption text-ink/40">
//                     Coming soon
//                   </span>
//                 )}
//               </div>
//               {p.live ? (
//                 <Link href="/services/recovery" className="font-body text-sm font-semibold text-coral hover:underline">
//                   View product
//                 </Link>
//               ) : (
//                 <Link href="/services/lead-to-booking" className="font-body text-sm font-semibold text-ink/60 hover:underline">
//                   Learn more
//                 </Link>
//               )}
//             </div>

//             <div className="mt-5 grid gap-px overflow-hidden border border-grey-line bg-grey-line sm:grid-cols-2 lg:grid-cols-4">
//               {p.metrics.map((m) => (
//                 <div key={m.label} className="bg-paper p-5">
//                   <div className={`font-display text-3xl font-bold ${p.live ? (p.accent === "coral" ? "text-coral" : "text-blue") : "text-ink/25"}`}>
//                     {m.value}
//                   </div>
//                   <div className="mt-2 font-body text-sm font-semibold text-ink">
//                     {m.label}
//                   </div>
//                   <div className="mt-0.5 font-body text-xs text-ink/55">
//                     {m.sub}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {p.live && (
//               <div className="mt-5 border border-grey-line p-5">
//                 <p className="eyebrow text-ink/50">{p.weeklyLabel}</p>
//                 <TrendBars data={p.weekly} accent={p.accent} />
//               </div>
//             )}
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// }

// import type { Metadata } from "next";
// import Link from "next/link";
// import { getAccount } from "@/lib/account";
// import { createClient } from "@/lib/supabase/server";
// import { getProductResults, currencyForRegion } from "@/lib/demo";
// import { BookDemoButton } from "@/components/CtaButtons";
// import { TrendBars } from "@/components/app/TrendBars";

// // Client Component Dashboard imports
// import { StatsCards } from "@/components/dashbaord/StatsCards";
// import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
// import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
// import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
// import { AccountStatus } from "@/components/dashbaord/AccountStatus";
// import {
//   getDashboardStats,
//   getUpcomingAppointments,
//   getRecentReminders,
//   getWaitlist,
// } from "@/lib/dashboard/action";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   robots: { index: false },
// };

// export default async function DashboardPage() {
//   const account = (await getAccount())!;
//   const supabase = await createClient();

//   // 1. Role Check: If not admin, serve the Client Dashboard
//   const isAdmin = account.email === "admin@xynetra.com";

//   if (!isAdmin) {
//     // NOTE: We intentionally do NOT redirect to /onboarding here anymore.
//     // Authenticated users always land on (and stay on) the dashboard.
//     // The previous `if (!onboarding || !onboarding.completed_at) redirect("/onboarding")`
//     // was trapping logged-in users in a dashboard -> onboarding -> pricing loop.

//     // Parallel fetch real database collections
//     const [stats, appointments, reminders, waitlist] = await Promise.all([
//       getDashboardStats("week"),
//       getUpcomingAppointments(),
//       getRecentReminders(),
//       getWaitlist(),
//     ]);

//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("plan, subscription_status")
//       .eq("id", account.userId)
//       .single();

//     return (
//       <div className="space-y-10">
//         <header className="border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Client Dashboard</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//             {account.businessName}
//           </h1>
//           <p className="mt-1 font-body text-sm text-ink/60">
//             Monitor real-time WhatsApp reminders, recovered appointments, and optimize your schedule waitlist.
//           </p>
//         </header>

//         {/* Top row: Toggleable result metrics */}
//         <StatsCards initialStats={stats} />

//         {/* Middle row: Read-only calendar agenda alongside real-time Waitlist interaction */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <UpcomingAppointments appointments={appointments} />
//           <WaitlistManager initialWaitlist={waitlist} />
//         </div>

//         {/* Bottom row: System activity outputs alongside active Account control panel */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <ActivityFeed reminders={reminders} />
//           <AccountStatus profile={profile} email={account.email} />
//         </div>
//       </div>
//     );
//   }

//   // 2. Admin View (Legacy marketing demo mode)
//   const currency = currencyForRegion(account.billingRegion);
//   const products = getProductResults(account.userId, currency);

//   return (
//     <div>
//       <header className="flex flex-col gap-4 border-b border-grey-line pb-6 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="eyebrow text-ink/50">Xynetra System Administration</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//             {account.businessName}
//           </h1>
//           <p className="mt-1 font-body text-sm text-ink/60">
//             Overview of client pipelines and platform performance metrics.
//           </p>
//         </div>
//         <BookDemoButton className="px-4 py-2 text-sm" label="Add a product" />
//       </header>

//       <p className="mt-4 inline-block bg-grey-light px-3 py-1.5 font-body text-xs text-ink/60">
//         Administrative demonstration view. Powered by test metrics.
//       </p>

//       <div className="mt-10 space-y-14">
//         {products.map((p) => (
//           <section key={p.product}>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <span className={`eyebrow ${p.live ? "text-coral" : "text-ink/40"}`}>
//                   {p.name}
//                 </span>
//                 {!p.live && (
//                   <span className="font-body text-xs font-semibold uppercase tracking-caption text-ink/40">
//                     Coming soon
//                   </span>
//                 )}
//               </div>
//               {p.live ? (
//                 <Link href="/services/recovery" className="font-body text-sm font-semibold text-coral hover:underline">
//                   View product
//                 </Link>
//               ) : (
//                 <Link href="/services/lead-to-booking" className="font-body text-sm font-semibold text-ink/60 hover:underline">
//                   Learn more
//                 </Link>
//               )}
//             </div>

//             <div className="mt-5 grid gap-px overflow-hidden border border-grey-line bg-grey-line sm:grid-cols-2 lg:grid-cols-4">
//               {p.metrics.map((m) => (
//                 <div key={m.label} className="bg-paper p-5">
//                   <div className={`font-display text-3xl font-bold ${p.live ? (p.accent === "coral" ? "text-coral" : "text-blue") : "text-ink/25"}`}>
//                     {m.value}
//                   </div>
//                   <div className="mt-2 font-body text-sm font-semibold text-ink">
//                     {m.label}
//                   </div>
//                   <div className="mt-0.5 font-body text-xs text-ink/55">
//                     {m.sub}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {p.live && (
//               <div className="mt-5 border border-grey-line p-5">
//                 <p className="eyebrow text-ink/50">{p.weeklyLabel}</p>
//                 <TrendBars data={p.weekly} accent={p.accent} />
//               </div>
//             )}
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// }



// import type { Metadata } from "next";
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
// import { AccountStatus } from "@/components/dashbaord/AccountStatus";
// import {
//   getDashboardStats,
//   getUpcomingAppointments,
//   getRecentReminders,
//   getWaitlist,
// } from "@/lib/dashboard/action";

// export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

// export default async function DashboardPage() {
//   const account = (await getAccount())!;

//   /* ── ADMIN: Global Client Controller ── */
//   if (isAdminEmail(account.email)) {
//     const clients = await listClients();
//     return (
//       <div>
//         <header className="mb-8 border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Internal</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//             Control Panel
//           </h1>
//         </header>
//         <AdminControlPanel initialClients={clients} />
//       </div>
//     );
//   }

//   /* ── CLIENT: real operations dashboard ── */
//   const supabase = await createClient();
//   const { data: onboarding } = await supabase
//     .from("onboarding")
//     .select("completed_at")
//     .eq("user_id", account.userId)
//     .single();
//   if (!onboarding?.completed_at) redirect("/onboarding");

//   const [stats, appointments, reminders, waitlist] = await Promise.all([
//     getDashboardStats("week"),
//     getUpcomingAppointments(),
//     getRecentReminders(),
//     getWaitlist(),
//   ]);
//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("subscription_status")
//     .eq("id", account.userId)
//     .single();

//   return (
//     <div className="space-y-10">
//       <header className="border-b border-grey-line pb-6">
//         <p className="eyebrow text-ink/50">Client Dashboard</p>
//         <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//           {account.businessName}
//         </h1>
//         <p className="mt-1 font-body text-sm text-ink/60">
//           Monitor WhatsApp reminders, recovered appointments, and your waitlist.
//         </p>
//       </header>

//       <StatsCards initialStats={stats} />
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} />
//       </div>
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <ActivityFeed reminders={reminders} />
//         <AccountStatus profile={profile} email={account.email} />
//       </div>
//     </div>
//   );
// }


// import type { Metadata } from "next";
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

// export default async function DashboardPage() {
//   const account = (await getAccount())!;

//   /* ── ADMIN ── */
//   if (isAdminEmail(account.email)) {
//     const clients = await listClients();
//     return (
//       <div>
//         <header className="mb-8 border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Internal</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Control Panel</h1>
//         </header>
//         <AdminControlPanel initialClients={clients} />
//       </div>
//     );
//   }

//   /* ── CLIENT ── */
//   const supabase = await createClient();
//   const { data: onboarding } = await supabase
//     .from("onboarding")
//     .select("completed_at")
//     .eq("user_id", account.userId)
//     .single();
//   if (!onboarding?.completed_at) redirect("/onboarding");

//   const [stats, appointments, reminders, waitlist, handoffs, profileRes, clientRes] =
//     await Promise.all([
//       getDashboardStats("week"),
//       getUpcomingAppointments(),
//       getRecentReminders(),
//       getWaitlist(),
//       getOpenHandoffs(),
//       supabase
//         .from("profiles")
//         .select("subscription_status, billing_region")
//         .eq("id", account.userId)
//         .single(),
//       supabase
//         .from("clients")
//         .select("paused, whatsapp_status")
//         .eq("id", account.userId)
//         .maybeSingle(),
//     ]);

//   const profile = profileRes.data;
//   const subscriptionStatus = profile?.subscription_status ?? "inactive";
//   const readOnly = subscriptionStatus !== "active";
//   const paused = !!clientRes.data?.paused;
//   const linePending = clientRes.data?.whatsapp_status === "pending";
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

//       {readOnly && (
//         <Banner tone="warn">
//           Your subscription is inactive, so the dashboard is read-only and reminders are paused.{" "}
//           <a href="/app/billing" className="underline font-semibold">Update billing</a> to resume.
//         </Banner>
//       )}
//       {!readOnly && paused && (
//         <Banner tone="warn">
//           Your service is paused — no reminders are going out. Resume it in{" "}
//           <a href="/app/settings" className="underline font-semibold">Settings</a>.
//         </Banner>
//       )}
//       {!readOnly && !paused && linePending && (
//         <Banner tone="info">
//           Your dedicated number is being set up — usually within one business day. Reminders start
//           automatically once it&apos;s live.
//         </Banner>
//       )}

//       <StatsCards initialStats={stats} currency={currency} />

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} readOnly={readOnly} />
//       </div>
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <NeedsAttention initialHandoffs={handoffs} />
//         <ActivityFeed reminders={reminders} />
//       </div>
//       <AccountStatus profile={profile} email={account.email} />
//     </div>
//   );
// }

// function Banner({ tone, children }: { tone: "warn" | "info"; children: React.ReactNode }) {
//   const cls =
//     tone === "warn"
//       ? "border-coral/40 bg-coral-light text-ink"
//       : "border-grey-line bg-grey-light text-ink/70";
//   return (
//     <div className={`rounded-lg border px-4 py-3 font-body text-sm ${cls}`}>{children}</div>
//   );
// }


// import type { Metadata } from "next";
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

// export default async function DashboardPage() {
//   const account = (await getAccount())!;

//   /* ── ADMIN: Global Client Controller ── */
//   if (isAdminEmail(account.email)) {
//     const clients = await listClients();
//     return (
//       <div>
//         <header className="mb-8 border-b border-grey-line pb-6">
//           <p className="eyebrow text-ink/50">Internal</p>
//           <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//             Control Panel
//           </h1>
//         </header>
//         <AdminControlPanel initialClients={clients} />
//       </div>
//     );
//   }

//   /* ── CLIENT: real operations dashboard ── */
//   const supabase = await createClient();
//   const { data: onboarding } = await supabase
//     .from("onboarding")
//     .select("completed_at")
//     .eq("user_id", account.userId)
//     .single();
//   if (!onboarding?.completed_at) redirect("/onboarding");

//   const [stats, appointments, reminders, waitlist, handoffs, profileRes, clientRes] =
//     await Promise.all([
//       getDashboardStats("week"),
//       getUpcomingAppointments(),
//       getRecentReminders(),
//       getWaitlist(),
//       getOpenHandoffs(),
//       supabase
//         .from("profiles")
//         .select("subscription_status, billing_region")
//         .eq("id", account.userId)
//         .single(),
//       supabase
//         .from("clients")
//         .select("paused, whatsapp_status, whatsapp_display_name, whatsapp_number")
//         .eq("id", account.userId)
//         .maybeSingle(),
//     ]);

//   const profile = profileRes.data;
//   const client = clientRes.data;
//   const subscriptionStatus = profile?.subscription_status ?? "inactive";
//   const readOnly = subscriptionStatus !== "active";
//   const paused = !!client?.paused;
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

//       {readOnly && (
//         <Banner tone="warn">
//           Your subscription is inactive, so the dashboard is read-only and reminders are paused.{" "}
//           <a href="/app/billing" className="underline font-semibold">
//             Update billing
//           </a>{" "}
//           to resume.
//         </Banner>
//       )}
//       {!readOnly && paused && (
//         <Banner tone="warn">
//           Your service is paused — no reminders are going out. Resume it in{" "}
//           <a href="/app/settings" className="underline font-semibold">
//             Settings
//           </a>
//           .
//         </Banner>
//       )}
//       {!readOnly && !paused && linePending && (
//         <Banner tone="info">
//           Your dedicated number is being set up — usually within one business day.
//           Reminders start automatically once it&apos;s live.
//         </Banner>
//       )}

//       <StatsCards initialStats={stats} currency={currency} />

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <UpcomingAppointments appointments={appointments} />
//         <WaitlistManager initialWaitlist={waitlist} readOnly={readOnly} />
//       </div>
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <NeedsAttention initialHandoffs={handoffs} />
//         <ActivityFeed reminders={reminders} />
//       </div>
//       <AccountStatus profile={profile} email={account.email} client={client} />
//     </div>
//   );
// }

// function Banner({
//   tone,
//   children,
// }: {
//   tone: "warn" | "info";
//   children: React.ReactNode;
// }) {
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

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

export default async function DashboardPage() {
  const account = (await getAccount())!;

  /* ── ADMIN: Global Client Controller ── */
  if (isAdminEmail(account.email)) {
    const clients = await listClients();
    return (
      <div>
        <header className="mb-8 border-b border-grey-line pb-6">
          <p className="eyebrow text-ink/50">Internal</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
            Control Panel
          </h1>
        </header>
        <AdminControlPanel initialClients={clients} />
      </div>
    );
  }

  /* ── GATE 1: billing first — unpaid users never see the app ── */
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, billing_region")
    .eq("id", account.userId)
    .single();
  if (profile?.subscription_status !== "active") redirect("/app/checkout");

  /* ── GATE 2: onboarding must be complete ── */
  const { data: onboarding } = await supabase
    .from("onboarding")
    .select("completed_at")
    .eq("user_id", account.userId)
    .single();
  if (!onboarding?.completed_at) redirect("/onboarding");

  /* ── CLIENT: real operations dashboard ── */
  const [stats, appointments, reminders, waitlist, handoffs, clientRes] =
    await Promise.all([
      getDashboardStats("week"),
      getUpcomingAppointments(),
      getRecentReminders(),
      getWaitlist(),
      getOpenHandoffs(),
      supabase
        .from("clients")
        .select("paused, whatsapp_status, whatsapp_display_name, whatsapp_number")
        .eq("id", account.userId)
        .maybeSingle(),
    ]);

  const client = clientRes.data;
  const paused = !!client?.paused;
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
          <a href="/app/settings" className="underline font-semibold">
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
        <WaitlistManager initialWaitlist={waitlist} readOnly={false} />
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
  children: React.ReactNode;
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

