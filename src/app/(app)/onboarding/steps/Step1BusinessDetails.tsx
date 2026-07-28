// // src/app/(app)/onboarding/steps/Step1BusinessDetails.tsx
// 'use client'

// import { useState, useEffect, useMemo } from 'react'
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'
// import { isValidPhoneNumber } from 'libphonenumber-js'
// import { getTimezones, guessBrowserTimezone } from '@/lib/onboarding/timezones'
// import { saveStep1 } from '@/lib/onboarding/actions'

// interface Props {
//   initial: {
//     business_name?: string | null
//     timezone?: string | null
//     owner_whatsapp?: string | null
//     avg_appointment_value?: number | null
//   }
//   billingRegion: string
//   onNext: () => void
// }

// export function Step1BusinessDetails({ initial, billingRegion, onNext }: Props) {
//   const [businessName, setBusinessName] = useState(initial.business_name || '')
//   const [timezone, setTimezone] = useState(initial.timezone || guessBrowserTimezone())
//   const [whatsapp, setWhatsapp] = useState(initial.owner_whatsapp || '')
//   const [avgValue, setAvgValue] = useState(
//     initial.avg_appointment_value ? String(initial.avg_appointment_value) : ''
//   )
//   const [tzSearch, setTzSearch] = useState('')
//   const [tzOpen, setTzOpen] = useState(false)
//   const [saving, setSaving] = useState(false)
//   const [error, setError] = useState('')

//   const allTimezones = useMemo(() => getTimezones(), [])
//   const filteredTz = useMemo(() => {
//     if (!tzSearch) return allTimezones
//     const q = tzSearch.toLowerCase()
//     return allTimezones.filter(
//       (t) => t.value.toLowerCase().includes(q) || t.label.toLowerCase().includes(q)
//     )
//   }, [tzSearch, allTimezones])

//   const currencyLabel = billingRegion === 'pakistan' ? 'PKR' : 'USD'

//   const phoneValid = whatsapp ? isValidPhoneNumber(whatsapp) : false

//   const canSubmit =
//     businessName.trim().length > 0 &&
//     timezone.length > 0 &&
//     phoneValid &&
//     parseFloat(avgValue) > 0

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     if (!canSubmit) return
//     setSaving(true)
//     setError('')
//     const res = await saveStep1({
//       business_name: businessName.trim(),
//       timezone,
//       owner_whatsapp: whatsapp,
//       avg_appointment_value: parseFloat(avgValue),
//     })
//     setSaving(false)
//     if (res.error) {
//       setError(res.error)
//     } else {
//       onNext()
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold text-white">Business Details</h2>

//       {/* Business Name */}
//       <div>
//         <label className="block text-sm font-medium text-zinc-300 mb-1">
//           Business Name
//         </label>
//         <input
//           type="text"
//           value={businessName}
//           onChange={(e) => setBusinessName(e.target.value)}
//           className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
//           placeholder="e.g. Sara's Salon"
//           required
//         />
//         <p className="mt-1 text-xs text-zinc-500">
//           This exact name appears inside every WhatsApp message your customers receive.
//         </p>
//       </div>

//       {/* Timezone */}
//       <div className="relative">
//         <label className="block text-sm font-medium text-zinc-300 mb-1">
//           Timezone
//         </label>
//         <div
//           className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white cursor-pointer flex items-center justify-between"
//           onClick={() => setTzOpen(!tzOpen)}
//         >
//           <span>{allTimezones.find((t) => t.value === timezone)?.label || timezone}</span>
//           <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//         {tzOpen && (
//           <div className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl max-h-60 overflow-hidden">
//             <input
//               type="text"
//               value={tzSearch}
//               onChange={(e) => setTzSearch(e.target.value)}
//               placeholder="Search timezone…"
//               className="w-full bg-zinc-900 border-b border-zinc-700 px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none"
//               autoFocus
//               onClick={(e) => e.stopPropagation()}
//             />
//             <div className="overflow-y-auto max-h-48">
//               {filteredTz.map((t) => (
//                 <button
//                   key={t.value}
//                   type="button"
//                   className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-700 ${
//                     t.value === timezone ? 'text-emerald-400 bg-zinc-700/50' : 'text-zinc-300'
//                   }`}
//                   onClick={() => {
//                     setTimezone(t.value)
//                     setTzOpen(false)
//                     setTzSearch('')
//                   }}
//                 >
//                   {t.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//         <p className="mt-1 text-xs text-zinc-500">
//           Used so reminders show the correct local time.
//         </p>
//       </div>

