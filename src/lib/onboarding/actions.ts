// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
// import { encrypt } from './encryption'
// import type { Step1Input, Step2Input } from './types'

// export async function saveStep1(data: Step1Input) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .upsert(
//       {
//         user_id: user.id,
//         current_step: 2,
//         business_name: data.business_name,
//         timezone: data.timezone,
//         owner_whatsapp: data.owner_whatsapp,
//         avg_appointment_value: data.avg_appointment_value,
//         updated_at: new Date().toISOString(),
//       },
//       { onConflict: 'user_id' }
//     )

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function saveStep2(data: Step2Input) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const update: Record<string, unknown> = {
//     user_id: user.id,
//     current_step: 3,
//     calendar_id: data.calendar_id,
//     calendar_connect_method: data.calendar_connect_method,
//     updated_at: new Date().toISOString(),
//   }

//   if (data.calendar_refresh_token) {
//     update.calendar_refresh_token_enc = encrypt(data.calendar_refresh_token)
//   }

//   const { error } = await supabase
//     .from('onboarding')
//     .upsert(update, { onConflict: 'user_id' })

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function activateOnboarding() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error: updateErr } = await supabase
//     .from('onboarding')
//     .update({
//       current_step: 4,
//       is_active: true,
//       activated_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq('user_id', user.id)

//   if (updateErr) return { error: updateErr.message }

//   const { data: row } = await supabase
//     .from('onboarding')
//     .select('*')
//     .eq('user_id', user.id)
//     .single()

//   const webhookUrl = process.env.ONBOARDING_WEBHOOK_URL
//   if (webhookUrl && row) {
//     fetch(webhookUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         event: 'onboarding_activated',
//         user_id: user.id,
//         email: user.email,
//         business_name: row.business_name,
//         calendar_id: row.calendar_id,
//         timezone: row.timezone,
//         owner_whatsapp: row.owner_whatsapp,
//         avg_appointment_value: row.avg_appointment_value,
//         calendar_connect_method: row.calendar_connect_method,
//       }),
//     }).catch(() => {}) 
//   }

//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function completeOnboarding() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .update({
//       completed_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq('user_id', user.id)

//   if (error) return { error: error.message }
  
//   redirect('/app/dashboard')
// }

// export async function goToStep(step: number) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .update({ current_step: step, updated_at: new Date().toISOString() })
//     .eq('user_id', user.id)

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }


// // src/lib/onboarding/actions.ts
// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
// import { encrypt } from './encryption'
// import type { Step1Input, Step2Input } from './types'

// export async function saveStep1(data: Step1Input) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .upsert(
//       {
//         user_id: user.id,
//         current_step: 2,
//         business_name: data.business_name,
//         timezone: data.timezone,
//         owner_whatsapp: data.owner_whatsapp,
//         team_member_whatsapp: data.team_member_whatsapp,
//         avg_appointment_value: data.avg_appointment_value,
//         updated_at: new Date().toISOString(),
//       },
//       { onConflict: 'user_id' }
//     )

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function saveStep2(data: Step2Input) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const update: Record<string, unknown> = {
//     user_id: user.id,
//     current_step: 3,
//     calendar_id: data.calendar_id,
//     calendar_connect_method: data.calendar_connect_method,
//     updated_at: new Date().toISOString(),
//   }

//   if (data.calendar_refresh_token) {
//     update.calendar_refresh_token_enc = encrypt(data.calendar_refresh_token)
//   }

//   const { error } = await supabase
//     .from('onboarding')
//     .upsert(update, { onConflict: 'user_id' })

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function activateOnboarding() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error: updateErr } = await supabase
//     .from('onboarding')
//     .update({
//       current_step: 4,
//       is_active: true,
//       activated_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq('user_id', user.id)

//   if (updateErr) return { error: updateErr.message }

//   const { data: row } = await supabase
//     .from('onboarding')
//     .select('*')
//     .eq('user_id', user.id)
//     .single()

