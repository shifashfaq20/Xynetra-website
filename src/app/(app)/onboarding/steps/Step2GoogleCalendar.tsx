// src/app/(app)/onboarding/steps/Step2GoogleCalendar.tsx
'use client'

import { useState, useEffect } from 'react'
import { saveStep2 } from '@/lib/onboarding/actions'
import type { GoogleCalendar } from '@/lib/onboarding/types'

interface Props {
  initial: {
    calendar_id?: string | null
    calendar_connect_method?: string | null
  }
  gcalConnected: boolean
  onNext: () => void
}

export function Step2GoogleCalendar({ initial, gcalConnected, onNext }: Props) {
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([])
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [selectedCalId, setSelectedCalId] = useState(initial.calendar_id || '')
  const [mode, setMode] = useState<'choose' | 'oauth' | 'manual'>(
    initial.calendar_connect_method === 'manual' ? 'manual' : 'choose'
  )
  const [manualCalId, setManualCalId] = useState(initial.calendar_id || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // When Google OAuth redirects back, fetch calendars from temp cookie
  useEffect(() => {
    if (gcalConnected) {
      fetch('/api/google-calendar/calendars')
        .then((r) => r.json())
        .then((d) => {
          if (d.calendars) {
            setCalendars(d.calendars)
            setRefreshToken(d.refresh_token)
            setMode('oauth')
            // Auto-select primary
            const primary = d.calendars.find((c: GoogleCalendar) => c.primary)
            if (primary) setSelectedCalId(primary.id)
          }
        })
        .catch(() => setError('Failed to load calendars'))
    }
  }, [gcalConnected])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const calId = mode === 'manual' ? manualCalId.trim() : selectedCalId
    if (!calId) {
      setError('Please select or enter a Calendar ID.')
      return
    }

    setSaving(true)
    const res = await saveStep2({
      calendar_id: calId,
      calendar_connect_method: mode === 'manual' ? 'manual' : 'oauth',
      calendar_refresh_token: refreshToken || undefined,
    })
    setSaving(false)

    if (res.error) {
      setError(res.error)
    } else {
      onNext()
    }
  }

  const canSubmit =
    (mode === 'oauth' && selectedCalId) || (mode === 'manual' && manualCalId.trim().length > 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white">Connect Google Calendar</h2>

      {/* ── Primary path: OAuth button ── */}
      {mode === 'choose' && (
        <div className="space-y-6">
          <a
            href="/api/google-calendar/auth"
            className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Connect Google Calendar
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-zinc-900 px-3 text-zinc-500">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMode('manual')}
            className="w-full py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Can&apos;t use the button? Enter Calendar ID manually
          </button>
        </div>
      )}

      {/* ── OAuth path: pick calendar ── */}
      {mode === 'oauth' && calendars.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-zinc-400">Select the calendar where your bookings live:</p>
          {calendars.map((cal) => (
            <label
              key={cal.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedCalId === cal.id
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            >
              <input
                type="radio"
                name="calendar"
                value={cal.id}
                checked={selectedCalId === cal.id}
                onChange={() => setSelectedCalId(cal.id)}
                className="accent-emerald-500"
              />
              <div>
                <span className="text-white text-sm">{cal.summary}</span>
                {cal.primary && (
                  <span className="ml-2 text-xs text-emerald-400">(primary)</span>
                )}
                <p className="text-xs text-zinc-500 mt-0.5 font-mono">{cal.id}</p>
              </div>
            </label>
          ))}
          <button
            type="button"
            onClick={() => { setMode('choose'); setCalendars([]) }}
            className="text-sm text-zinc-500 hover:text-zinc-300 underline"
          >
            Disconnect and try again
          </button>
        </div>
      )}

      {/* ── Manual path ── */}
      {mode === 'manual' && (
        <div className="space-y-4">
          <div className="rounded-lg bg-zinc-800/50 border border-zinc-700 p-4 text-sm text-zinc-400 space-y-2">
            <p className="font-medium text-zinc-300">How to share your calendar:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open Google Calendar → Settings → your calendar</li>
              <li>Under &ldquo;Share with specific people&rdquo;, add:</li>
            </ol>
            <code className="block bg-zinc-900 rounded px-3 py-1.5 text-emerald-400 text-xs my-2">
              operations@xynetra.com
            </code>
            <p>Set permission to <strong className="text-white">&ldquo;Make changes to events&rdquo;</strong></p>
            <p className="mt-2">
              Then paste your Calendar ID below.{' '}
              <span className="text-zinc-500">
                (Find it in Calendar Settings → &ldquo;Calendar ID&rdquo; at the bottom — looks like{' '}
                <code className="text-zinc-400">abc123@group.calendar.google.com</code>)
              </span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Calendar ID</label>
            <input
              type="text"
              value={manualCalId}
              onChange={(e) => setManualCalId(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-mono text-sm"
              placeholder="abc123@group.calendar.google.com"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => setMode('choose')}
            className="text-sm text-zinc-500 hover:text-zinc-300 underline"
          >
            ← Try the Connect button instead
          </button>
        </div>
      )}

      {/* Honest note */}
      <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-300/80">
        <strong className="text-amber-300">Note:</strong> Today the automation works through the
        shared-access path. The Connect button&apos;s token is stored for the platform&apos;s next
        upgrade. Both paths are valid.
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {mode !== 'choose' && (
        <button
          type="submit"
          disabled={!canSubmit || saving}
          className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition-colors"
        >
          {saving ? 'Saving…' : 'Continue'}
        </button>
      )}
    </form>
  )
}