import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  getDashboardStats,
  getUpcomingAppointments,
  getRecentReminders,
  getWaitlist,
} from '@/lib/dashboard/action';
import { StatsCards } from '@/components/dashbaord/StatsCards';
import { UpcomingAppointments } from '@/components/dashbaord/UpcomingAppointments';
import { WaitlistManager } from '@/components/dashbaord/WaitlistManager';
import { ActivityFeed } from '@/components/dashbaord/ActivityFeed';
import { AccountStatus } from '@/components/dashbaord/AccountStatus';

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Gate: must have completed onboarding
  const { data: ops } = await supabase
    .from('client_operations')
    .select('id')
    .eq('user_id', user.id)
    .single();
  if (!ops) redirect('/onboarding');

  // Fetch data
  const [stats, appointments, reminders, waitlist] = await Promise.all([
    getDashboardStats('week'),
    getUpcomingAppointments(),
    getRecentReminders(),
    getWaitlist(),
  ]);

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, subscription_status, paddle_customer_id')
    .eq('id', user.id)
    .single();

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <StatsCards initialStats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointments appointments={appointments} />
        <WaitlistManager initialWaitlist={waitlist} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed reminders={reminders} />
        <AccountStatus profile={profile} />
      </div>
    </div>
  );
}