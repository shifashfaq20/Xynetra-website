'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkMySubscriptionActive } from '@/lib/billing/action'

export function CheckoutContinue() {
  const router = useRouter()
  const [checking, setChecking] = useState(false)
  const [note, setNote] = useState('')

  async function check() {
    setChecking(true)
    setNote('')
    const active = await checkMySubscriptionActive()
    setChecking(false)
    if (active) {
      router.push('/onboarding')
    } else {
      setNote(
        "We haven't confirmed your payment yet. If you just paid, give it a few seconds and try again."
      )
    }
  }

  // Silent auto-poll — once the payment clears, advance without a click.
  useEffect(() => {
    const t = setInterval(async () => {
      const active = await checkMySubscriptionActive()
      if (active) router.push('/onboarding')
    }, 10000)
    return () => clearInterval(t)
  }, [router])

  return (
    <div className="space-y-2">
      <button
        onClick={check}
        disabled={checking}
        className="w-full rounded-lg bg-ink py-3 font-body text-sm font-bold text-paper hover:bg-neutral-800 disabled:opacity-50 transition-colors"
      >
        {checking ? 'Checking…' : "I've paid — Continue to setup →"}
      </button>
      {note && (
        <p className="text-center font-body text-xs text-ink/55">{note}</p>
      )}
    </div>
  )
}