//       {/* Owner WhatsApp */}
//       <div>
//         <label className="block text-sm font-medium text-zinc-300 mb-1">
//           Owner WhatsApp Number
//         </label>
//         <PhoneInput
//           international
//           defaultCountry="US"
//           value={whatsapp as any}
//           onChange={(v) => setWhatsapp(v || '')}
//           className="phone-input-dark"
//           placeholder="+1 415 555 1234"
//         />
//         <p className="mt-1 text-xs text-zinc-500">
//           This number receives your weekly results report and messages the assistant cannot handle.
//         </p>
//         {whatsapp && !phoneValid && (
//           <p className="mt-1 text-xs text-red-400">Please enter a valid international phone number.</p>
//         )}
//       </div>

//       {/* Average Appointment Value */}
//       <div>
//         <label className="block text-sm font-medium text-zinc-300 mb-1">
//           Average Appointment Value ({currencyLabel})
//         </label>
//         <div className="relative">
//           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
//             {currencyLabel}
//           </span>
//           <input
//             type="number"
//             min="0.01"
//             step="0.01"
//             value={avgValue}
//             onChange={(e) => setAvgValue(e.target.value)}
//             className="w-full rounded-lg bg-zinc-800 border border-zinc-700 pl-16 pr-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
//             placeholder="0.00"
//             required
//           />
//         </div>
//         <p className="mt-1 text-xs text-zinc-500">
//           Used to calculate the revenue we save you each week.
//         </p>
//       </div>

//       {error && <p className="text-sm text-red-400">{error}</p>}

//       <button
//         type="submit"
//         disabled={!canSubmit || saving}
//         className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition-colors"
//       >
//         {saving ? 'Saving…' : 'Continue'}
//       </button>

//       {/* Dark-mode overrides for react-phone-number-input */}
//       <style jsx global>{`
//         .phone-input-dark .PhoneInputCountry {
//           background: #27272a;
//           border-color: #3f3f46;
//           border-radius: 0.5rem 0 0 0.5rem;
//         }
//         .phone-input-dark .PhoneInputInput {
//           background: #27272a;
//           border: 1px solid #3f3f46;
//           border-left: none;
//           border-radius: 0 0.5rem 0.5rem 0;
//           color: white;
//           padding: 0.625rem 1rem;
//           outline: none;
//           width: 100%;
//         }
//         .phone-input-dark .PhoneInputInput:focus {
//           border-color: #10b981;
//         }
//       `}</style>
//     </form>
//   )
// }


// src/app/(app)/onboarding/steps/Step1BusinessDetails.tsx
'use client'

import { useState, useMemo } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { getTimezones, guessBrowserTimezone } from '@/lib/onboarding/timezones'
import { saveStep1 } from '@/lib/onboarding/actions'

interface Props {
  initial: {
    business_name?: string | null
    timezone?: string | null
    owner_whatsapp?: string | null
    team_member_whatsapp?: string | null
    avg_appointment_value?: number | null
  }
  billingRegion: string
  onNext: () => void
}

