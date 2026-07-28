// 'use client';

// import { useState, useTransition } from 'react';
// import { getDashboardStats } from '@/lib/dashboard/action';

// export function StatsCards({ initialStats }: { initialStats: any }) {
//   const [period, setPeriod] = useState<'week' | 'month'>('week');
//   const [stats, setStats] = useState(initialStats);
//   const [isPending, startTransition] = useTransition();

//   const handlePeriodChange = (selected: 'week' | 'month') => {
//     setPeriod(selected);
//     startTransition(async () => {
//       const updated = await getDashboardStats(selected);
//       setStats(updated);
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="font-display text-lg font-bold text-ink">Performance Overview</h2>
//         <div className="flex gap-1 bg-grey-light p-1 border border-grey-line rounded-lg">
//           <button
//             onClick={() => handlePeriodChange('week')}
//             disabled={isPending}
//             className={`px-3 py-1 text-xs font-semibold font-body transition-all ${
//               period === 'week' ? 'bg-paper text-ink shadow-sm' : 'text-ink/50 hover:text-ink'
//             }`}
//           >
//             7 Days
//           </button>
//           <button
//             onClick={() => handlePeriodChange('month')}
//             disabled={isPending}
//             className={`px-3 py-1 text-xs font-semibold font-body transition-all ${
//               period === 'month' ? 'bg-paper text-ink shadow-sm' : 'text-ink/50 hover:text-ink'
//             }`}
//           >
//             30 Days
//           </button>
//         </div>
//       </div>

//       <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
//         <StatItem label="Handled" value={stats.handled} sub="Total Appointments" />
//         <StatItem label="Confirmed" value={stats.confirmed} sub="Via WhatsApp" accentColor="text-emerald-600" />
//         <StatItem label="Cancelled" value={stats.cancelled} sub="Slots Released" accentColor="text-coral" />
//         <StatItem label="Waitlist Recovered" value={stats.recovered} sub="Automatic Fills" accentColor="text-purple" />
//         <StatItem 
//           label="Est. Revenue Saved" 
//           value={`$${stats.revenueSaved}`} 
//           sub="Recovered Slots value" 
//           accentColor="text-emerald-600 font-bold" 
//         />
//       </div>
//     </div>
//   );
// }

// function StatItem({ label, value, sub, accentColor = "text-ink" }: { label: string; value: string | number; sub: string; accentColor?: string }) {
//   return (
//     <div className="bg-paper border border-grey-line p-5 rounded-lg flex flex-col justify-between">
//       <div>
//         <p className="font-body text-xs text-ink/50 font-semibold uppercase tracking-wider">{label}</p>
//         <p className={`mt-2 font-display text-2xl font-bold ${accentColor}`}>{value}</p>
//       </div>
//       <p className="mt-1 font-body text-[10px] text-ink/45">{sub}</p>
//     </div>
//   );
// }



// 'use client';

// import { useState, useTransition } from 'react';
// import { getDashboardStats } from '@/lib/dashboard/action';

// export function StatsCards({
//   initialStats,
//   periodFetcher,
// }: {
//   initialStats: any;
//   periodFetcher?: (p: 'week' | 'month') => Promise<any>;
// }) {
//   const [period, setPeriod] = useState<'week' | 'month'>('week');
//   const [stats, setStats] = useState(initialStats);
//   const [isPending, startTransition] = useTransition();

//   const handlePeriodChange = (selected: 'week' | 'month') => {
//     setPeriod(selected);
//     startTransition(async () => {
//       const updated = periodFetcher
//         ? await periodFetcher(selected)
//         : await getDashboardStats(selected);
//       setStats(updated);
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="font-display text-lg font-bold text-ink">Performance Overview</h2>
//         <div className="flex gap-1 bg-grey-light p-1 border border-grey-line rounded-lg">
//           <button
//             onClick={() => handlePeriodChange('week')}
//             disabled={isPending}
//             className={`px-3 py-1 text-xs font-semibold font-body transition-all ${
//               period === 'week' ? 'bg-paper text-ink shadow-sm' : 'text-ink/50 hover:text-ink'
//             }`}
//           >
//             7 Days
//           </button>
//           <button
//             onClick={() => handlePeriodChange('month')}
//             disabled={isPending}
//             className={`px-3 py-1 text-xs font-semibold font-body transition-all ${
//               period === 'month' ? 'bg-paper text-ink shadow-sm' : 'text-ink/50 hover:text-ink'
//             }`}
//           >
//             30 Days
//           </button>
//         </div>
//       </div>

