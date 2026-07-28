// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'
// import { isValidPhoneNumber } from 'libphonenumber-js'
// import { connectWhatsAppEmbedded, saveAssistedNumber, disconnectWhatsApp } from '@/lib/onboarding/actions'
// import type { PhoneOption, WhatsAppStatus } from '@/lib/onboarding/types'

// declare global { interface Window { FB: any; fbAsyncInit: () => void } }

// const COUNTRIES = [
//   { code: 'US', label: 'United States' }, { code: 'GB', label: 'United Kingdom' },
//   { code: 'AU', label: 'Australia' },     { code: 'AE', label: 'United Arab Emirates' },
//   { code: 'SA', label: 'Saudi Arabia' },  { code: 'PK', label: 'Pakistan' },
//   { code: 'CA', label: 'Canada' },        { code: 'OTHER', label: 'Other' },
// ]

// interface Props {
//   initial: {
//     whatsapp_status?: WhatsAppStatus | null
//     whatsapp_display_name?: string | null
//     whatsapp_number?: string | null
//     phone_option?: PhoneOption | null
//     phone_number?: string | null
//     phone_country?: string | null
//     phone_area_code?: string | null
//     phone_auth_confirmed?: boolean | null
//   }
//   onNext: () => void
// }

// export function Step3ConnectWhatsApp({ initial, onNext }: Props) {
//   const [status, setStatus] = useState<WhatsAppStatus>(initial.whatsapp_status ?? 'not_connected')
//   const [displayName, setDisplayName] = useState(initial.whatsapp_display_name || '')
//   const [displayNumber, setDisplayNumber] = useState(initial.whatsapp_number || '')
//   const [mode, setMode] = useState<'main' | 'assisted'>('main')
//   const [busy, setBusy] = useState(false)
//   const [error, setError] = useState('')
//   const [sdkReady, setSdkReady] = useState(false)
//   const pendingRef = useRef<{ phone_number_id?: string; waba_id?: string }>({})

//   // assisted-form state
//   const [option, setOption] = useState<PhoneOption | null>(initial.phone_option ?? null)
//   const [number, setNumber] = useState(initial.phone_number || '')
//   const [country, setCountry] = useState(initial.phone_country || '')
//   const [areaCode, setAreaCode] = useState(initial.phone_area_code || '')
//   const [authOk, setAuthOk] = useState(!!initial.phone_auth_confirmed)

//   // Load the official sign-up SDK once
//   useEffect(() => {
//     if (window.FB) { setSdkReady(true); return }
//     window.fbAsyncInit = function () {
//       window.FB.init({
//         appId: process.env.NEXT_PUBLIC_META_APP_ID,
//         autoLogAppEvents: true,
//         xfbml: true,
//         version: 'v21.0',
//       })
//       setSdkReady(true)
//     }
//     const s = document.createElement('script')
//     s.src = 'https://connect.facebook.net/en_US/sdk.js'
//     s.async = true; s.defer = true; s.crossOrigin = 'anonymous'
//     document.body.appendChild(s)
//   }, [])

//   // The popup posts the connected number's IDs back to us
//   useEffect(() => {
//     function onMessage(event: MessageEvent) {
//       if (!event.origin.includes('facebook.com')) return
//       try {
//         const data = JSON.parse(event.data as string)
//         if (data.type === 'WA_EMBEDDED_SIGNUP' && data.event === 'FINISH') {
//           pendingRef.current = {
//             phone_number_id: data.data.phone_number_id,
//             waba_id: data.data.waba_id,
//           }
//         }
//       } catch { /* not ours */ }
//     }
//     window.addEventListener('message', onMessage)
//     return () => window.removeEventListener('message', onMessage)
//   }, [])

//   function launchSignup(): Promise<string | null> {
//     return new Promise((resolve) => {
//       window.FB.login(
//         (response: any) => resolve(response?.authResponse?.code ?? null),
//         {
//           config_id: process.env.NEXT_PUBLIC_META_EMBEDDED_CONFIG_ID,
//           response_type: 'code',
//           override_default_response_type: true,
//           extras: { setup: {}, featureType: '', sessionInfoVersion: '3' },
//         }
//       )
//     })
//   }

