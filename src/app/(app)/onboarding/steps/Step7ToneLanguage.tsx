'use client'

import { useState } from 'react'
import { saveStep7Tone } from '@/lib/onboarding/actions'
import type { Tone, Language } from '@/lib/onboarding/types'

const TONES: { value: Tone; label: string; hint: string }[] = [
  { value: 'formal', label: 'Formal', hint: 'Polite and professional. “Dear customer…”' },
  { value: 'friendly', label: 'Friendly', hint: 'Warm and approachable. Most popular.' },
  { value: 'casual', label: 'Casual', hint: 'Relaxed and short. “See you tomorrow!”' },
]

const LANGS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'Urdu (اردو)' },
  { value: 'roman_ur', label: 'Roman Urdu' },
  { value: 'ar', label: 'Arabic (العربية)' },
  { value: 'mixed', label: 'Mixed (match the customer)' },
]

export function Step7ToneLanguage({
  initial, businessName, onNext,
}: {
  initial?: { tone?: Tone | null; language?: Language | null; sign_off?: string | null }
  businessName?: string | null
  onNext: () => void
}) {
  const [tone, setTone] = useState<Tone>(initial?.tone ?? 'friendly')
  const [language, setLanguage] = useState<Language>(initial?.language ?? 'en')
  const [signOff, setSignOff] = useState(initial?.sign_off ?? `See you soon, ${businessName || 'us'}`)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError('')
    const res = await saveStep7Tone({ tone, language, sign_off: signOff.trim() })
    setSaving(false)
    if (res.error) setError(res.error); else onNext()
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white">Tone & Language</h2>
      <p className="text-sm text-zinc-400">
        Your messages go out in your words, your style — chosen here, never improvised.
      </p>

      <div className="space-y-3">
        {TONES.map((t) => (
          <button key={t.value} type="button" onClick={() => setTone(t.value)}
            className={`w-full text-left rounded-xl border p-4 transition-colors ${
              tone === t.value ? 'border-coral bg-coral/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <p className="font-semibold text-white text-sm">{t.label}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{t.hint}</p>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Message language</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white outline-none focus:border-coral">
          {LANGS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Sign-off</label>
        <input type="text" value={signOff} onChange={(e) => setSignOff(e.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-coral"
          placeholder={`See you soon, ${businessName || 'Your Business'}`} />
        <p className="mt-1 text-xs text-zinc-500">How your messages end.</p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={saving}
        className="w-full py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 text-white font-semibold transition">
        {saving ? 'Saving…' : 'Continue'}
      </button>
    </form>
  )
}