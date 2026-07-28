'use client'

import { useState } from 'react'
import { saveStep4Hours } from '@/lib/onboarding/actions'
import type { BusinessHours } from '@/lib/onboarding/types'

const DAYS = [
  ['mon', 'Monday'], ['tue', 'Tuesday'], ['wed', 'Wednesday'], ['thu', 'Thursday'],
  ['fri', 'Friday'], ['sat', 'Saturday'], ['sun', 'Sunday'],
] as const

const DEFAULTS: BusinessHours = {
  mon: { open: '09:00', close: '18:00' }, tue: { open: '09:00', close: '18:00' },
  wed: { open: '09:00', close: '18:00' }, thu: { open: '09:00', close: '18:00' },
  fri: { open: '09:00', close: '18:00' }, sat: { open: '09:00', close: '18:00' },
  sun: { closed: true },
}

export function Step4BusinessHours({ initial, onNext }: { initial?: BusinessHours | null; onNext: () => void }) {
  const [hours, setHours] = useState<BusinessHours>(
    initial && Object.keys(initial).length ? initial : DEFAULTS
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function setDay(day: string, patch: Partial<{ open: string; close: string; closed: boolean }>) {
    setHours((h) => ({ ...h, [day]: { ...h[day], ...patch } }))
  }

  const valid = DAYS.every(([d]) => {
    const day = hours[d]
    return day?.closed || (day?.open && day?.close && day.open < day.close)
  })

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) { setError('Each open day needs an opening time before its closing time.'); return }
    setSaving(true); setError('')
    const res = await saveStep4Hours({ business_hours: hours })
    setSaving(false)
    if (res.error) setError(res.error); else onNext()
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white">Business Hours</h2>
      <p className="text-sm text-zinc-400">
        Customers asking for new times are only offered slots inside your opening hours.
      </p>

      <div className="space-y-2">
        {DAYS.map(([key, label]) => {
          const d = hours[key] || {}
          return (
            <div key={key} className="flex items-center gap-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 px-4 py-2.5">
              <span className="w-24 text-sm text-zinc-300">{label}</span>
              {d.closed ? (
                <span className="flex-1 text-sm text-zinc-500">Closed</span>
              ) : (
                <div className="flex-1 flex items-center gap-2">
                  <input type="time" value={d.open || ''} onChange={(e) => setDay(key, { open: e.target.value })}
                    className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white [color-scheme:dark]" />
                  <span className="text-zinc-500 text-sm">–</span>
                  <input type="time" value={d.close || ''} onChange={(e) => setDay(key, { close: e.target.value })}
                    className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white [color-scheme:dark]" />
                </div>
              )}
              <button type="button" onClick={() => setDay(key, d.closed ? { closed: false, open: '09:00', close: '18:00' } : { closed: true })}
                className={`text-xs font-medium ${d.closed ? 'text-coral' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {d.closed ? 'Open' : 'Close'}
              </button>
            </div>
          )
        })}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={saving}
        className="w-full py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 text-white font-semibold transition">
        {saving ? 'Saving…' : 'Continue'}
      </button>
    </form>
  )
}