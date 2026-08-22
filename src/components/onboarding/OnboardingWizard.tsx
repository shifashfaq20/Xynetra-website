// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { saveStep1, saveStep2, activateClient } from '@/lib/onboarding/actions';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export function OnboardingWizard({ userId, initialProgress }: any) {
//   const router = useRouter();
//   const [step, setStep] = useState(initialProgress?.current_step || 1);
//   const [loading, setLoading] = useState(false);

//   // Form state
//   const [businessName, setBusinessName] = useState(initialProgress?.business_name || '');
//   const [timezone, setTimezone] = useState(initialProgress?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);
//   const [whatsapp, setWhatsapp] = useState(initialProgress?.owner_whatsapp || '');
//   const [avgValue, setAvgValue] = useState(initialProgress?.avg_appointment_value || '');
//   const [calendarId, setCalendarId] = useState(initialProgress?.calendar_id || '');

//   const next = async () => {
//     setLoading(true);
//     try {
//       if (step === 1) {
//         await saveStep1({
//           business_name: businessName,
//           timezone,
//           owner_whatsapp: whatsapp,
//           avg_appointment_value: Number(avgValue),
//         });
//         setStep(2);
//       } else if (step === 2) {
//         await saveStep2({ calendar_id: calendarId, google_connected: false });
//         setStep(3);
//       } else if (step === 3) {
//         await activateClient();
//         setStep(4);
//       }
//     } catch (e: any) {
//       alert(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-8">
//       {/* Progress Bar */}
//       <div className="flex gap-2">
//         {[1,2,3,4].map(i => (
//           <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
//         ))}
//       </div>

//       {step === 1 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Step 1 — Business Details</h2>
//           <div>
//             <Label>Business name</Label>
//             <Input value={businessName} onChange={e => setBusinessName(e.target.value)} />
//             <p className="text-xs text-muted-foreground">This appears inside every WhatsApp message.</p>
//           </div>
//           <div>
//             <Label>Timezone</Label>
//             <Input value={timezone} onChange={e => setTimezone(e.target.value)} />
//             <p className="text-xs text-muted-foreground">Used so reminders show the correct local time.</p>
//           </div>
//           <div>
//             <Label>Owner WhatsApp number</Label>
//             <Input placeholder="+14155551234" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
//             <p className="text-xs text-muted-foreground">Receives weekly results and unhandled messages.</p>
//           </div>
//           <div>
//             <Label>Average appointment value</Label>
//             <Input type="number" value={avgValue} onChange={e => setAvgValue(e.target.value)} />
//             <p className="text-xs text-muted-foreground">Used to calculate revenue saved each week.</p>
//           </div>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Step 2 — Connect Google Calendar</h2>
//           <div className="p-4 border rounded-lg space-y-3">
//             <p className="text-sm">Primary path: sign in and pick the calendar where bookings live.</p>
//             <Button className="w-full" asChild>
//               <a href={`/api/google-calendar/auth?onboarding=1`}>Connect Google Calendar</a>
//             </Button>
//             <p className="text-xs text-muted-foreground">The token is stored for a future platform upgrade. Today the shared-access path also works.</p>
//           </div>
//           <div className="p-4 border rounded-lg space-y-3">
//             <p className="text-sm font-medium">Fallback: share calendar manually</p>
//             <p className="text-xs text-muted-foreground">Share your calendar with our ops account with "Make changes to events" permission, then paste the Calendar ID here.</p>
//             <Input placeholder="Calendar ID" value={calendarId} onChange={e => setCalendarId(e.target.value)} />
//           </div>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Step 3 — Review & Activate</h2>
//           <div className="space-y-2 text-sm">
//             <p><strong>Business:</strong> {businessName}</p>
//             <p><strong>Timezone:</strong> {timezone}</p>
//             <p><strong>WhatsApp:</strong> {whatsapp}</p>
//             <p><strong>Avg Value:</strong> {avgValue}</p>
//             <p><strong>Calendar ID:</strong> {calendarId}</p>
//           </div>
//           <p className="text-xs text-muted-foreground">On confirm, we create your operations profile and notify our team to provision your WhatsApp line.</p>
//         </div>
//       )}

