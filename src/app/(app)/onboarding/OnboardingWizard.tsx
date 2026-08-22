// 'use client'

// import { useState } from 'react'
// import { Step1BusinessDetails } from './steps/Step1BusinessDetails'
// import { Step2GoogleCalendar } from './steps/Step2GoogleCalendar'
// import { Step3ReviewActivate } from './steps/Step3ReviewActivate'
// import { Step4TestFinish } from './steps/Step4TestFinish'

// interface Props {
//   onboarding: any
//   profile: any
//   userEmail: string
//   urlStep?: number
//   gcalConnected: boolean
//   urlError?: string
// }

// export function OnboardingWizard({
//   onboarding,
//   profile,
//   urlStep,
//   gcalConnected,
// }: Props) {
//   const [currentStep, setCurrentStep] = useState<number>(
//     urlStep || onboarding?.current_step || 1
//   )

//   const handleStepTransition = (nextStep: number) => {
//     setCurrentStep(nextStep)
//   }

//   return (
//     <div className="min-h-screen bg-zinc-950 py-12 text-zinc-100 flex flex-col justify-center">
//       <div className="w-full max-w-xl mx-auto px-6">
//         {/* Header Indicator */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-wider mb-2">
//             <span>Progress Progress Bar</span>
//             <span>Step {currentStep} of 4</span>
//           </div>
//           <div className="flex gap-1.5 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
//             {[1, 2, 3, 4].map((s) => (
//               <div
//                 key={s}
//                 className={`h-full flex-1 rounded-full transition-all duration-300 ${
//                   s <= currentStep ? 'bg-emerald-500' : 'bg-zinc-800'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Wizard Steps switcher */}
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
//           {currentStep === 1 && (
//             <Step1BusinessDetails
//               initial={{
//                 business_name: onboarding?.business_name || profile?.business_name,
//                 timezone: onboarding?.timezone,
//                 owner_whatsapp: onboarding?.owner_whatsapp,
//                 avg_appointment_value: onboarding?.avg_appointment_value,
//               }}
//               billingRegion={profile?.billing_region || 'international'}
//               onNext={() => handleStepTransition(2)}
//             />
//           )}

//           {currentStep === 2 && (
//             <Step2GoogleCalendar
//               initial={{
//                 calendar_id: onboarding?.calendar_id,
//                 calendar_connect_method: onboarding?.calendar_connect_method,
//               }}
//               gcalConnected={gcalConnected}
//               onNext={() => handleStepTransition(3)}
//             />
//           )}

//           {currentStep === 3 && (
//             <Step3ReviewActivate
//               data={onboarding || {}}
//               billingRegion={profile?.billing_region || 'international'}
//               onNext={() => handleStepTransition(4)}
//             />
//           )}

//           {currentStep === 4 && (
//             <Step4TestFinish
//               whatsappProvisioned={onboarding?.is_active || false}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



// 'use client'

// import { useState } from 'react'
// import { Step1BusinessDetails } from './steps/Step1BusinessDetails'
// import { Step2GoogleCalendar } from './steps/Step2GoogleCalendar'
// import { Step3WhatsAppNumber } from './steps/Step3WhatsAppNumber'
// import { Step4ReviewActivate } from './steps/Step4ReviewActivate'
// import { Step5TestFinish } from './steps/Step5TestFinish'

// interface Props {
//   onboarding: any
//   profile: any
//   userEmail: string
//   urlStep?: number
//   gcalConnected: boolean
//   urlError?: string
//   whatsappProvisioned: boolean
// }

// export function OnboardingWizard({
//   onboarding,
//   profile,
//   urlStep,
//   gcalConnected,
//   whatsappProvisioned,
// }: Props) {
//   const [currentStep, setCurrentStep] = useState<number>(
//     urlStep || onboarding?.current_step || 1
//   )
//   const go = (n: number) => setCurrentStep(n)

