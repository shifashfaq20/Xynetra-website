// import type { Metadata } from 'next';
// import { redirect } from 'next/navigation';
// import { getAccount } from '@/lib/account';
// import { createClient } from '@/lib/supabase/server';
// import { isAdminEmail } from '@/lib/admin/roles';
// import { SettingsPanels } from '@/components/settings/SettingsPanels';

// export const dynamic = 'force-dynamic';
// export const metadata: Metadata = { title: 'Settings', robots: { index: false } };

// export default async function SettingsPage() {
//   const account = (await getAccount())!;
//   if (isAdminEmail(account.email)) redirect('/app/dashboard');

//   const supabase = await createClient();
//   const [{ data: client }, { data: services }, { data: profile }] = await Promise.all([
//     supabase
//       .from('clients')
//       .select('business_hours, reminder_timing, tone, language, sign_off, paused')
//       .eq('id', account.userId)
//       .maybeSingle(),
//     supabase
//       .from('services')
//       .select('id, name, price, duration_minutes')
//       .eq('client_id', account.userId)
//       .order('created_at'),
//     supabase
//       .from('profiles')
//       .select('subscription_status, billing_region')
//       .eq('id', account.userId)
//       .single(),
//   ]);

//   const readOnly = profile?.subscription_status !== 'active';
//   const currency = profile?.billing_region === 'pakistan' ? 'PKR' : 'USD';

//   return (
//     <div className="space-y-8">
//       <header className="border-b border-grey-line pb-6">
//         <p className="eyebrow text-ink/50">Settings</p>
//         <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
//           Service Settings
//         </h1>
//         <p className="mt-1 font-body text-sm text-ink/60">
//           Reminder timing, services & prices, tone, hours, and service status.
//         </p>
//       </header>

//       {readOnly && (
//         <div className="rounded-lg border border-coral/40 bg-coral-light px-4 py-3 font-body text-sm text-ink">
//           Your subscription is inactive — settings are read-only.{' '}
//           <a href="/app/billing" className="underline font-semibold">Update billing</a> to make changes.
//         </div>
//       )}

//       <SettingsPanels
//         client={client}
//         services={services || []}
//         readOnly={readOnly}
//         currency={currency}
//         businessName={account.businessName}
//       />
//     </div>
//   );
// }


import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAccount } from '@/lib/account';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin/roles';
import { SettingsPanels } from '@/components/settings/Settingspanels';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Settings', robots: { index: false } };

export default async function SettingsPage() {
  const account = (await getAccount())!;
  if (isAdminEmail(account.email)) redirect('/app/dashboard');

  const supabase = await createClient();

  // Billing gate — unpaid users go to checkout, not settings
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, billing_region')
    .eq('id', account.userId)
    .single();
  if (profile?.subscription_status !== 'active') redirect('/app/checkout');

  const [{ data: client }, { data: services }] = await Promise.all([
    supabase
      .from('clients')
      .select('business_hours, reminder_timing, tone, language, sign_off, paused')
      .eq('id', account.userId)
      .maybeSingle(),
    supabase
      .from('services')
      .select('id, name, price, duration_minutes')
      .eq('client_id', account.userId)
      .order('created_at'),
  ]);

  const currency = profile?.billing_region === 'pakistan' ? 'PKR' : 'USD';

  return (
    <div className="space-y-8">
      <header className="border-b border-grey-line pb-6">
        <p className="eyebrow text-ink/50">Settings</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
          Service Settings
        </h1>
        <p className="mt-1 font-body text-sm text-ink/60">
          Reminder timing, services & prices, tone, hours, and service status.
        </p>
      </header>

      <SettingsPanels
        client={client}
        services={services || []}
        readOnly={false}
        currency={currency}
        businessName={account.businessName}
      />
    </div>
  );
}