//       <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
//         <StatItem label="Handled" value={stats.handled} sub="Total Appointments" />
//         <StatItem label="Confirmed" value={stats.confirmed} sub="Via WhatsApp" accentColor="text-emerald-600" />
//         <StatItem label="Cancelled" value={stats.cancelled} sub="Slots Released" accentColor="text-coral" />
//         <StatItem label="Waitlist Recovered" value={stats.recovered} sub="Automatic Fills" accentColor="text-purple" />
//         <StatItem
//           label="Est. Revenue Saved"
//           value={`$${stats.revenueSaved}`}
//           sub="Recovered Slots value"
//           accentColor="text-emerald-600 font-bold"
//         />
//       </div>
//     </div>
//   );
// }

// function StatItem({
//   label,
//   value,
//   sub,
//   accentColor = 'text-ink',
// }: {
//   label: string;
//   value: string | number;
//   sub: string;
//   accentColor?: string;
// }) {
//   return (
//     <div className="bg-paper border border-grey-line p-5 rounded-lg flex flex-col justify-between">
//       <div>
//         <p className="font-body text-xs text-ink/50 font-semibold uppercase tracking-wider">{label}</p>
//         <p className={`mt-2 font-display text-2xl font-bold ${accentColor}`}>{value}</p>
//       </div>
//       <p className="mt-1 font-body text-[10px] text-ink/45">{sub}</p>
//     </div>
//   );
// }


'use client';

import { useState, useTransition } from 'react';
import { getDashboardStats } from '@/lib/dashboard/action';

export function StatsCards({
  initialStats,
  currency = 'USD',
  periodFetcher,
}: {
  initialStats: any;
  currency?: string;
  periodFetcher?: (p: 'week' | 'month') => Promise<any>;
}) {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [stats, setStats] = useState(initialStats);
  const [isPending, startTransition] = useTransition();

  const handlePeriodChange = (selected: 'week' | 'month') => {
    setPeriod(selected);
    startTransition(async () => {
      const updated = periodFetcher
        ? await periodFetcher(selected)
        : await getDashboardStats(selected);
      setStats(updated);
    });
  };

  const confirmationRate =
    stats.handled > 0 ? Math.round((stats.confirmed / stats.handled) * 100) : 0;
  const money = (v: number) => `${currency} ${Number(v || 0).toLocaleString()}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Performance Overview</h2>
        <div className="flex gap-1 bg-grey-light p-1 border border-grey-line rounded-lg">
          {(['week', 'month'] as const).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              disabled={isPending}
              className={`px-3 py-1 text-xs font-semibold font-body transition-all ${
                period === p ? 'bg-paper text-ink shadow-sm' : 'text-ink/50 hover:text-ink'
              }`}
            >
              {p === 'week' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* HERO — the number that keeps clients subscribed */}
      <div className="rounded-lg bg-ink text-paper p-6 sm:p-8">
        <p className="eyebrow text-paper/50">
          Revenue recovered — {period === 'week' ? 'last 7 days' : 'last 30 days'}
        </p>
        <p className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tightest text-coral">
          {money(stats.revenueSaved)}
        </p>
        <p className="mt-3 font-body text-sm text-paper/70">
          {stats.recovered} empty {stats.recovered === 1 ? 'slot' : 'slots'} refilled from your
          waitlist · {confirmationRate}% of customers confirmed
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatItem label="Reminders Sent" value={stats.reminded ?? 0} sub="This period" />
        <StatItem label="Confirmed" value={stats.confirmed} sub={`${confirmationRate}% confirmation rate`} />
        <StatItem label="Cancelled" value={stats.cancelled} sub="Caught early, slots freed" />
        <StatItem label="Slots Recovered" value={stats.recovered} sub="Refilled from waitlist" />
      </div>
    </div>
  );
}

function StatItem({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="bg-paper border border-grey-line p-5 rounded-lg flex flex-col justify-between">
      <div>
        <p className="font-body text-xs text-ink/50 font-semibold uppercase tracking-wider">{label}</p>
        <p className="mt-2 font-display text-2xl font-bold text-ink">{value}</p>
      </div>
      <p className="mt-1 font-body text-[10px] text-ink/45">{sub}</p>
    </div>
  );
}