//       {step === 4 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Your WhatsApp Line</h2>
//           <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-3 text-sm">
//             <p className="font-semibold text-yellow-900">Golden Rules</p>
//             <ol className="list-decimal list-inside space-y-1 text-yellow-800">
//               <li>The bot’s number is <strong>never</strong> used inside the normal WhatsApp app on any phone.</li>
//               <li>Every calendar booking must contain the customer’s phone number in international format in the event title.</li>
//             </ol>
//             <div className="p-2 bg-white rounded border text-xs font-mono">Sara +14155551234</div>
//           </div>
//           <Button className="w-full" onClick={() => router.push('/client/dashboard')}>Go to Dashboard</Button>
//         </div>
//       )}

//       {step !== 4 && (
//         <div className="flex justify-end">
//           <Button onClick={next} disabled={loading}>{loading ? 'Saving…' : step === 3 ? 'Activate' : 'Continue'}</Button>
//         </div>
//       )}
//     </div>
//   );
// }


// // src/components/onboarding/OnboardingWizard.tsx
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { saveStep1, saveStep2, activateClient } from '@/lib/onboarding/actions';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export function OnboardingWizard({ userId, initialProgress }: any) {
//   const router = useRouter();
//   const [step, setStep] = useState(initialProgress?.current_step || 1);
//   const [loading, setLoading] = useState(false);

//   // Form state
//   const [businessName, setBusinessName] = useState(initialProgress?.business_name || '');
//   const [timezone, setTimezone] = useState(initialProgress?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);
//   const [ownerWhatsapp, setOwnerWhatsapp] = useState(initialProgress?.owner_whatsapp || '');
//   const [teamMemberWhatsapp, setTeamMemberWhatsapp] = useState(initialProgress?.team_member_whatsapp || '');
//   const [avgValue, setAvgValue] = useState(initialProgress?.avg_appointment_value || '');
//   const [calendarId, setCalendarId] = useState(initialProgress?.calendar_id || '');

//   const next = async () => {
//     setLoading(true);
//     try {
//       if (step === 1) {
//         await saveStep1({
//           business_name: businessName,
//           timezone,
//           owner_whatsapp: ownerWhatsapp,
//           team_member_whatsapp: teamMemberWhatsapp,
//           avg_appointment_value: Number(avgValue),
//         });
//         setStep(2);
//       } else if (step === 2) {
//         await saveStep2({ calendar_id: calendarId, google_connected: false });
//         setStep(3);
//       } else if (step === 3) {
//         await activateClient();
//         setStep(4);
//       }
//     } catch (e: any) {
//       alert(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-8">
//       {/* Progress Bar */}
//       <div className="flex gap-2">
//         {[1,2,3,4].map(i => (
//           <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
//         ))}
//       </div>

//       {step === 1 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Step 1 — Business Details</h2>
//           <div>
//             <Label>Business name</Label>
//             <Input value={businessName} onChange={e => setBusinessName(e.target.value)} />
//             <p className="text-xs text-muted-foreground">This appears inside every WhatsApp message.</p>
//           </div>
//           <div>
//             <Label>Timezone</Label>
//             <Input value={timezone} onChange={e => setTimezone(e.target.value)} />
//             <p className="text-xs text-muted-foreground">Used so reminders show the correct local time.</p>
//           </div>
//           <div>
//             <Label>Owner WhatsApp number</Label>
//             <Input placeholder="+14155551234" value={ownerWhatsapp} onChange={e => setOwnerWhatsapp(e.target.value)} />
//             <p className="text-xs text-muted-foreground">Receives the weekly ROI report and billing alerts.</p>
//           </div>
//           <div>
//             <Label>Team Member WhatsApp number</Label>
//             <Input placeholder="+14155555678" value={teamMemberWhatsapp} onChange={e => setTeamMemberWhatsapp(e.target.value)} />
//             <p className="text-xs text-muted-foreground">Handles customers day-to-day. Receives escalations and unhandled messages.</p>
//           </div>
//           <div>
//             <Label>Average appointment value</Label>
//             <Input type="number" value={avgValue} onChange={e => setAvgValue(e.target.value)} />
//             <p className="text-xs text-muted-foreground">Used to calculate revenue saved each week.</p>
//           </div>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Step 2 — Connect Google Calendar</h2>
//           <div className="p-4 border rounded-lg space-y-3">
//             <p className="text-sm">Primary path: sign in and pick the calendar where bookings live.</p>
//             <Button className="w-full" asChild>
//               <a href={`/api/google-calendar/auth?onboarding=1`}>Connect Google Calendar</a>
//             </Button>
//             <p className="text-xs text-muted-foreground">The token is stored for a future platform upgrade. Today the shared-access path also works.</p>
//           </div>
//           <div className="p-4 border rounded-lg space-y-3">
//             <p className="text-sm font-medium">Fallback: share calendar manually</p>
//             <p className="text-xs text-muted-foreground">Share your calendar with our ops account with &quot;Make changes to events&quot; permission, then paste the Calendar ID here.</p>
//             <Input placeholder="Calendar ID" value={calendarId} onChange={e => setCalendarId(e.target.value)} />
//           </div>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Step 3 — Review &amp; Activate</h2>
//           <div className="space-y-2 text-sm">
//             <p><strong>Business:</strong> {businessName}</p>
//             <p><strong>Timezone:</strong> {timezone}</p>
//             <p><strong>Owner WhatsApp:</strong> {ownerWhatsapp}</p>
//             <p><strong>Team Member WhatsApp:</strong> {teamMemberWhatsapp}</p>
//             <p><strong>Avg Value:</strong> {avgValue}</p>
//             <p><strong>Calendar ID:</strong> {calendarId}</p>
//           </div>
//           <p className="text-xs text-muted-foreground">On confirm, we create your operations profile and provision your Meta WhatsApp line.</p>
//         </div>
//       )}

//       {step === 4 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Your WhatsApp Line</h2>
//           <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-3 text-sm">
//             <p className="font-semibold text-yellow-900">Golden Rules</p>
//             <ol className="list-decimal list-inside space-y-1 text-yellow-800">
//               <li>The bot&apos;s number is <strong>never</strong> used inside the normal WhatsApp app on any phone.</li>
//               <li>Every calendar booking must contain the customer&apos;s phone number in international format in the event title.</li>
//             </ol>
//             <div className="p-2 bg-white rounded border text-xs font-mono">Sara +14155551234</div>
//           </div>
//           <Button className="w-full" onClick={() => router.push('/client/dashboard')}>Go to Dashboard</Button>
//         </div>
//       )}

//       {step !== 4 && (
//         <div className="flex justify-end">
//           <Button onClick={next} disabled={loading}>{loading ? 'Saving…' : step === 3 ? 'Activate' : 'Continue'}</Button>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { saveStep1, saveStep2 } from "@/lib/onboarding/actions";

type InitialProgress = {
  current_step?: number | null;
  business_name?: string | null;
  timezone?: string | null;
  owner_whatsapp?: string | null;
  team_member_whatsapp?: string | null;
  avg_appointment_value?: number | string | null;
  calendar_id?: string | null;
};

type OnboardingWizardProps = {
  userId?: string;
  initialProgress?: InitialProgress | null;
};

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-coral";

const buttonClassName =
  "rounded-lg bg-coral px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50";

export function OnboardingWizard({
  initialProgress,
}: OnboardingWizardProps) {
  const router = useRouter();

  const [step, setStep] = useState(initialProgress?.current_step || 1);
  const [loading, setLoading] = useState(false);

  const [businessName, setBusinessName] = useState(
    initialProgress?.business_name || ""
  );

  const [timezone, setTimezone] = useState(
    initialProgress?.timezone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [ownerWhatsapp, setOwnerWhatsapp] = useState(
    initialProgress?.owner_whatsapp || ""
  );

  const [teamMemberWhatsapp, setTeamMemberWhatsapp] = useState(
    initialProgress?.team_member_whatsapp || ""
  );

  const [avgValue, setAvgValue] = useState(
    String(initialProgress?.avg_appointment_value || "")
  );

  const [calendarId, setCalendarId] = useState(
    initialProgress?.calendar_id || ""
  );

  async function next() {
    setLoading(true);

    try {
      if (step === 1) {
        await saveStep1({
          business_name: businessName,
          timezone,
          owner_whatsapp: ownerWhatsapp,
          team_member_whatsapp: teamMemberWhatsapp,
          avg_appointment_value: Number(avgValue) || 0,
        });

        setStep(2);
        return;
      }

      if (step === 2) {
        await saveStep2({
          calendar_id: calendarId,
          google_connected: false,
        });

        setStep(3);
        return;
      }

      if (step === 3) {
        // Your current actions file does not export activateClient().
        // Step 1 and Step 2 have already saved onboarding data.
        setStep(4);
      }
    } catch (error) {
      console.error("Onboarding save failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Could not save onboarding details."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`h-2 flex-1 rounded-full ${
              item <= step ? "bg-coral" : "bg-zinc-200"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Step 1 — Business Details</h2>

          <Field label="Business name">
            <input
              className={inputClassName}
              value={businessName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBusinessName(e.target.value)
              }
            />
            <HelpText>
              This appears inside every WhatsApp message.
            </HelpText>
          </Field>

          <Field label="Timezone">
            <input
              className={inputClassName}
              value={timezone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTimezone(e.target.value)
              }
            />
            <HelpText>
              Used so reminders show the correct local time.
            </HelpText>
          </Field>

          <Field label="Owner WhatsApp number">
            <input
              className={inputClassName}
              placeholder="+14155551234"
              value={ownerWhatsapp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOwnerWhatsapp(e.target.value)
              }
            />
            <HelpText>
              Receives the weekly ROI report and billing alerts.
            </HelpText>
          </Field>

          <Field label="Team Member WhatsApp number">
            <input
              className={inputClassName}
              placeholder="+14155555678"
              value={teamMemberWhatsapp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTeamMemberWhatsapp(e.target.value)
              }
            />
            <HelpText>
              Handles customers day-to-day and receives escalations.
            </HelpText>
          </Field>

          <Field label="Average appointment value">
            <input
              type="number"
              className={inputClassName}
              value={avgValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAvgValue(e.target.value)
              }
            />
            <HelpText>
              Used to calculate revenue saved each week.
            </HelpText>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Step 2 — Connect Google Calendar
          </h2>

          <div className="space-y-3 rounded-lg border p-4">
            <p className="text-sm">
              Primary path: sign in and pick the calendar where bookings live.
            </p>

            <a
              href="/api/google-calendar/auth?onboarding=1"
              className={`${buttonClassName} block w-full text-center`}
            >
              Connect Google Calendar
            </a>

            <p className="text-xs text-zinc-500">
              You can also use the manual Calendar ID option below.
            </p>
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <p className="text-sm font-medium">
              Fallback: share calendar manually
            </p>

            <p className="text-xs text-zinc-500">
              Share your calendar with the operations account, then paste the
              Calendar ID here.
            </p>

            <input
              className={inputClassName}
              placeholder="Calendar ID"
              value={calendarId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCalendarId(e.target.value)
              }
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Step 3 — Review &amp; Activate</h2>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Business:</strong> {businessName}
            </p>

            <p>
              <strong>Timezone:</strong> {timezone}
            </p>

            <p>
              <strong>Owner WhatsApp:</strong> {ownerWhatsapp}
            </p>

            <p>
              <strong>Team Member WhatsApp:</strong> {teamMemberWhatsapp}
            </p>

            <p>
              <strong>Average value:</strong> {avgValue}
            </p>

            <p>
              <strong>Calendar ID:</strong> {calendarId || "Not entered"}
            </p>
          </div>

          <p className="text-xs text-zinc-500">
            Confirm to complete this version of onboarding.
          </p>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Your WhatsApp Line</h2>

          <div className="space-y-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm">
            <p className="font-semibold text-yellow-900">Golden Rules</p>

            <ol className="list-inside list-decimal space-y-1 text-yellow-800">
              <li>
                The bot&apos;s number is <strong>never</strong> used inside the
                normal WhatsApp app.
              </li>

              <li>
                Calendar booking titles should include the customer phone number
                in international format.
              </li>
            </ol>

            <div className="rounded border bg-white p-2 font-mono text-xs">
              Sara +14155551234
            </div>
          </div>

          <button
            className={`${buttonClassName} w-full`}
            onClick={() => router.push("/app/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      )}

      {step !== 4 && (
        <div className="flex justify-end">
          <button
            className={buttonClassName}
            onClick={next}
            disabled={loading}
          >
            {loading
              ? "Saving…"
              : step === 3
                ? "Activate"
                : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function HelpText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-zinc-500">{children}</p>;
}