//   async function handleConnect() {
//     if (!sdkReady) { setError('Still loading — try again in a second.'); return }
//     setBusy(true); setError('')
//     const code = await launchSignup()
//     if (!code) { setBusy(false); setError('Sign-up was closed before finishing.'); return }

//     const ids = pendingRef.current
//     if (!ids.phone_number_id || !ids.waba_id) {
//       setBusy(false)
//       setError('We could not confirm the new number. Please try again.')
//       return
//     }
//     const res = await connectWhatsAppEmbedded({
//       code, waba_id: ids.waba_id, phone_number_id: ids.phone_number_id,
//     })
//     setBusy(false)
//     if (res.error) { setError(res.error); return }
//     setDisplayName(res.display_name || '')
//     setDisplayNumber(res.number || '')
//     setStatus('connected')
//   }

//   async function handleDisconnect() {
//     if (!confirm('Disconnecting stops all reminders and slot recovery. Continue?')) return
//     setBusy(true)
//     await disconnectWhatsApp()
//     setBusy(false)
//     setStatus('not_connected'); setDisplayName(''); setDisplayNumber('')
//   }

//   async function handleAssisted(e: React.FormEvent) {
//     e.preventDefault()
//     if (!option) return
//     setBusy(true); setError('')
//     const res = await saveAssistedNumber({
//       phone_option: option,
//       phone_number: option === 'agency_virtual' ? undefined : number,
//       phone_country: option === 'agency_virtual' ? country : undefined,
//       phone_area_code: option === 'agency_virtual' ? areaCode || undefined : undefined,
//       phone_auth_confirmed: option === 'agency_virtual' ? authOk : undefined,
//     })
//     setBusy(false)
//     if (res.error) { setError(res.error); return }
//     setStatus('pending')
//     setMode('main')
//   }

//   const numberValid = number ? isValidPhoneNumber(number) : false
//   const assistedOk =
//     (option === 'client_sim' || option === 'landline') ? numberValid
//     : option === 'agency_virtual' ? !!country && authOk : false

//   /* ── CONNECTED ── */
//   if (status === 'connected') {
//     return (
//       <div className="space-y-6 max-w-lg mx-auto">
//         <h2 className="text-2xl font-bold text-white">Connect WhatsApp</h2>
//         <div className="rounded-xl border border-coral/40 bg-coral/5 p-5 space-y-1">
//           <p className="text-xs uppercase tracking-wider text-coral font-semibold">Connected</p>
//           <p className="text-lg font-semibold text-white">{displayName || 'Your business line'}</p>
//           <p className="text-sm text-zinc-400">{displayNumber || 'Number connected'}</p>
//           <p className="text-xs text-zinc-500 pt-2">
//             Confirm this shows your exact business name — it&apos;s what your customers will see.
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button onClick={onNext} className="flex-1 py-3 rounded-lg bg-coral hover:brightness-110 text-white font-semibold transition">
//             Continue
//           </button>
//           <button onClick={handleDisconnect} disabled={busy}
//             className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-900 text-sm transition">
//             Disconnect
//           </button>
//         </div>
//       </div>
//     )
//   }

//   /* ── PENDING (assisted path chosen) ── */
//   if (status === 'pending' && mode === 'main') {
//     return (
//       <div className="space-y-6 max-w-lg mx-auto">
//         <h2 className="text-2xl font-bold text-white">Connect WhatsApp</h2>
//         <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 space-y-1">
//           <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Pending verification</p>
//           <p className="text-sm text-zinc-300">
//             We&apos;re setting up your dedicated number. This usually completes within one business day —
//             you can finish the rest of onboarding now.
//           </p>
//           {initial.phone_number && <p className="text-sm text-zinc-400 pt-1">Number: {initial.phone_number}</p>}
//         </div>
//         <div className="flex gap-3">
//           <button onClick={onNext} className="flex-1 py-3 rounded-lg bg-coral hover:brightness-110 text-white font-semibold transition">
//             Continue
//           </button>
//           <button onClick={() => setMode('assisted')} className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-sm transition">
//             Change
//           </button>
//         </div>
//       </div>
//     )
//   }