export function Step1BusinessDetails({ initial, billingRegion, onNext }: Props) {
  const [businessName, setBusinessName] = useState(initial.business_name || '')
  const [timezone, setTimezone] = useState(initial.timezone || guessBrowserTimezone())
  const [ownerWhatsapp, setOwnerWhatsapp] = useState(initial.owner_whatsapp || '')
  const [teamMemberWhatsapp, setTeamMemberWhatsapp] = useState(initial.team_member_whatsapp || '')
  const [avgValue, setAvgValue] = useState(
    initial.avg_appointment_value ? String(initial.avg_appointment_value) : ''
  )
  const [tzSearch, setTzSearch] = useState('')
  const [tzOpen, setTzOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const allTimezones = useMemo(() => getTimezones(), [])
  const filteredTz = useMemo(() => {
    if (!tzSearch) return allTimezones
    const q = tzSearch.toLowerCase()
    return allTimezones.filter(
      (t) => t.value.toLowerCase().includes(q) || t.label.toLowerCase().includes(q)
    )
  }, [tzSearch, allTimezones])

  const currencyLabel = billingRegion === 'pakistan' ? 'PKR' : 'USD'

  const ownerPhoneValid = ownerWhatsapp ? isValidPhoneNumber(ownerWhatsapp) : false
  const teamPhoneValid = teamMemberWhatsapp ? isValidPhoneNumber(teamMemberWhatsapp) : false

  const canSubmit =
    businessName.trim().length > 0 &&
    timezone.length > 0 &&
    ownerPhoneValid &&
    teamPhoneValid &&
    parseFloat(avgValue) > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setSaving(true)
    setError('')
    const res = await saveStep1({
      business_name: businessName.trim(),
      timezone,
      owner_whatsapp: ownerWhatsapp,
      team_member_whatsapp: teamMemberWhatsapp,
      avg_appointment_value: parseFloat(avgValue),
    })
    setSaving(false)
    if (res.error) {
      setError(res.error)
    } else {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white">Business Details</h2>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Business Name
        </label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
          placeholder="e.g. Sara's Salon"
          required
        />
        <p className="mt-1 text-xs text-zinc-500">
          This exact name appears inside every WhatsApp message your customers receive.
        </p>
      </div>

      {/* Timezone */}
      <div className="relative">
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Timezone
        </label>
        <div
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white cursor-pointer flex items-center justify-between"
          onClick={() => setTzOpen(!tzOpen)}
        >
          <span>{allTimezones.find((t) => t.value === timezone)?.label || timezone}</span>
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {tzOpen && (
          <div className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl max-h-60 overflow-hidden">
            <input
              type="text"
              value={tzSearch}
              onChange={(e) => setTzSearch(e.target.value)}
              placeholder="Search timezone…"
              className="w-full bg-zinc-900 border-b border-zinc-700 px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <div className="overflow-y-auto max-h-48">
              {filteredTz.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-700 ${
                    t.value === timezone ? 'text-emerald-400 bg-zinc-700/50' : 'text-zinc-300'
                  }`}
                  onClick={() => {
                    setTimezone(t.value)
                    setTzOpen(false)
                    setTzSearch('')
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <p className="mt-1 text-xs text-zinc-500">
          Used so reminders show the correct local time.
        </p>
      </div>

      {/* ── Owner WhatsApp ── */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Owner WhatsApp Number
        </label>
        <PhoneInput
          international
          defaultCountry="US"
          value={ownerWhatsapp as any}
          onChange={(v) => setOwnerWhatsapp(v || '')}
          className="phone-input-dark"
          placeholder="+1 415 555 1234"
        />
        <p className="mt-1 text-xs text-zinc-500">
          Receives the weekly ROI report and billing alerts.
        </p>
        {ownerWhatsapp && !ownerPhoneValid && (
          <p className="mt-1 text-xs text-red-400">Please enter a valid international phone number.</p>
        )}
      </div>

      {/* ── Team Member WhatsApp ── */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Team Member WhatsApp Number
        </label>
        <PhoneInput
          international
          defaultCountry="US"
          value={teamMemberWhatsapp as any}
          onChange={(v) => setTeamMemberWhatsapp(v || '')}
          className="phone-input-dark"
          placeholder="+1 415 555 5678"
        />
        <p className="mt-1 text-xs text-zinc-500">
          The person who handles customers day-to-day. Receives escalations and messages the assistant cannot handle.
        </p>
        {teamMemberWhatsapp && !teamPhoneValid && (
          <p className="mt-1 text-xs text-red-400">Please enter a valid international phone number.</p>
        )}
      </div>

      {/* Average Appointment Value */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Average Appointment Value ({currencyLabel})
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
            {currencyLabel}
          </span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={avgValue}
            onChange={(e) => setAvgValue(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 pl-16 pr-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            placeholder="0.00"
            required
          />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Used to calculate the revenue we save you each week.
        </p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={!canSubmit || saving}
        className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold transition-colors"
      >
        {saving ? 'Saving…' : 'Continue'}
      </button>

      {/* Dark-mode overrides for react-phone-number-input */}
      <style jsx global>{`
        .phone-input-dark .PhoneInputCountry {
          background: #27272a;
          border-color: #3f3f46;
          border-radius: 0.5rem 0 0 0.5rem;
        }
        .phone-input-dark .PhoneInputInput {
          background: #27272a;
          border: 1px solid #3f3f46;
          border-left: none;
          border-radius: 0 0.5rem 0.5rem 0;
          color: white;
          padding: 0.625rem 1rem;
          outline: none;
          width: 100%;
        }
        .phone-input-dark .PhoneInputInput:focus {
          border-color: #10b981;
        }
      `}</style>
    </form>
  )
}