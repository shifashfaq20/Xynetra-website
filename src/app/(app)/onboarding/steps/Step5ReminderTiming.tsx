'use client'

import { useState } from 'react'
import { saveStep5Timing } from '@/lib/onboarding/actions'
import type { ReminderTiming } from '@/lib/onboarding/types'

const DEFAULT: ReminderTiming = {
  r1: { enabled: true, hours: 24 },
  r2: { enabled: true, hours: 3 },
  r3: { enabled: false, hours: 72 },
}

const LABELS = ['First reminder', 'Second reminder', 'Third reminder'] as const

export function Step5ReminderTiming({ initial, onNext }: { initial?: ReminderTiming | null; onNext: () => void }) {
  const [t, setT] = useState<ReminderTiming>(initial ?? DEFAULT)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function patch(k: 'r1' | 'r2' | 'r3', p: Partial<{ enabled: boolean; hours: number }>) {
    setT((prev) => ({ ...prev, [k]: { ...prev[k], ...p } }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError('')
    const res = await saveStep5Timing({ reminder_timing: t })
    setSaving(false)
    if (res.error) setError(res.error); else onNext()
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white">Reminder Timing</h2>
      <p className="text-sm text-zinc-400">
        When should customers be reminded? Most businesses use 24 hours before, plus a short nudge on the day.
      </p>

      <div className="space-y-3">
        {(['r1', 'r2', 'r3'] as const).map((k, i) => (
          <div key={k} className={`rounded-xl border p-4 transition-colors ${t[k].enabled ? 'border-coral/50 bg-coral/5' : 'border-zinc-700'}`}>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-white">{LABELS[i]}</span>
              <input type="checkbox" checked={t[k].enabled} onChange={(e) => patch(k, { enabled: e.target.checked })} className="accent-coral w-4 h-4" />
            </label>
            {t[k].enabled && (
              <div className="mt-3 flex items-center gap-2">
                <input type="number" min={1} max={168} value={t[k].hours}
                  onChange={(e) => patch(k, { hours: Math.max(1, parseInt(e.target.value || '1', 10)) })}
                  className="w-24 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-coral" />
                <span className="text-sm text-zinc-400">hours before the appointment</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={saving}
        className="w-full py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 text-white font-semibold transition">
        {saving ? 'Saving…' : 'Continue'}
      </button>
    </form>
  )
}