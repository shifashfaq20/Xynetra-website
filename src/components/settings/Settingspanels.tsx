'use client';

import { useState, useTransition } from 'react';
import {
  updateReminderTiming, updateServices, updateToneLanguage,
  updateBusinessHours, setServicePaused,
} from '@/lib/settings/actions';
import type { ReminderTiming, BusinessHours, Tone, Language, ServiceItem } from '@/lib/onboarding/types';

const DEFAULT_TIMING: ReminderTiming = {
  r1: { enabled: true, hours: 24 },
  r2: { enabled: true, hours: 3 },
  r3: { enabled: false, hours: 72 },
};
const DAYS = [
  ['mon', 'Monday'], ['tue', 'Tuesday'], ['wed', 'Wednesday'], ['thu', 'Thursday'],
  ['fri', 'Friday'], ['sat', 'Saturday'], ['sun', 'Sunday'],
] as const;

export function SettingsPanels({
  client, services, readOnly, currency, businessName,
}: {
  client: any; services: any[]; readOnly: boolean; currency: string; businessName: string;
}) {
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null);
  const [pending, start] = useTransition();

  const [timing, setTiming] = useState<ReminderTiming>(client?.reminder_timing ?? DEFAULT_TIMING);
  const [rows, setRows] = useState<ServiceItem[]>(
    services?.length ? services.map((s) => ({ name: s.name, price: Number(s.price), duration_minutes: s.duration_minutes ?? undefined })) : [{ name: '', price: 0 }]
  );
  const [tone, setTone] = useState<Tone>(client?.tone ?? 'friendly');
  const [language, setLanguage] = useState<Language>(client?.language ?? 'en');
  const [signOff, setSignOff] = useState(client?.sign_off ?? `See you soon, ${businessName}`);
  const [hours, setHours] = useState<BusinessHours>(client?.business_hours ?? {});
  const [paused, setPaused] = useState(!!client?.paused);

  const run = (fn: () => Promise<any>, okMsg: string) => {
    setNotice(null);
    start(async () => {
      const res = await fn();
      if (res?.error) setNotice({ kind: 'err', msg: res.error });
      else setNotice({ kind: 'ok', msg: okMsg });
    });
  };

  const dis = readOnly || pending;
  const inputCls =
    'rounded-lg border border-grey-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-coral disabled:opacity-50';

  return (
    <div className="space-y-8">
      {notice && (
        <div className={`rounded-lg border px-4 py-3 font-body text-sm ${
          notice.kind === 'ok' ? 'border-grey-line bg-grey-light text-ink' : 'border-coral/40 bg-coral-light text-ink'
        }`}>
          {notice.msg}
        </div>
      )}

      {/* Reminder timing */}
      <section className="rounded-lg border border-grey-line bg-paper p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Reminder Timing</h2>
        {(['r1', 'r2', 'r3'] as const).map((k, i) => (
          <div key={k} className={`rounded-lg border p-4 ${timing[k].enabled ? 'border-coral/40 bg-coral-light/50' : 'border-grey-line'}`}>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-body text-sm font-semibold text-ink">Reminder {i + 1}</span>
              <input type="checkbox" disabled={dis} checked={timing[k].enabled}
                onChange={(e) => setTiming((t) => ({ ...t, [k]: { ...t[k], enabled: e.target.checked } }))}
                className="accent-coral w-4 h-4" />
            </label>
            {timing[k].enabled && (
              <div className="mt-3 flex items-center gap-2">
                <input type="number" min={1} max={168} disabled={dis} value={timing[k].hours}
                  onChange={(e) => setTiming((t) => ({ ...t, [k]: { ...t[k], hours: Math.max(1, parseInt(e.target.value || '1', 10)) } }))}
                  className={`w-24 ${inputCls}`} />
                <span className="font-body text-sm text-ink/60">hours before the appointment</span>
              </div>
            )}
          </div>
        ))}
        <SaveBtn disabled={dis} pending={pending} onClick={() => run(() => updateReminderTiming(timing), 'Reminder timing saved.')} />
      </section>

      {/* Services & prices */}
      <section className="rounded-lg border border-grey-line bg-paper p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Services & Prices</h2>
        {rows.map((row, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="text" disabled={dis} value={row.name} placeholder="e.g. Hair colour"
              onChange={(e) => setRows((r) => r.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))}
              className={`flex-1 ${inputCls}`} />
            <div className="relative w-32">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 text-xs">{currency}</span>
              <input type="number" min="0" step="0.01" disabled={dis} value={row.price || ''} placeholder="0.00"
                onChange={(e) => setRows((r) => r.map((x, idx) => (idx === i ? { ...x, price: parseFloat(e.target.value) || 0 } : x)))}
                className={`w-full pl-12 ${inputCls}`} />
            </div>
            <button type="button" disabled={dis} onClick={() => setRows((r) => r.filter((_, idx) => idx !== i))}
              className="text-ink/30 hover:text-coral px-2 text-lg leading-none">×</button>
          </div>
        ))}
        <button type="button" disabled={dis} onClick={() => setRows((r) => [...r, { name: '', price: 0 }])}
          className="font-body text-sm font-semibold text-coral hover:underline disabled:opacity-50">+ Add service</button>
        <SaveBtn disabled={dis} pending={pending} onClick={() => run(() => updateServices(rows), 'Services saved.')} />
      </section>

      {/* Tone & language */}
      <section className="rounded-lg border border-grey-line bg-paper p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Tone & Language</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {(['formal', 'friendly', 'casual'] as Tone[]).map((t) => (
            <button key={t} type="button" disabled={dis} onClick={() => setTone(t)}
              className={`rounded-lg border p-3 text-left font-body text-sm font-semibold capitalize transition-colors ${
                tone === t ? 'border-coral bg-coral-light/50 text-ink' : 'border-grey-line text-ink/60 hover:border-grey-mid'
              } disabled:opacity-50`}>
              {t}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-body text-[11px] font-bold uppercase tracking-wider text-ink/50">Language</span>
            <select disabled={dis} value={language} onChange={(e) => setLanguage(e.target.value as Language)} className={`w-full ${inputCls}`}>
              <option value="en">English</option>
              <option value="ur">Urdu (اردو)</option>
              <option value="roman_ur">Roman Urdu</option>
              <option value="ar">Arabic (العربية)</option>
              <option value="mixed">Mixed (match the customer)</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block font-body text-[11px] font-bold uppercase tracking-wider text-ink/50">Sign-off</span>
            <input type="text" disabled={dis} value={signOff} onChange={(e) => setSignOff(e.target.value)} className={`w-full ${inputCls}`} />
          </label>
        </div>
        <SaveBtn disabled={dis} pending={pending} onClick={() => run(() => updateToneLanguage({ tone, language, sign_off: signOff }), 'Tone & language saved.')} />
      </section>

      {/* Business hours */}
      <section className="rounded-lg border border-grey-line bg-paper p-6 space-y-3">
        <h2 className="font-display text-lg font-bold text-ink">Business Hours</h2>
        {DAYS.map(([key, label]) => {
          const d = hours[key] || {};
          return (
            <div key={key} className="flex items-center gap-3 rounded-lg border border-grey-line px-4 py-2.5">
              <span className="w-24 font-body text-sm text-ink">{label}</span>
              {d.closed ? (
                <span className="flex-1 font-body text-sm text-ink/40">Closed</span>
              ) : (
                <div className="flex-1 flex items-center gap-2">
                  <input type="time" disabled={dis} value={d.open || ''}
                    onChange={(e) => setHours((h) => ({ ...h, [key]: { ...h[key], open: e.target.value } }))}
                    className={inputCls} />
                  <span className="text-ink/40 text-sm">–</span>
                  <input type="time" disabled={dis} value={d.close || ''}
                    onChange={(e) => setHours((h) => ({ ...h, [key]: { ...h[key], close: e.target.value } }))}
                    className={inputCls} />
                </div>
              )}
              <button type="button" disabled={dis}
                onClick={() => setHours((h) => ({ ...h, [key]: d.closed ? { closed: false, open: '09:00', close: '18:00' } : { closed: true } }))}
                className={`font-body text-xs font-semibold ${d.closed ? 'text-coral' : 'text-ink/40 hover:text-ink'}`}>
                {d.closed ? 'Open' : 'Close'}
              </button>
            </div>
          );
        })}
        <SaveBtn disabled={dis} pending={pending} onClick={() => run(() => updateBusinessHours(hours), 'Business hours saved.')} />
      </section>

      {/* Pause / resume */}
      <section className={`rounded-lg border p-6 space-y-3 ${paused ? 'border-coral/40 bg-coral-light/40' : 'border-grey-line'}`}>
        <h2 className="font-display text-lg font-bold text-ink">Service Status</h2>
        <p className="font-body text-sm text-ink/60">
          {paused
            ? 'Your service is paused — no reminders or slot recovery are running.'
            : 'Your service is live. Pausing stops all reminders and slot recovery until you resume.'}
        </p>
        <button
          disabled={pending}
          onClick={() => {
            if (!paused && !confirm('Pause the service? Customers will stop receiving reminders.')) return;
            run(async () => {
              const res = await setServicePaused(!paused);
              if (!res?.error) setPaused(!paused);
              return res;
            }, paused ? 'Service resumed.' : 'Service paused.');
          }}
          className={`rounded-lg px-5 py-2.5 font-body text-sm font-bold transition-colors disabled:opacity-50 ${
            paused ? 'bg-ink text-paper hover:bg-neutral-800' : 'bg-coral text-paper hover:brightness-110'
          }`}
        >
          {paused ? 'Resume Service' : 'Pause Service'}
        </button>
      </section>
    </div>
  );
}

function SaveBtn({ disabled, pending, onClick }: { disabled: boolean; pending: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="rounded-lg bg-ink px-5 py-2.5 font-body text-sm font-bold text-paper hover:bg-neutral-800 disabled:opacity-50">
      {pending ? 'Saving…' : 'Save'}
    </button>
  );
}