//   /* ── ASSISTED FORM ── */
//   if (mode === 'assisted') {
//     const optCls = (o: PhoneOption) =>
//       `w-full text-left rounded-xl border p-4 transition-colors ${
//         option === o ? 'border-coral bg-coral/10' : 'border-zinc-700 hover:border-zinc-500'}`
//     return (
//       <form onSubmit={handleAssisted} className="space-y-5 max-w-lg mx-auto">
//         <h2 className="text-2xl font-bold text-white">Get a dedicated number</h2>
//         <p className="text-sm text-zinc-400">
//           The number is registered under <strong className="text-zinc-200">your</strong> business identity
//           and stays yours — even if you leave. It must be a fresh number not active on WhatsApp.
//         </p>
//         <div className="space-y-3">
//           <button type="button" onClick={() => setOption('client_sim')} className={optCls('client_sim')}>
//             <p className="font-semibold text-white text-sm">I&apos;ll get a local SIM <span className="ml-2 text-xs text-coral font-normal">Recommended</span></p>
//             <p className="text-xs text-zinc-400 mt-1">Cheapest prepaid SIM in the business&apos;s name. Don&apos;t install WhatsApp on it — we&apos;ll read you a one-time code on a short call.</p>
//           </button>
//           <button type="button" onClick={() => setOption('landline')} className={optCls('landline')}>
//             <p className="font-semibold text-white text-sm">Use my business landline</p>
//             <p className="text-xs text-zinc-400 mt-1">You&apos;ll answer one automated call to hear the code.</p>
//           </button>
//           <button type="button" onClick={() => setOption('agency_virtual')} className={optCls('agency_virtual')}>
//             <p className="font-semibold text-white text-sm">Procure one for me <span className="ml-2 text-xs text-zinc-500 font-normal">Paid setup add-on</span></p>
//             <p className="text-xs text-zinc-400 mt-1">We arrange a number under your business identity. Transferable to you at any time.</p>
//           </button>
//         </div>

//         {(option === 'client_sim' || option === 'landline') && (
//           <div>
//             <PhoneInput international defaultCountry="US" value={number as any}
//               onChange={(v) => setNumber(v || '')} className="phone-input-dark" placeholder="+1 415 555 1234" />
//             {number && !numberValid && <p className="mt-1 text-xs text-red-400">Enter a valid international number.</p>}
//           </div>
//         )}
//         {option === 'agency_virtual' && (
//           <div className="space-y-4">
//             <select value={country} onChange={(e) => setCountry(e.target.value)}
//               className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white outline-none focus:border-coral">
//               <option value="">Country for the number…</option>
//               {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
//             </select>
//             {['AE', 'SA', 'PK'].includes(country) && (
//               <p className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
//                 Virtual numbers verify unreliably in this country — a local SIM is cheaper and works every time.
//               </p>
//             )}
//             <input type="text" value={areaCode} onChange={(e) => setAreaCode(e.target.value)}
//               className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-coral"
//               placeholder="Preferred area / city code (optional)" />
//             <label className="flex items-start gap-3 text-sm text-zinc-300 cursor-pointer">
//               <input type="checkbox" checked={authOk} onChange={(e) => setAuthOk(e.target.checked)} className="mt-1 accent-coral" />
//               I authorize Xynetra to procure a number on my behalf, registered under my business identity.
//             </label>
//           </div>
//         )}