//   return (
//     <div className="min-h-screen bg-zinc-950 py-12 text-zinc-100 flex flex-col justify-center">
//       <div className="w-full max-w-xl mx-auto px-6">
//         <div className="mb-8">
//           <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-wider mb-2">
//             <span>Setup Progress</span>
//             <span>Step {currentStep} of 5</span>
//           </div>
//           <div className="flex gap-1.5 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
//             {[1, 2, 3, 4, 5].map((s) => (
//               <div
//                 key={s}
//                 className={`h-full flex-1 rounded-full transition-all duration-300 ${
//                   s <= currentStep ? 'bg-emerald-500' : 'bg-zinc-800'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
//           {currentStep === 1 && (
//             <Step1BusinessDetails
//               initial={{
//                 business_name: onboarding?.business_name || profile?.business_name,
//                 timezone: onboarding?.timezone,
//                 owner_whatsapp: onboarding?.owner_whatsapp,
//                 team_member_whatsapp: onboarding?.team_member_whatsapp,
//                 avg_appointment_value: onboarding?.avg_appointment_value,
//               }}
//               billingRegion={profile?.billing_region || 'international'}
//               onNext={() => go(2)}
//             />
//           )}
//           {currentStep === 2 && (
//             <Step2GoogleCalendar
//               initial={{
//                 calendar_id: onboarding?.calendar_id,
//                 calendar_connect_method: onboarding?.calendar_connect_method,
//               }}
//               gcalConnected={gcalConnected}
//               onNext={() => go(3)}
//             />
//           )}
//           {currentStep === 3 && (
//             <Step3WhatsAppNumber
//               initial={{
//                 phone_option: onboarding?.phone_option,
//                 phone_number: onboarding?.phone_number,
//                 phone_country: onboarding?.phone_country,
//                 phone_area_code: onboarding?.phone_area_code,
//                 phone_auth_confirmed: onboarding?.phone_auth_confirmed,
//               }}
//               onNext={() => go(4)}
//             />
//           )}
//           {currentStep === 4 && (
//             <Step4ReviewActivate
//               data={onboarding || {}}
//               billingRegion={profile?.billing_region || 'international'}
//               onNext={() => go(5)}
//             />
//           )}
//           {currentStep === 5 && (
//             <Step5TestFinish whatsappProvisioned={whatsappProvisioned} />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


// 'use client'

// import { useState } from 'react'
// import { Step1BusinessDetails } from './steps/Step1BusinessDetails'
// import { Step2GoogleCalendar } from './steps/Step2GoogleCalendar'
// import { Step3ConnectWhatsApp } from './steps/Step3ConnectWhatsapp'
// import { Step4BusinessHours } from './steps/Step4BusinessHours'
// import { Step5ReminderTiming } from './steps/Step5ReminderTiming'
// import { Step6Services } from './steps/Step6Services'
// import { Step7ToneLanguage } from './steps/Step7ToneLanguage'
// import { Step8ReviewFinish } from './steps/Step8ReviewFinish'

// export function OnboardingWizard({ onboarding, profile, urlStep, gcalConnected }: any) {
//   const [step, setStep] = useState<number>(urlStep || onboarding?.current_step || 1)
//   const currency = profile?.billing_region === 'pakistan' ? 'PKR' : 'USD'

//   return (
//     <div className="min-h-screen bg-zinc-950 py-12 text-zinc-100 flex flex-col justify-center">
//       <div className="w-full max-w-xl mx-auto px-6">
//         <div className="mb-8">
//           <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-wider mb-2">
//             <span>Setup Progress</span><span>Step {step} of 8</span>
//           </div>
//           <div className="flex gap-1.5 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
//             {[1,2,3,4,5,6,7,8].map((s) => (
//               <div key={s} className={`h-full flex-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-coral' : 'bg-zinc-800'}`} />
//             ))}
//           </div>
//         </div>

