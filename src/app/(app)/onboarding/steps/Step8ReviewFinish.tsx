'use client'

import { useState } from 'react'
import { activateOnboarding, completeOnboarding, goToStep } from '@/lib/onboarding/actions'

const DAYS: [string, string][] = [
  ['mon', 'Mon'], ['tue', 'Tue'], ['wed', 'Wed'], ['thu', 'Thu'],
  ['fri', 'Fri'], ['sat', 'Sat'], ['sun', 'Sun'],
]

export function Step8ReviewFinish({ data, billingRegion }: { data: any; billingRegion: string }) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const currency = billingRegion === 'pakistan' ? 'PKR' : 'USD'

  async function handleFinish() {
    setSaving(true); setError('')
    const res = await activateOnboarding()
    setSaving(false)
    if (res.error) setError(res.error); else setDone(true)
  }

  async function edit(step: number) {
    await goToStep(step)
    window.location.href = `/onboarding?step=${step}`
  }

  const timing = data.reminder_timing
  const timingStr = timing
    ? ['r1', 'r2', 'r3'].filter((k) => timing[k]?.enabled).map((k) => `${timing[k].hours}h before`).join(' + ')
    : '—'
  const hoursStr = data.business_hours
    ? DAYS.map(([k, label]) => {
        const d = data.business_hours[k]
        return d?.closed ? `${label} closed` : d?.open ? `${label} ${d.open}–${d.close}` : null
      }).filter(Boolean).join(' · ')
    : '—'
  const services: any[] = Array.isArray(data.services_draft) ? data.services_draft : []

  if (done) {
    return (
      <div className="max-w-lg mx-auto space-y-6 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-coral/15 text-coral flex items-center justify-center text-2xl">✓</div>
        <h2 className="text-2xl font-bold text-white">Setup complete — your account is being activated</h2>
        <p className="text-sm text-zinc-400">
          {data.whatsapp_status === 'connected'
            ? 'Your line is connected. Reminders start with your next bookings.'
            : 'We\'re finishing your number setup — usually within one business day. Everything else is ready.'}
        </p>
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-left text-sm text-zinc-300 space-y-2">
          <p className="font-semibold text-amber-300">One rule for your team:</p>
          <p>Every booking must include the customer&apos;s phone number in international format in the event title:</p>
          <p className="bg-zinc-900 rounded-lg px-4 py-2 font-mono text-coral text-sm">Sara +14155551234</p>
        </div>
        <button onClick={() => completeOnboarding()}
          className="w-full py-3 rounded-lg bg-coral hover:brightness-110 text-white font-semibold transition">
          Go to Dashboard →
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white">Review & Finish</h2>
      <div className="space-y-3">
        <Row label="Business" value={`${data.business_name || '—'} · ${data.timezone || ''}`} onEdit={() => edit(1)} />
        <Row label="Owner / Team WhatsApp" value={`${data.owner_whatsapp || '—'} · ${data.team_member_whatsapp || '—'}`} onEdit={() => edit(1)} />
        <Row label="Avg appointment value" value={data.avg_appointment_value ? `${currency} ${data.avg_appointment_value}` : '—'} onEdit={() => edit(1)} />
        <Row label="Calendar" value={data.calendar_id} onEdit={() => edit(2)} mono />
        <Row
          label="WhatsApp"
          value={
            data.whatsapp_status === 'connected'
              ? `Connected — ${data.whatsapp_display_name || ''} ${data.whatsapp_number || ''}`
              : data.whatsapp_status === 'pending' ? 'Pending verification (assisted setup)' : 'Not connected'
          }
          onEdit={() => edit(3)}
        />
        <Row label="Business hours" value={hoursStr} onEdit={() => edit(4)} />
        <Row label="Reminders" value={timingStr} onEdit={() => edit(5)} />
        <Row label="Services" value={services.length ? services.map((s) => `${s.name} (${currency} ${s.price})`).join(', ') : '—'} onEdit={() => edit(6)} />
        <Row label="Tone / Language" value={`${data.tone || 'friendly'} · ${data.language || 'en'}`} onEdit={() => edit(7)} />
        <Row label="Sign-off" value={data.sign_off} onEdit={() => edit(7)} />
      </div>

      {data.whatsapp_status === 'not_connected' && (
        <p className="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
          WhatsApp isn&apos;t connected — reminders can&apos;t start until it is. Go back to step 3 to connect or request a number.
        </p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <button onClick={handleFinish} disabled={saving}
        className="w-full py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 text-white font-semibold transition text-lg">
        {saving ? 'Finishing…' : 'Finish Setup'}
      </button>
    </div>
  )
}

function Row({ label, value, onEdit, mono }: { label: string; value?: string | null; onEdit: () => void; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        <p className={`text-sm text-white break-words ${mono ? 'font-mono' : ''}`}>{value || '—'}</p>
      </div>
      <button type="button" onClick={onEdit} className="shrink-0 text-xs text-coral hover:brightness-110 underline">Edit</button>
    </div>
  )
}