//         {error && <p className="text-sm text-red-400">{error}</p>}
//         <div className="flex gap-3">
//           <button type="button" onClick={() => setMode('main')}
//             className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-sm transition">← Back</button>
//           <button type="submit" disabled={!assistedOk || busy}
//             className="flex-1 py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition">
//             {busy ? 'Saving…' : 'Save & Continue'}
//           </button>
//         </div>
//         <style jsx global>{`
//           .phone-input-dark .PhoneInputCountry { background:#27272a; border-color:#3f3f46; border-radius:.5rem 0 0 .5rem; }
//           .phone-input-dark .PhoneInputInput { background:#27272a; border:1px solid #3f3f46; border-left:none; border-radius:0 .5rem .5rem 0; color:white; padding:.625rem 1rem; outline:none; width:100%; }
//         `}</style>
//       </form>
//     )
//   }

//   /* ── MAIN: not connected ── */
//   return (
//     <div className="space-y-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold text-white">Connect WhatsApp</h2>

//       <div className="rounded-lg bg-zinc-800/60 border border-zinc-700 p-4 text-xs text-zinc-400 space-y-1.5">
//         <p>• You get a <strong className="text-zinc-200">dedicated number</strong> shown as your business — never a shared one.</p>
//         <p>• The number and business account <strong className="text-zinc-200">belong to you</strong>. You connect through the official sign-up flow — we never see your password, and you can revoke access anytime.</p>
//       </div>

//       <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4 text-xs text-amber-200/90">
//         <strong>Important:</strong> use a new number that is not currently active on WhatsApp.
//         Registering an in-use number will disconnect it from the WhatsApp app.
//       </div>

//       <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4 flex items-center justify-between">
//         <span className="text-sm text-zinc-400">Status</span>
//         <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Not connected</span>
//       </div>

//       {error && <p className="text-sm text-red-400">{error}</p>}

//       <button onClick={handleConnect} disabled={busy || !sdkReady}
//         className="w-full py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition">
//         {busy ? 'Opening secure sign-up…' : 'Connect WhatsApp'}
//       </button>

//       <button onClick={() => setMode('assisted')}
//         className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 underline transition">
//         Can&apos;t arrange a number yourself? We&apos;ll help you get one.
//       </button>
//     </div>
//   )
// }


'use client'

import { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { connectWhatsAppEmbedded, saveAssistedNumber, disconnectWhatsApp } from '@/lib/onboarding/actions'
import type { PhoneOption, WhatsAppStatus } from '@/lib/onboarding/types'

declare global { interface Window { FB: any; fbAsyncInit: () => void } }

const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID
const META_CONFIG_ID = process.env.NEXT_PUBLIC_META_EMBEDDED_CONFIG_ID
// The one-click connect only works when both public identifiers are present.
const EMBEDDED_CONFIGURED = Boolean(META_APP_ID && META_CONFIG_ID)

const COUNTRIES = [
  { code: 'US', label: 'United States' }, { code: 'GB', label: 'United Kingdom' },
  { code: 'AU', label: 'Australia' },     { code: 'AE', label: 'United Arab Emirates' },
  { code: 'SA', label: 'Saudi Arabia' },  { code: 'PK', label: 'Pakistan' },
  { code: 'CA', label: 'Canada' },        { code: 'OTHER', label: 'Other' },
]

interface Props {
  initial: {
    whatsapp_status?: WhatsAppStatus | null
    whatsapp_display_name?: string | null
    whatsapp_number?: string | null
    phone_option?: PhoneOption | null
    phone_number?: string | null
    phone_country?: string | null
    phone_area_code?: string | null
    phone_auth_confirmed?: boolean | null
  }
  onNext: () => void
}

export function Step3ConnectWhatsApp({ initial, onNext }: Props) {
  const [status, setStatus] = useState<WhatsAppStatus>(initial.whatsapp_status ?? 'not_connected')
  const [displayName, setDisplayName] = useState(initial.whatsapp_display_name || '')
  const [displayNumber, setDisplayNumber] = useState(initial.whatsapp_number || '')
  const [mode, setMode] = useState<'main' | 'assisted'>('main')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [sdkReady, setSdkReady] = useState(false)
  const pendingRef = useRef<{ phone_number_id?: string; waba_id?: string }>({})

  // assisted-form state
  const [option, setOption] = useState<PhoneOption | null>(initial.phone_option ?? null)
  const [number, setNumber] = useState(initial.phone_number || '')
  const [country, setCountry] = useState(initial.phone_country || '')
  const [areaCode, setAreaCode] = useState(initial.phone_area_code || '')
  const [authOk, setAuthOk] = useState(!!initial.phone_auth_confirmed)

  // Load the official sign-up SDK once — only when configured.
  useEffect(() => {
    if (!EMBEDDED_CONFIGURED) return
    if (window.FB) { setSdkReady(true); return }
    window.fbAsyncInit = function () {
      try {
        window.FB.init({
          appId: META_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v21.0',
        })
        setSdkReady(true)
      } catch (e) {
        console.error('Sign-up SDK init failed:', e)
      }
    }
    const s = document.createElement('script')
    s.src = 'https://connect.facebook.net/en_US/sdk.js'
    s.async = true; s.defer = true; s.crossOrigin = 'anonymous'
    s.onerror = () => console.error('Sign-up SDK failed to load (ad blocker?)')
    document.body.appendChild(s)
  }, [])

  // The popup posts the connected number's IDs back to us
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!event.origin.includes('facebook.com')) return
      try {
        const data = JSON.parse(event.data as string)
        if (data.type === 'WA_EMBEDDED_SIGNUP' && data.event === 'FINISH') {
          pendingRef.current = {
            phone_number_id: data.data.phone_number_id,
            waba_id: data.data.waba_id,
          }
        }
      } catch { /* not ours */ }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // FB.login wrapped so it can NEVER hang the UI: try/catch + hard timeout.
  function launchSignup(): Promise<string | null> {
    return new Promise((resolve) => {
      let settled = false
      const done = (code: string | null) => {
        if (!settled) { settled = true; clearTimeout(timer); resolve(code) }
      }
      const timer = setTimeout(() => done(null), 120000) // 2-minute safety net
      try {
        window.FB.login(
          (response: any) => done(response?.authResponse?.code ?? null),
          {
            config_id: META_CONFIG_ID,
            response_type: 'code',
            override_default_response_type: true,
            extras: { setup: {}, featureType: '', sessionInfoVersion: '3' },
          }
        )
      } catch (e) {
        console.error('Sign-up launch failed:', e)
        done(null)
      }
    })
  }

  // The FINISH postMessage can land a moment after the login callback —
  // poll briefly so we don't fail on a race.
  async function waitForIds(timeoutMs = 5000) {
    const start = Date.now()
    while (Date.now() - start < timeoutMs) {
      if (pendingRef.current.phone_number_id && pendingRef.current.waba_id) break
      await new Promise((r) => setTimeout(r, 150))
    }
    return pendingRef.current
  }

  async function handleConnect() {
    if (!EMBEDDED_CONFIGURED) return
    if (!sdkReady) { setError('Still loading — try again in a second.'); return }
    setBusy(true); setError('')
    pendingRef.current = {}
    try {
      const code = await launchSignup()
      if (!code) { setError('Sign-up was closed before finishing.'); return }

      const ids = await waitForIds()
      if (!ids.phone_number_id || !ids.waba_id) {
        setError('We could not confirm the new number. Please try again.')
        return
      }
      const res = await connectWhatsAppEmbedded({
        code, waba_id: ids.waba_id, phone_number_id: ids.phone_number_id,
      })
      if (res.error) { setError(res.error); return }
      setDisplayName(res.display_name || '')
      setDisplayNumber(res.number || '')
      setStatus('connected')
    } finally {
      setBusy(false) // always un-stick the button
    }
  }

  async function handleDisconnect() {
    if (!confirm('Disconnecting stops all reminders and slot recovery. Continue?')) return
    setBusy(true)
    try {
      await disconnectWhatsApp()
      setStatus('not_connected'); setDisplayName(''); setDisplayNumber('')
    } finally {
      setBusy(false)
    }
  }

  async function handleAssisted(e: React.FormEvent) {
    e.preventDefault()
    if (!option) return
    setBusy(true); setError('')
    try {
      const res = await saveAssistedNumber({
        phone_option: option,
        phone_number: option === 'agency_virtual' ? undefined : number,
        phone_country: option === 'agency_virtual' ? country : undefined,
        phone_area_code: option === 'agency_virtual' ? areaCode || undefined : undefined,
        phone_auth_confirmed: option === 'agency_virtual' ? authOk : undefined,
      })
      if (res.error) { setError(res.error); return }
      setStatus('pending')
      setMode('main')
    } finally {
      setBusy(false)
    }
  }

  const numberValid = number ? isValidPhoneNumber(number) : false
  const assistedOk =
    (option === 'client_sim' || option === 'landline') ? numberValid
    : option === 'agency_virtual' ? !!country && authOk : false

  /* ── CONNECTED ── */
  if (status === 'connected') {
    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-white">Connect WhatsApp</h2>
        <div className="rounded-xl border border-coral/40 bg-coral/5 p-5 space-y-1">
          <p className="text-xs uppercase tracking-wider text-coral font-semibold">Connected</p>
          <p className="text-lg font-semibold text-white">{displayName || 'Your business line'}</p>
          <p className="text-sm text-zinc-400">{displayNumber || 'Number connected'}</p>
          <p className="text-xs text-zinc-500 pt-2">
            Confirm this shows your exact business name — it&apos;s what your customers will see.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onNext} className="flex-1 py-3 rounded-lg bg-coral hover:brightness-110 text-white font-semibold transition">
            Continue
          </button>
          <button onClick={handleDisconnect} disabled={busy}
            className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-900 text-sm transition">
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  /* ── PENDING (assisted path chosen) ── */
  if (status === 'pending' && mode === 'main') {
    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-white">Connect WhatsApp</h2>
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 space-y-1">
          <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Pending verification</p>
          <p className="text-sm text-zinc-300">
            We&apos;re setting up your dedicated number. This usually completes within one business day —
            you can finish the rest of onboarding now.
          </p>
          {initial.phone_number && <p className="text-sm text-zinc-400 pt-1">Number: {initial.phone_number}</p>}
        </div>
        <div className="flex gap-3">
          <button onClick={onNext} className="flex-1 py-3 rounded-lg bg-coral hover:brightness-110 text-white font-semibold transition">
            Continue
          </button>
          <button onClick={() => setMode('assisted')} className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-sm transition">
            Change
          </button>
        </div>
      </div>
    )
  }

  /* ── ASSISTED FORM ── */
  if (mode === 'assisted') {
    const optCls = (o: PhoneOption) =>
      `w-full text-left rounded-xl border p-4 transition-colors ${
        option === o ? 'border-coral bg-coral/10' : 'border-zinc-700 hover:border-zinc-500'}`
    return (
      <form onSubmit={handleAssisted} className="space-y-5 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-white">Get a dedicated number</h2>
        <p className="text-sm text-zinc-400">
          The number is registered under <strong className="text-zinc-200">your</strong> business identity
          and stays yours — even if you leave. It must be a fresh number not active on WhatsApp.
        </p>
        <div className="space-y-3">
          <button type="button" onClick={() => setOption('client_sim')} className={optCls('client_sim')}>
            <p className="font-semibold text-white text-sm">I&apos;ll get a local SIM <span className="ml-2 text-xs text-coral font-normal">Recommended</span></p>
            <p className="text-xs text-zinc-400 mt-1">Cheapest prepaid SIM in the business&apos;s name. Don&apos;t install WhatsApp on it — we&apos;ll read you a one-time code on a short call.</p>
          </button>
          <button type="button" onClick={() => setOption('landline')} className={optCls('landline')}>
            <p className="font-semibold text-white text-sm">Use my business landline</p>
            <p className="text-xs text-zinc-400 mt-1">You&apos;ll answer one automated call to hear the code.</p>
          </button>
          <button type="button" onClick={() => setOption('agency_virtual')} className={optCls('agency_virtual')}>
            <p className="font-semibold text-white text-sm">Procure one for me <span className="ml-2 text-xs text-zinc-500 font-normal">Paid setup add-on</span></p>
            <p className="text-xs text-zinc-400 mt-1">We arrange a number under your business identity. Transferable to you at any time.</p>
          </button>
        </div>

        {(option === 'client_sim' || option === 'landline') && (
          <div>
            <PhoneInput international defaultCountry="US" value={number as any}
              onChange={(v) => setNumber(v || '')} className="phone-input-dark" placeholder="+1 415 555 1234" />
            {number && !numberValid && <p className="mt-1 text-xs text-red-400">Enter a valid international number.</p>}
          </div>
        )}
        {option === 'agency_virtual' && (
          <div className="space-y-4">
            <select value={country} onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white outline-none focus:border-coral">
              <option value="">Country for the number…</option>
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
            </select>
            {['AE', 'SA', 'PK'].includes(country) && (
              <p className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                Virtual numbers verify unreliably in this country — a local SIM is cheaper and works every time.
              </p>
            )}
            <input type="text" value={areaCode} onChange={(e) => setAreaCode(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-coral"
              placeholder="Preferred area / city code (optional)" />
            <label className="flex items-start gap-3 text-sm text-zinc-300 cursor-pointer">
              <input type="checkbox" checked={authOk} onChange={(e) => setAuthOk(e.target.checked)} className="mt-1 accent-coral" />
              I authorize Xynetra to procure a number on my behalf, registered under my business identity.
            </label>
          </div>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={() => setMode('main')}
            className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-sm transition">← Back</button>
          <button type="submit" disabled={!assistedOk || busy}
            className="flex-1 py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition">
            {busy ? 'Saving…' : 'Save & Continue'}
          </button>
        </div>
        <style jsx global>{`
          .phone-input-dark .PhoneInputCountry { background:#27272a; border-color:#3f3f46; border-radius:.5rem 0 0 .5rem; }
          .phone-input-dark .PhoneInputInput { background:#27272a; border:1px solid #3f3f46; border-left:none; border-radius:0 .5rem .5rem 0; color:white; padding:.625rem 1rem; outline:none; width:100%; }
        `}</style>
      </form>
    )
  }

  /* ── MAIN: not connected ── */
  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white">Connect WhatsApp</h2>

      <div className="rounded-lg bg-zinc-800/60 border border-zinc-700 p-4 text-xs text-zinc-400 space-y-1.5">
        <p>• You get a <strong className="text-zinc-200">dedicated number</strong> shown as your business — never a shared one.</p>
        <p>• The number and business account <strong className="text-zinc-200">belong to you</strong>. You connect through the official sign-up flow — we never see your password, and you can revoke access anytime.</p>
      </div>

      <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4 text-xs text-amber-200/90">
        <strong>Important:</strong> use a new number that is not currently active on WhatsApp.
        Registering an in-use number will disconnect it from the WhatsApp app.
      </div>

      <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4 flex items-center justify-between">
        <span className="text-sm text-zinc-400">Status</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Not connected</span>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {EMBEDDED_CONFIGURED ? (
        <button onClick={handleConnect} disabled={busy || !sdkReady}
          className="w-full py-3 rounded-lg bg-coral hover:brightness-110 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition">
          {busy ? 'Opening secure sign-up…' : sdkReady ? 'Connect WhatsApp' : 'Loading secure sign-up…'}
        </button>
      ) : (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 text-sm text-zinc-400">
          One-click connection is being finalized on our side. For now, use the assisted
          option below — it takes about one business day.
        </div>
      )}

      <button onClick={() => setMode('assisted')}
        className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 underline transition">
        Can&apos;t arrange a number yourself? We&apos;ll help you get one.
      </button>
    </div>
  )
}