//   const webhookUrl = process.env.ONBOARDING_WEBHOOK_URL
//   if (webhookUrl && row) {
//     fetch(webhookUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         event: 'onboarding_activated',
//         user_id: user.id,
//         email: user.email,
//         business_name: row.business_name,
//         calendar_id: row.calendar_id,
//         timezone: row.timezone,
//         owner_whatsapp: row.owner_whatsapp,
//         team_member_whatsapp: row.team_member_whatsapp,
//         avg_appointment_value: row.avg_appointment_value,
//         calendar_connect_method: row.calendar_connect_method,
//       }),
//     }).catch(() => {})
//   }

//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function completeOnboarding() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .update({
//       completed_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq('user_id', user.id)

//   if (error) return { error: error.message }

//   redirect('/app/dashboard')
// }

// export async function goToStep(step: number) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .update({ current_step: step, updated_at: new Date().toISOString() })
//     .eq('user_id', user.id)

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// // src/lib/onboarding/actions.ts
// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
// import { encrypt } from './encryption'
// import type { Step1Input, Step2Input } from './types'

// export async function saveStep1(data: Step1Input) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .upsert(
//       {
//         user_id: user.id,
//         current_step: 2,
//         business_name: data.business_name,
//         timezone: data.timezone,
//         owner_whatsapp: data.owner_whatsapp,
//         team_member_whatsapp: data.team_member_whatsapp,
//         avg_appointment_value: data.avg_appointment_value,
//         updated_at: new Date().toISOString(),
//       },
//       { onConflict: 'user_id' }
//     )

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function saveStep2(data: Step2Input) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const update: Record<string, unknown> = {
//     user_id: user.id,
//     current_step: 3,
//     calendar_id: data.calendar_id,
//     calendar_connect_method: data.calendar_connect_method,
//     updated_at: new Date().toISOString(),
//   }

//   if (data.calendar_refresh_token) {
//     update.calendar_refresh_token_enc = encrypt(data.calendar_refresh_token)
//   }

//   const { error } = await supabase
//     .from('onboarding')
//     .upsert(update, { onConflict: 'user_id' })

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function activateOnboarding() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error: updateErr } = await supabase
//     .from('onboarding')
//     .update({
//       current_step: 4,
//       is_active: true,
//       activated_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq('user_id', user.id)

//   if (updateErr) return { error: updateErr.message }

//   const { data: row } = await supabase
//     .from('onboarding')
//     .select('*')
//     .eq('user_id', user.id)
//     .single()

//   if (row) {
//     // Find or create the business record
//     let businessId: string | null = null

//     const { data: existingBiz } = await supabase
//       .from('businesses')
//       .select('id')
//       .eq('user_id', user.id)
//       .maybeSingle()

//     if (existingBiz) {
//       businessId = existingBiz.id
//       // Update business name in case it changed
//       await supabase
//         .from('businesses')
//         .update({ name: row.business_name || 'My Business' })
//         .eq('id', businessId)
//     } else {
//       const { data: newBiz } = await supabase
//         .from('businesses')
//         .insert({
//           user_id: user.id,
//           name: row.business_name || 'My Business',
//         })
//         .select('id')
//         .single()
//       businessId = newBiz?.id || null
//     }

//     // Create or update reminder_settings for this business
//     if (businessId) {
//       await supabase
//         .from('reminder_settings')
//         .upsert(
//           {
//             business_id: businessId,
//             owner_whatsapp: row.owner_whatsapp,
//             team_member_whatsapp: row.team_member_whatsapp,
//             avg_appointment_value: row.avg_appointment_value,
//             updated_at: new Date().toISOString(),
//           },
//           { onConflict: 'business_id' }
//         )
//     }

//     // Notify external webhook if configured
//     const webhookUrl = process.env.ONBOARDING_WEBHOOK_URL
//     if (webhookUrl) {
//       fetch(webhookUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           event: 'onboarding_activated',
//           user_id: user.id,
//           email: user.email,
//           business_name: row.business_name,
//           calendar_id: row.calendar_id,
//           timezone: row.timezone,
//           owner_whatsapp: row.owner_whatsapp,
//           team_member_whatsapp: row.team_member_whatsapp,
//           avg_appointment_value: row.avg_appointment_value,
//           calendar_connect_method: row.calendar_connect_method,
//         }),
//       }).catch(() => {})
//     }
//   }

