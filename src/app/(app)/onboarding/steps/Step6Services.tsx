'use client'

import { useState } from 'react'
import { saveStep6Services } from '@/lib/onboarding/actions'
import type { ServiceItem } from '@/lib/onboarding/types'

export function Step6Services({
  initial, currency, onNext,
}: { initial?: ServiceItem[] | null; currency: string; onNext: () => void }) {
  const [rows, setRows] = useState<ServiceItem[]>(
    initial?.length ? initial : [{ name: '', price: 0 }]
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function update(i: number, p: Partial<ServiceItem>) {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...p } : row)))
  }

  const valid = rows.some((r) => r.name.trim()) && rows.every((r) => !r.name.trim() || r.price > 0)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError('')
    const res = await saveStep6Services({ services: rows.filter((r) => r.name.trim()) })
    setSaving(false)
    if (res.error) setError(res.error); else onNext()
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white">Services & Prices</h2>
      <p className="text-sm text-zinc-400">
        Used in your messages and to calculate the revenue we recover for you.
      </p>

      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="text" value={row.name} onChange={(e) => update(i, { name: e.target.value })}
              placeholder="e.g. Hair colour"
              className="flex-1 rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-coral" />
            <div className="relative w-32">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">{currency}</span>
              <input type="number" min="0" step="0.01" value={row.price || ''} onChange={(e) => update(i, { price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 pl-12 pr-3 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-coral" />
            </div>
            <button type="button" onClick={() => setRows((r) => r.filter((_, idx) => idx !== i))}
              className="text-zinc-600 hover:text-red-400 px-2 text-lg leading-none">×</button>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => setRows((r) => [...r, { name: '', price: 0 }])}
        className="text-sm text-coral hover:brightness-110 font-medium">+ Add another service</button>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={!valid || saving}
        className="w-full py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition">
        {saving ? 'Saving…' : 'Continue'}
      </button>
    </form>
  )
}