//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
//           {step === 1 && (
//             <Step1BusinessDetails
//               initial={{
//                 business_name: onboarding?.business_name || profile?.business_name,
//                 timezone: onboarding?.timezone,
//                 owner_whatsapp: onboarding?.owner_whatsapp,
//                 team_member_whatsapp: onboarding?.team_member_whatsapp,
//                 avg_appointment_value: onboarding?.avg_appointment_value,
//               }}
//               billingRegion={profile?.billing_region || 'international'}
//               onNext={() => setStep(2)}
//             />
//           )}
//           {step === 2 && (
//             <Step2GoogleCalendar
//               initial={{ calendar_id: onboarding?.calendar_id, calendar_connect_method: onboarding?.calendar_connect_method }}
//               gcalConnected={gcalConnected}
//               onNext={() => setStep(3)}
//             />
//           )}
//           {step === 3 && <Step3ConnectWhatsApp initial={onboarding || {}} onNext={() => setStep(4)} />}
//           {step === 4 && <Step4BusinessHours initial={onboarding?.business_hours} onNext={() => setStep(5)} />}
//           {step === 5 && <Step5ReminderTiming initial={onboarding?.reminder_timing} onNext={() => setStep(6)} />}
//           {step === 6 && <Step6Services initial={onboarding?.services_draft} currency={currency} onNext={() => setStep(7)} />}
//           {step === 7 && (
//             <Step7ToneLanguage
//               initial={{ tone: onboarding?.tone, language: onboarding?.language, sign_off: onboarding?.sign_off }}
//               businessName={onboarding?.business_name}
//               onNext={() => setStep(8)}
//             />
//           )}
//           {step === 8 && <Step8ReviewFinish data={onboarding || {}} billingRegion={profile?.billing_region || 'international'} />}
//         </div>
//       </div>
//     </div>
//   )
// }



'use client'

import { useState } from 'react'
import { Step1BusinessDetails } from './steps/Step1BusinessDetails'
import { Step2GoogleCalendar } from './steps/Step2GoogleCalendar'
import { Step3ConnectWhatsApp } from './steps/Step3ConnectWhatsapp'
import { Step4BusinessHours } from './steps/Step4BusinessHours'
import { Step5ReminderTiming } from './steps/Step5ReminderTiming'
import { Step6Services } from './steps/Step6Services'
import { Step7ToneLanguage } from './steps/Step7ToneLanguage'
import { Step8ReviewFinish } from './steps/Step8ReviewFinish'

export function OnboardingWizard({ onboarding, profile, urlStep, gcalConnected }: any) {
  const [step, setStep] = useState<number>(urlStep || onboarding?.current_step || 1)
  const currency = profile?.billing_region === 'pakistan' ? 'PKR' : 'USD'

  return (
    <div className="min-h-screen bg-zinc-950 py-12 text-zinc-100 flex flex-col justify-center">
      <div className="w-full max-w-xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-wider mb-2">
            <span>Setup Progress</span><span>Step {step} of 8</span>
          </div>
          <div className="flex gap-1.5 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            {[1,2,3,4,5,6,7,8].map((s) => (
              <div key={s} className={`h-full flex-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-coral' : 'bg-zinc-800'}`} />
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
          {step === 1 && (
            <Step1BusinessDetails
              initial={{
                business_name: onboarding?.business_name || profile?.business_name,
                timezone: onboarding?.timezone,
                owner_whatsapp: onboarding?.owner_whatsapp,
                team_member_whatsapp: onboarding?.team_member_whatsapp,
                avg_appointment_value: onboarding?.avg_appointment_value,
              }}
              billingRegion={profile?.billing_region || 'international'}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2GoogleCalendar
              initial={{ calendar_id: onboarding?.calendar_id, calendar_connect_method: onboarding?.calendar_connect_method }}
              gcalConnected={gcalConnected}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && <Step3ConnectWhatsApp initial={onboarding || {}} onNext={() => setStep(4)} />}
          {step === 4 && <Step4BusinessHours initial={onboarding?.business_hours} onNext={() => setStep(5)} />}
          {step === 5 && <Step5ReminderTiming initial={onboarding?.reminder_timing} onNext={() => setStep(6)} />}
          {step === 6 && <Step6Services initial={onboarding?.services_draft} currency={currency} onNext={() => setStep(7)} />}
          {step === 7 && (
            <Step7ToneLanguage
              initial={{ tone: onboarding?.tone, language: onboarding?.language, sign_off: onboarding?.sign_off }}
              businessName={onboarding?.business_name}
              onNext={() => setStep(8)}
            />
          )}
          {step === 8 && <Step8ReviewFinish data={onboarding || {}} billingRegion={profile?.billing_region || 'international'} />}
        </div>
      </div>
    </div>
  )
}