//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function completeOnboarding() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .update({
//       completed_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq('user_id', user.id)

//   if (error) return { error: error.message }

//   redirect('/app/dashboard')
// }

// export async function goToStep(step: number) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   const { error } = await supabase
//     .from('onboarding')
//     .update({ current_step: step, updated_at: new Date().toISOString() })
//     .eq('user_id', user.id)

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }



// // src/lib/onboarding/actions.ts  (FULL REPLACEMENT — writes to `clients`, not `onboarding`)
// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { isValidPhoneNumber } from 'libphonenumber-js'
// import { createClient } from '@/lib/supabase/server'
// import { encrypt } from './encryption'
// import { triggerN8n } from '@/lib/n8n'
// import type { Step1Input, Step2Input, Step3PhoneInput, PhoneProvisioning } from './types'

// async function requireUser() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')
//   return { supabase, user }
// }

// export async function saveStep1(data: Step1Input) {
//   const { supabase, user } = await requireUser()

//   const { error } = await supabase.from('clients').upsert(
//     {
//       id: user.id,
//       current_step: 2,
//       business_name: data.business_name,
//       timezone: data.timezone,
//       owner_whatsapp: data.owner_whatsapp,
//       handoff_whatsapp: data.team_member_whatsapp,
//       avg_appointment_value: data.avg_appointment_value,
//       updated_at: new Date().toISOString(),
//     },
//     { onConflict: 'id' }
//   )

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function saveStep2(data: Step2Input) {
//   const { supabase, user } = await requireUser()

//   const update: Record<string, unknown> = {
//     id: user.id,
//     current_step: 3,
//     calendar_id: data.calendar_id,
//     calendar_connect_method: data.calendar_connect_method,
//     updated_at: new Date().toISOString(),
//   }
//   if (data.calendar_refresh_token) {
//     update.calendar_refresh_token_enc = encrypt(data.calendar_refresh_token)
//   }

//   const { error } = await supabase.from('clients').upsert(update, { onConflict: 'id' })
//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function saveStep3Phone(data: Step3PhoneInput) {
//   const { supabase, user } = await requireUser()

//   if (data.option === 'client_sim' || data.option === 'landline') {
//     if (!data.phone_number || !isValidPhoneNumber(data.phone_number)) {
//       return { error: 'Please enter a valid number in international format.' }
//     }
//   }
//   if (data.option === 'agency_virtual') {
//     if (!data.country) return { error: 'Please choose a country for your number.' }
//     if (!data.authorization_confirmed) {
//       return { error: 'Please confirm the authorization so we can procure the number for you.' }
//     }
//   }

//   const provisioning: PhoneProvisioning = {
//     option: data.option,
//     phone_number: data.phone_number ?? null,
//     country: data.country ?? null,
//     area_code: data.area_code ?? null,
//     authorization_confirmed: data.option === 'agency_virtual' ? true : undefined,
//     submitted_at: new Date().toISOString(),
//   }

//   const { error } = await supabase.from('clients').upsert(
//     {
//       id: user.id,
//       current_step: 4,
//       phone_provisioning: provisioning,
//       updated_at: new Date().toISOString(),
//     },
//     { onConflict: 'id' }
//   )

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function activateOnboarding() {
//   const { supabase, user } = await requireUser()

//   const { error: updateErr } = await supabase
//     .from('clients')
//     .update({
//       current_step: 5,
//       is_active: true,
//       activated_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq('id', user.id)

//   if (updateErr) return { error: updateErr.message }

//   const { data: row } = await supabase.from('clients').select('*').eq('id', user.id).single()

//   // Ops notification — n8n emails/Slacks the team so YOU register the number (doc §3)
//   if (row) {
//     triggerN8n('onboarding-activated', {
//       client_id: user.id,
//       email: user.email,
//       business_name: row.business_name,
//       timezone: row.timezone,
//       owner_whatsapp: row.owner_whatsapp,
//       handoff_whatsapp: row.handoff_whatsapp,
//       avg_appointment_value: row.avg_appointment_value,
//       calendar_id: row.calendar_id,
//       phone_provisioning: row.phone_provisioning,
//     }).catch(() => {})
//   }

//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function completeOnboarding() {
//   const { supabase, user } = await requireUser()

//   const { error } = await supabase
//     .from('clients')
//     .update({ completed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
//     .eq('id', user.id)

//   if (error) return { error: error.message }
//   redirect('/app/dashboard')
// }

// export async function goToStep(step: number) {
//   const { supabase, user } = await requireUser()

//   const { error } = await supabase
//     .from('clients')
//     .update({ current_step: step, updated_at: new Date().toISOString() })
//     .eq('id', user.id)

//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }


// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
// import { encrypt } from './encryption'
// import { triggerN8n } from '@/lib/n8n'
// import type {
//   Step1Input, Step2Input, AssistedNumberInput,
//   Step4HoursInput, Step5TimingInput, Step6ServicesInput, Step7ToneInput,
// } from './types'

// async function authed() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/login')
//   return { supabase, user }
// }

// async function saveOnboarding(supabase: any, userId: string, fields: Record<string, unknown>) {
//   const { error } = await supabase.from('onboarding').upsert(
//     { user_id: userId, ...fields, updated_at: new Date().toISOString() },
//     { onConflict: 'user_id' }
//   )
//   if (error) return { error: error.message }
//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function saveStep1(data: Step1Input) {
//   const { supabase, user } = await authed()
//   return saveOnboarding(supabase, user.id, {
//     current_step: 2,
//     business_name: data.business_name,
//     timezone: data.timezone,
//     owner_whatsapp: data.owner_whatsapp,
//     team_member_whatsapp: data.team_member_whatsapp,
//     avg_appointment_value: data.avg_appointment_value,
//   })
// }

// export async function saveStep2(data: Step2Input) {
//   const { supabase, user } = await authed()
//   const fields: Record<string, unknown> = {
//     current_step: 3,
//     calendar_id: data.calendar_id,
//     calendar_connect_method: data.calendar_connect_method,
//   }
//   if (data.calendar_refresh_token) fields.calendar_refresh_token_enc = encrypt(data.calendar_refresh_token)
//   return saveOnboarding(supabase, user.id, fields)
// }

// /* ── Step 3a: Embedded Signup success → hand code to the connection service ── */
// export async function connectWhatsAppEmbedded(input: { code: string; waba_id: string; phone_number_id: string }) {
//   const { supabase, user } = await authed()

//   let displayName: string | null = null
//   let displayNumber: string | null = null

//   if (process.env.WHATSAPP_CONNECT_MOCK === 'true') {
//     // DEV ONLY — lets you test the UI without the connection service
//     displayName = 'Test Business'
//     displayNumber = '+1 555 000 0000'
//   } else {
//     try {
//       const res = await triggerN8n('whatsapp-connect', {
//         client_id: user.id,
//         code: input.code,
//         waba_id: input.waba_id,
//         phone_number_id: input.phone_number_id,
//       })
//       displayName = res?.verified_name ?? null
//       displayNumber = res?.display_phone_number ?? null
//     } catch {
//       return { error: 'Connection service unavailable. Please try again in a moment.' }
//     }
//   }

//   const res = await saveOnboarding(supabase, user.id, {
//     current_step: 4,
//     waba_id: input.waba_id,
//     whatsapp_phone_number_id: input.phone_number_id,
//     whatsapp_display_name: displayName,
//     whatsapp_number: displayNumber,
//     whatsapp_status: 'connected',
//   })
//   return { ...res, display_name: displayName, number: displayNumber }
// }

// /* ── Step 3b: assisted path — client can't arrange a number (paid add-on) ── */
// export async function saveAssistedNumber(data: AssistedNumberInput) {
//   const { supabase, user } = await authed()
//   if (data.phone_option === 'agency_virtual') {
//     if (!data.phone_country) return { error: 'Please choose a country.' }
//     if (!data.phone_auth_confirmed) return { error: 'Please confirm the authorization checkbox.' }
//   } else if (!data.phone_number || !/^\+\d{10,15}$/.test(data.phone_number)) {
//     return { error: 'Please enter a valid number in international format (e.g. +14155551234).' }
//   }
//   return saveOnboarding(supabase, user.id, {
//     current_step: 4,
//     phone_option: data.phone_option,
//     phone_number: data.phone_number ?? null,
//     phone_country: data.phone_country ?? null,
//     phone_area_code: data.phone_area_code ?? null,
//     phone_auth_confirmed: data.phone_auth_confirmed ?? false,
//     whatsapp_status: 'pending',
//   })
// }

// export async function disconnectWhatsApp() {
//   const { supabase, user } = await authed()
//   triggerN8n('whatsapp-disconnect', { client_id: user.id }).catch(() => {})
//   await supabase.from('clients').update({
//     whatsapp_status: 'not_connected', updated_at: new Date().toISOString(),
//   }).eq('id', user.id)
//   return saveOnboarding(supabase, user.id, {
//     whatsapp_status: 'not_connected',
//     waba_id: null, whatsapp_phone_number_id: null,
//     whatsapp_display_name: null, whatsapp_number: null,
//   })
// }

// export async function saveStep4Hours(data: Step4HoursInput) {
//   const { supabase, user } = await authed()
//   return saveOnboarding(supabase, user.id, { current_step: 5, business_hours: data.business_hours })
// }

// export async function saveStep5Timing(data: Step5TimingInput) {
//   const { supabase, user } = await authed()
//   const t = data.reminder_timing
//   if (!t.r1.enabled && !t.r2.enabled && !t.r3.enabled)
//     return { error: 'Enable at least one reminder.' }
//   return saveOnboarding(supabase, user.id, { current_step: 6, reminder_timing: t })
// }

// export async function saveStep6Services(data: Step6ServicesInput) {
//   const { supabase, user } = await authed()
//   const clean = data.services.filter((s) => s.name.trim() && s.price >= 0)
//   if (clean.length === 0) return { error: 'Add at least one service.' }
//   return saveOnboarding(supabase, user.id, { current_step: 7, services_draft: clean })
// }

// export async function saveStep7Tone(data: Step7ToneInput) {
//   const { supabase, user } = await authed()
//   return saveOnboarding(supabase, user.id, {
//     current_step: 8, tone: data.tone, language: data.language, sign_off: data.sign_off,
//   })
// }

// export async function activateOnboarding() {
//   const { supabase, user } = await authed()

//   const { error: stepErr } = await supabase.from('onboarding').update({
//     is_active: true, activated_at: new Date().toISOString(), updated_at: new Date().toISOString(),
//   }).eq('user_id', user.id)
//   if (stepErr) return { error: stepErr.message }

//   const { data: row } = await supabase.from('onboarding').select('*').eq('user_id', user.id).single()
//   const { data: profile } = await supabase.from('profiles')
//     .select('subscription_status').eq('id', user.id).single()

//   if (row) {
//     const clientRow: Record<string, unknown> = {
//       id: user.id,
//       business_name: row.business_name,
//       timezone: row.timezone ?? 'UTC',
//       calendar_id: row.calendar_id,
//       calendar_connect_method: row.calendar_connect_method,
//       owner_whatsapp: row.owner_whatsapp,
//       handoff_whatsapp: row.team_member_whatsapp,
//       avg_appointment_value: row.avg_appointment_value ?? 0,
//       subscription_status: profile?.subscription_status ?? 'inactive',
//       business_hours: row.business_hours ?? {},
//       reminder_timing: row.reminder_timing ?? undefined,
//       tone: row.tone ?? 'friendly',
//       language: row.language ?? 'en',
//       sign_off: row.sign_off ?? null,
//       whatsapp_status: row.whatsapp_status ?? 'not_connected',
//       phone_provisioning: row.phone_option ? {
//         option: row.phone_option, phone_number: row.phone_number,
//         country: row.phone_country, area_code: row.phone_area_code,
//         authorization_confirmed: row.phone_auth_confirmed,
//       } : null,
//       activated_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     }
//     // Only overwrite WhatsApp connection fields if the wizard actually collected them
//     if (row.waba_id) clientRow.waba_id = row.waba_id
//     if (row.whatsapp_phone_number_id) clientRow.whatsapp_phone_number_id = row.whatsapp_phone_number_id
//     if (row.whatsapp_display_name) clientRow.whatsapp_display_name = row.whatsapp_display_name
//     if (row.whatsapp_number) clientRow.whatsapp_number = row.whatsapp_number

//     const { error: clientErr } = await supabase.from('clients').upsert(clientRow, { onConflict: 'id' })
//     if (clientErr) return { error: clientErr.message }

//     // Services draft → real rows
//     const draft = Array.isArray(row.services_draft) ? row.services_draft : []
//     await supabase.from('services').delete().eq('client_id', user.id)
//     if (draft.length) {
//       await supabase.from('services').insert(
//         draft.map((s: any) => ({
//           client_id: user.id, name: s.name, price: s.price,
//           duration_minutes: s.duration_minutes ?? null,
//         }))
//       )
//     }

//     triggerN8n('client-intake', {
//       client_id: user.id, email: user.email, business_name: row.business_name,
//     }).catch(() => {})
//   }

//   revalidatePath('/onboarding')
//   return { success: true }
// }

// export async function completeOnboarding() {
//   const { supabase, user } = await authed()
//   const now = new Date().toISOString()
//   await supabase.from('onboarding')
//     .update({ completed_at: now, updated_at: now }).eq('user_id', user.id)
//   await supabase.from('clients')
//     .update({ onboarding_completed_at: now, updated_at: now }).eq('id', user.id)
//   redirect('/app/dashboard')
// }

// export async function goToStep(step: number) {
//   const { supabase, user } = await authed()
//   return saveOnboarding(supabase, user.id, { current_step: step })
// }


'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { encrypt } from './encryption'
import { triggerN8n } from '@/lib/n8n'
import type {
  Step1Input,
  Step2Input,
  AssistedNumberInput,
  Step4HoursInput,
  Step5TimingInput,
  Step6ServicesInput,
  Step7ToneInput,
} from './types'

/* ── helpers ── */

async function authed() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return { supabase, user }
}

/**
 * Writes wizard progress to `onboarding`.
 * RLS allows users to write their own onboarding row, so the normal client is fine here.
 */
async function saveOnboarding(
  supabase: any,
  userId: string,
  fields: Record<string, unknown>
) {
  const { error } = await supabase.from('onboarding').upsert(
    { user_id: userId, ...fields, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  )
  if (error) return { error: error.message }
  revalidatePath('/onboarding')
  return { success: true }
}

/* ── Step 1 · Business details ── */

export async function saveStep1(data: Step1Input) {
  const { supabase, user } = await authed()
  return saveOnboarding(supabase, user.id, {
    current_step: 2,
    business_name: data.business_name,
    timezone: data.timezone,
    owner_whatsapp: data.owner_whatsapp,
    team_member_whatsapp: data.team_member_whatsapp,
    avg_appointment_value: data.avg_appointment_value,
  })
}

/* ── Step 2 · Google Calendar ── */

export async function saveStep2(data: Step2Input) {
  const { supabase, user } = await authed()
  const fields: Record<string, unknown> = {
    current_step: 3,
    calendar_id: data.calendar_id,
    calendar_connect_method: data.calendar_connect_method,
  }
  if (data.calendar_refresh_token) {
    fields.calendar_refresh_token_enc = encrypt(data.calendar_refresh_token)
  }
  return saveOnboarding(supabase, user.id, fields)
}

/* ── Step 3a · Connect WhatsApp (official sign-up flow) ── */

export async function connectWhatsAppEmbedded(input: {
  code: string
  waba_id: string
  phone_number_id: string
}) {
  const { supabase, user } = await authed()

  let displayName: string | null = null
  let displayNumber: string | null = null

  if (process.env.WHATSAPP_CONNECT_MOCK === 'true') {
    // DEV ONLY — lets you test the Step 3 UI without the connection service.
    displayName = 'Test Business'
    displayNumber = '+1 555 000 0000'
  } else {
    try {
      const res = await triggerN8n('whatsapp-connect', {
        client_id: user.id,
        code: input.code,
        waba_id: input.waba_id,
        phone_number_id: input.phone_number_id,
      })
      displayName = res?.verified_name ?? null
      displayNumber = res?.display_phone_number ?? null
    } catch {
      return { error: 'Connection service unavailable. Please try again in a moment.' }
    }
  }

  const res = await saveOnboarding(supabase, user.id, {
    current_step: 4,
    waba_id: input.waba_id,
    whatsapp_phone_number_id: input.phone_number_id,
    whatsapp_display_name: displayName,
    whatsapp_number: displayNumber,
    whatsapp_status: 'connected',
  })
  return { ...res, display_name: displayName, number: displayNumber }
}

/* ── Step 3b · Assisted number (paid add-on fallback) ── */

export async function saveAssistedNumber(data: AssistedNumberInput) {
  const { supabase, user } = await authed()

  if (data.phone_option === 'agency_virtual') {
    if (!data.phone_country) return { error: 'Please choose a country.' }
    if (!data.phone_auth_confirmed)
      return { error: 'Please confirm the authorization checkbox.' }
  } else if (!data.phone_number || !/^\+\d{10,15}$/.test(data.phone_number)) {
    return {
      error: 'Please enter a valid number in international format (e.g. +14155551234).',
    }
  }

  return saveOnboarding(supabase, user.id, {
    current_step: 4,
    phone_option: data.phone_option,
    phone_number: data.phone_number ?? null,
    phone_country: data.phone_country ?? null,
    phone_area_code: data.phone_area_code ?? null,
    phone_auth_confirmed: data.phone_auth_confirmed ?? false,
    whatsapp_status: 'pending',
  })
}

/* ── Step 3 · Disconnect ── */

export async function disconnectWhatsApp() {
  const { supabase, user } = await authed()

  // Best-effort: tell the engine to stop serving this line.
  triggerN8n('whatsapp-disconnect', { client_id: user.id }).catch(() => {})

  // clients.* is service-role-only after the RLS lockdown.
  await createServiceClient()
    .from('clients')
    .update({ whatsapp_status: 'not_connected', updated_at: new Date().toISOString() })
    .eq('id', user.id)

  return saveOnboarding(supabase, user.id, {
    whatsapp_status: 'not_connected',
    waba_id: null,
    whatsapp_phone_number_id: null,
    whatsapp_display_name: null,
    whatsapp_number: null,
  })
}

/* ── Step 4 · Business hours ── */

export async function saveStep4Hours(data: Step4HoursInput) {
  const { supabase, user } = await authed()
  return saveOnboarding(supabase, user.id, {
    current_step: 5,
    business_hours: data.business_hours,
  })
}

/* ── Step 5 · Reminder timing ── */

export async function saveStep5Timing(data: Step5TimingInput) {
  const { supabase, user } = await authed()
  const t = data.reminder_timing
  if (!t.r1.enabled && !t.r2.enabled && !t.r3.enabled) {
    return { error: 'Enable at least one reminder.' }
  }
  return saveOnboarding(supabase, user.id, { current_step: 6, reminder_timing: t })
}

/* ── Step 6 · Services & prices (kept as draft until activation) ── */

export async function saveStep6Services(data: Step6ServicesInput) {
  const { supabase, user } = await authed()
  const clean = data.services.filter((s) => s.name.trim() && s.price >= 0)
  if (clean.length === 0) return { error: 'Add at least one service.' }
  return saveOnboarding(supabase, user.id, { current_step: 7, services_draft: clean })
}

/* ── Step 7 · Tone & language ── */

export async function saveStep7Tone(data: Step7ToneInput) {
  const { supabase, user } = await authed()
  return saveOnboarding(supabase, user.id, {
    current_step: 8,
    tone: data.tone,
    language: data.language,
    sign_off: data.sign_off,
  })
}

/* ── Step 8 · Activate: write the account record (single source of truth) ── */

export async function activateOnboarding() {
  const { supabase, user } = await authed()

  const { error: stepErr } = await supabase
    .from('onboarding')
    .update({
      is_active: true,
      activated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
  if (stepErr) return { error: stepErr.message }

  const { data: row } = await supabase
    .from('onboarding')
    .select('*')
    .eq('user_id', user.id)
    .single()
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  if (row) {
    const clientRow: Record<string, unknown> = {
      id: user.id,
      business_name: row.business_name,
      timezone: row.timezone ?? 'UTC',
      calendar_id: row.calendar_id,
      calendar_connect_method: row.calendar_connect_method,
      owner_whatsapp: row.owner_whatsapp,
      handoff_whatsapp: row.team_member_whatsapp,
      avg_appointment_value: row.avg_appointment_value ?? 0,
      subscription_status: profile?.subscription_status ?? 'inactive',
      business_hours: row.business_hours ?? {},
      tone: row.tone ?? 'friendly',
      language: row.language ?? 'en',
      sign_off: row.sign_off ?? null,
      whatsapp_status: row.whatsapp_status ?? 'not_connected',
      phone_provisioning: row.phone_option
        ? {
            option: row.phone_option,
            phone_number: row.phone_number,
            country: row.phone_country,
            area_code: row.phone_area_code,
            authorization_confirmed: row.phone_auth_confirmed,
          }
        : null,
      activated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    if (row.reminder_timing) clientRow.reminder_timing = row.reminder_timing
    // Only overwrite connection fields if the wizard actually collected them —
    // never wipe a live connection on a re-run of the wizard.
    if (row.waba_id) clientRow.waba_id = row.waba_id
    if (row.whatsapp_phone_number_id)
      clientRow.whatsapp_phone_number_id = row.whatsapp_phone_number_id
    if (row.whatsapp_display_name)
      clientRow.whatsapp_display_name = row.whatsapp_display_name
    if (row.whatsapp_number) clientRow.whatsapp_number = row.whatsapp_number

    const svc = createServiceClient()
    const { error: clientErr } = await svc
      .from('clients')
      .upsert(clientRow, { onConflict: 'id' })
    if (clientErr) return { error: clientErr.message }

    // Services draft → real rows (replace-all semantics).
    const draft = Array.isArray(row.services_draft) ? row.services_draft : []
    const { error: delErr } = await svc
      .from('services')
      .delete()
      .eq('client_id', user.id)
    if (delErr) return { error: delErr.message }
    if (draft.length) {
      const { error: insErr } = await svc.from('services').insert(
        draft.map((s: any) => ({
          client_id: user.id,
          name: s.name,
          price: s.price,
          duration_minutes: s.duration_minutes ?? null,
        }))
      )
      if (insErr) return { error: insErr.message }
    }

    // Optional ops notification. Safe to ignore failures.
    triggerN8n('client-intake', {
      client_id: user.id,
      email: user.email,
      business_name: row.business_name,
    }).catch(() => {})
  }

  revalidatePath('/onboarding')
  return { success: true }
}

/* ── Finish ── */

export async function completeOnboarding() {
  const { supabase, user } = await authed()
  const now = new Date().toISOString()

  await supabase
    .from('onboarding')
    .update({ completed_at: now, updated_at: now })
    .eq('user_id', user.id)

  await createServiceClient()
    .from('clients')
    .update({ onboarding_completed_at: now, updated_at: now })
    .eq('id', user.id)

  redirect('/app/dashboard')
}

/* ── Navigation ── */

export async function goToStep(step: number) {
  const { supabase, user } = await authed()
  return saveOnboarding(supabase, user.id, { current_step: step })
}