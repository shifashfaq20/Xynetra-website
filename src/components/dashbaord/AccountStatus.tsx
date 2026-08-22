// 'use client';

// export function AccountStatus({ profile, email }: { profile: any; email: string }) {
//   return (
//     <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col justify-between h-[320px]">
//       <div>
//         <h3 className="font-display text-lg font-bold text-ink mb-4">Account & WhatsApp Status</h3>
        
//         <div className="space-y-2 text-sm font-body">
//           <div className="flex justify-between border-b border-grey-line pb-2">
//             <span className="text-ink/55">Current Plan</span>
//             <span className="font-bold text-ink uppercase text-xs">{profile?.plan || 'Free Plan'}</span>
//           </div>
//           <div className="flex justify-between border-b border-grey-line pb-2">
//             <span className="text-ink/55">Billing Email</span>
//             <span className="text-ink/75 font-mono text-xs">{email}</span>
//           </div>
//           <div className="flex justify-between pb-1">
//             <span className="text-ink/55">Line Activation</span>
//             <span className={`font-semibold text-xs ${profile?.subscription_status === 'active' ? 'text-emerald-600' : 'text-amber-500'}`}>
//               {profile?.subscription_status === 'active' ? '✓ Provisioned & Online' : '⚠️ Provisioning Pending'}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <a
//           href="/pricing"
//           className="block w-full text-center bg-purple text-paper py-2 rounded text-xs font-bold hover:bg-ink transition-colors"
//         >
//           Manage Billing (Paddle)
//         </a>
//         <a
//           href="/guide"
//           className="block w-full text-center border border-grey-line text-ink/80 py-2 rounded text-xs font-semibold hover:bg-grey-light transition-all"
//         >
//           View System Staff Guide
//         </a>
//       </div>
//     </div>
//   );
// }


// 'use client';

// export function AccountStatus({ profile, email }: { profile: any; email: string }) {
//   const active = profile?.subscription_status === 'active';
//   const planLabel = active ? 'Pro' : 'Starter';

//   return (
//     <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col justify-between h-[320px]">
//       <div>
//         <h3 className="font-display text-lg font-bold text-ink mb-4">Account & WhatsApp Status</h3>

//         <div className="space-y-2 text-sm font-body">
//           <div className="flex justify-between border-b border-grey-line pb-2">
//             <span className="text-ink/55">Current Plan</span>
//             <span className="font-bold text-ink uppercase text-xs">{planLabel}</span>
//           </div>
//           <div className="flex justify-between border-b border-grey-line pb-2">
//             <span className="text-ink/55">Billing Email</span>
//             <span className="text-ink/75 font-mono text-xs">{email}</span>
//           </div>
//           <div className="flex justify-between pb-1">
//             <span className="text-ink/55">Line Activation</span>
//             <span
//               className={`font-semibold text-xs ${
//                 active ? 'text-emerald-600' : 'text-amber-500'
//               }`}
//             >
//               {active ? '✓ Provisioned & Online' : '⚠️ Provisioning Pending'}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <a
//           href="/pricing"
//           className="block w-full text-center bg-purple text-paper py-2 rounded text-xs font-bold hover:bg-ink transition-colors"
//         >
//           Manage Billing (Paddle)
//         </a>
//         <a
//           href="/guide"
//           className="block w-full text-center border border-grey-line text-ink/80 py-2 rounded text-xs font-semibold hover:bg-grey-light transition-all"
//         >
//           View System Staff Guide
//         </a>
//       </div>
//     </div>
//   );
// }


export function AccountStatus({
  profile,
  email,
  client,
}: {
  profile: any;
  email: string;
  client?: {
    paused?: boolean | null;
    whatsapp_status?: string | null;
    whatsapp_display_name?: string | null;
    whatsapp_number?: string | null;
  } | null;
}) {
  const active = profile?.subscription_status === 'active';
  const planLabel = active ? 'Pro' : 'Starter';

  const waStatus = client?.whatsapp_status ?? 'not_connected';
  const paused = !!client?.paused;

  return (
    <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col justify-between h-[320px]">
      <div>
        <h3 className="font-display text-lg font-bold text-ink mb-4">Account & Line Status</h3>

        <div className="space-y-2 text-sm font-body">
          <div className="flex justify-between border-b border-grey-line pb-2">
            <span className="text-ink/55">Current Plan</span>
            <span className="font-bold text-ink uppercase text-xs">{planLabel}</span>
          </div>

          <div className="flex justify-between border-b border-grey-line pb-2">
            <span className="text-ink/55">Billing Email</span>
            <span className="text-ink/75 font-mono text-xs">{email}</span>
          </div>

          <div className="flex justify-between items-start border-b border-grey-line pb-2">
            <span className="text-ink/55">WhatsApp Line</span>
            {waStatus === 'connected' ? (
              <span className="text-right">
                <span className="block font-semibold text-xs text-emerald-600">✓ Connected</span>
                <span className="block text-[11px] text-ink/50">
                  {client?.whatsapp_display_name} {client?.whatsapp_number}
                </span>
              </span>
            ) : waStatus === 'pending' ? (
              <span className="font-semibold text-xs text-amber-500">⏳ Pending verification</span>
            ) : (
              <a href="/onboarding?step=3" className="font-semibold text-xs text-coral hover:underline">
                ⚠ Not connected — finish setup
              </a>
            )}
          </div>

          <div className="flex justify-between pb-1">
            <span className="text-ink/55">Service</span>
            {paused ? (
              <a href="/app/settings" className="font-semibold text-xs text-coral hover:underline">
                ⏸ Paused — resume in Settings
              </a>
            ) : (
              <span className={`font-semibold text-xs ${active ? 'text-emerald-600' : 'text-amber-500'}`}>
                {active ? '● Live' : '⚠ Inactive (billing)'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <a
          href="/app/billing"
          className="block w-full text-center bg-ink text-paper py-2 rounded text-xs font-bold hover:bg-neutral-800 transition-colors"
        >
          Manage Billing
        </a>
        <a
          href="/guide"
          className="block w-full text-center border border-grey-line text-ink/80 py-2 rounded text-xs font-semibold hover:bg-grey-light transition-all"
        >
          View Staff Guide
        </a>
      </div>
    </div>
  );
}