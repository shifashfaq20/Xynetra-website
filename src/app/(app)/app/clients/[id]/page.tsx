import { notFound } from "next/navigation";
import Link from "next/link";
import { createServiceClient, createAuthAdminClient } from "@/lib/supabase/service";
import { requireAdmin, getAdminStatsForClient } from "@/lib/admin/actions";
import { StatsCards } from "@/components/dashbaord/StatsCards";
import { UpcomingAppointments } from "@/components/dashbaord/UpcomingAppointments";
import { WaitlistManager } from "@/components/dashbaord/WaitlistManager";
import { ActivityFeed } from "@/components/dashbaord/ActivityFeed";
import { AccountStatus } from "@/components/dashbaord/AccountStatus";

export const dynamic = "force-dynamic";

export default async function ClientPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdmin();

  const svc = createServiceClient();
  const { data: profile } = await svc
    .from("profiles")
    .select("business_name, billing_region, subscription_status")
    .eq("id", id)
    .single();
  if (!profile) notFound();

  const auth = createAuthAdminClient();
  const { data: u } = await auth.from("users").select("email").eq("id", id).single();
  const email = u?.email || "—";

  const nowIso = new Date().toISOString();
  const [stats, appointments, reminders, waitlist] = await Promise.all([
    getAdminStatsForClient(id, "week"),
    svc.from("appointments").select("id, customer_name, appointment_time, status, timezone")
      .eq("client_id", id).gte("appointment_time", nowIso)
      .order("appointment_time", { ascending: true }).limit(10).then((r: any) => r.data || []),
    svc.from("reminders").select("id, message, sent_at")
      .eq("client_id", id).order("sent_at", { ascending: false }).limit(20).then((r: any) => r.data || []),
    svc.from("client_waitlist").select("id, name, phone, created_at")
      .eq("client_id", id).order("created_at", { ascending: false }).then((r: any) => r.data || []),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-grey-line pb-6">
        <div>
          <p className="eyebrow text-ink/50">Admin preview · read‑only</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
            {profile.business_name}
          </h1>
          <p className="mt-1 font-body text-sm text-ink/60">{email}</p>
        </div>
        <Link href="/app/dashboard" className="font-body text-sm font-semibold text-indigo-600 hover:underline">
          ← Back to Control Panel
        </Link>
      </div>

      <StatsCards
        initialStats={stats}
        periodFetcher={(p) => getAdminStatsForClient(id, p)}
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

