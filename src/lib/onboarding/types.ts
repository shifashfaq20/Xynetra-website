// // src/lib/onboarding/types.ts

// export interface OnboardingData {
//   user_id: string
//   current_step: number
//   // Step 1
//   business_name: string | null
//   timezone: string | null
//   owner_whatsapp: string | null
//   avg_appointment_value: number | null
//   // Step 2
//   calendar_id: string | null
//   calendar_connect_method: 'oauth' | 'manual' | null
//   // Step 3
//   is_active: boolean
//   activated_at: string | null
//   // Step 4
//   whatsapp_provisioned: boolean
//   completed_at: string | null
// }

// // export interface Step1Input {
// //   business_name: string
// //   timezone: string
// //   owner_whatsapp: string
// //   avg_appointment_value: number
// // }

// // export interface Step2Input {
// //   calendar_id: string
// //   calendar_connect_method: 'oauth' | 'manual'
// //   calendar_refresh_token?: string
// // }


// export interface Step1Input {
//   business_name: string
//   timezone: string
//   owner_whatsapp: string
//   team_member_whatsapp: string
//   avg_appointment_value: number
// }

// export interface Step2Input {
//   calendar_id: string
//   calendar_connect_method?: string
//   calendar_refresh_token?: string
//   google_connected?: boolean
// }

// export interface GoogleCalendar {
//   id: string
//   summary: string
//   primary?: boolean
// }


// export interface OnboardingData {
//   user_id: string
//   current_step: number
//   business_name: string | null
//   timezone: string | null
//   owner_whatsapp: string | null
//   team_member_whatsapp: string | null
//   avg_appointment_value: number | null
//   calendar_id: string | null
//   calendar_connect_method: 'oauth' | 'manual' | null
//   phone_option: PhoneOption | null
//   phone_number: string | null
//   phone_country: string | null
//   phone_area_code: string | null
//   phone_auth_confirmed: boolean | null
//   is_active: boolean
//   activated_at: string | null
//   completed_at: string | null
// }

// export type PhoneOption = 'client_sim' | 'landline' | 'agency_virtual'

// export interface Step1Input {
//   business_name: string
//   timezone: string
//   owner_whatsapp: string
//   team_member_whatsapp: string
//   avg_appointment_value: number
// }

// export interface Step2Input {
//   calendar_id: string
//   calendar_connect_method?: string
//   calendar_refresh_token?: string
//   google_connected?: boolean
// }

// export interface Step3PhoneInput {
//   phone_option: PhoneOption
//   phone_number?: string        // client_sim / landline
//   phone_country?: string       // agency_virtual
//   phone_area_code?: string     // agency_virtual (optional)
//   phone_auth_confirmed?: boolean // required true for agency_virtual
// }

// export interface GoogleCalendar {
//   id: string
//   summary: string
//   primary?: boolean
// }


export type PhoneOption = 'client_sim' | 'landline' | 'agency_virtual'
export type WhatsAppStatus = 'not_connected' | 'pending' | 'connected'
export type Tone = 'formal' | 'friendly' | 'casual'
export type Language = 'en' | 'ur' | 'roman_ur' | 'ar' | 'mixed'

export interface DayHours { open?: string; close?: string; closed?: boolean }
export type BusinessHours = Record<string, DayHours> // keys: mon..sun

export interface ReminderTiming {
  r1: { enabled: boolean; hours: number }
  r2: { enabled: boolean; hours: number }
  r3: { enabled: boolean; hours: number }
}

export interface ServiceItem { name: string; price: number; duration_minutes?: number }

export interface Step1Input {
  business_name: string; timezone: string
  owner_whatsapp: string; team_member_whatsapp: string
  avg_appointment_value: number
}
export interface Step2Input {
  calendar_id: string; calendar_connect_method?: string
  calendar_refresh_token?: string; google_connected?: boolean
}
export interface AssistedNumberInput {
  phone_option: PhoneOption; phone_number?: string
  phone_country?: string; phone_area_code?: string
  phone_auth_confirmed?: boolean
}
export interface Step4HoursInput { business_hours: BusinessHours }
export interface Step5TimingInput { reminder_timing: ReminderTiming }
export interface Step6ServicesInput { services: ServiceItem[] }
export interface Step7ToneInput { tone: Tone; language: Language; sign_off: string }

export interface GoogleCalendar { id: string; summary: string; primary?: boolean }