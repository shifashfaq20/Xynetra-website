// // src/app/api/onboarding/test-reminder/route.ts
// import { NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'

// export async function POST() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const { data: row } = await supabase
//     .from('onboarding')
//     .select('whatsapp_provisioned, business_name, owner_whatsapp')
//     .eq('user_id', user.id)
//     .single()

//   if (!row?.whatsapp_provisioned) {
//     return NextResponse.json(
//       { error: 'WhatsApp line not yet provisioned' },
//       { status: 403 }
//     )
//   }

//   const webhookUrl = process.env.TEST_REMINDER_WEBHOOK_URL
//   if (!webhookUrl) {
//     return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
//   }

//   const res = await fetch(webhookUrl, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       user_id: user.id,
//       email: user.email,
//       business_name: row.business_name,
//       owner_whatsapp: row.owner_whatsapp,
//       type: 'test_reminder',
//     }),
//   })

//   if (!res.ok) {
//     return NextResponse.json({ error: 'Webhook failed' }, { status: 502 })
//   }

//   return NextResponse.json({ success: true })
// }


// // src/app/api/onboarding/test-reminder/route.ts
// import { NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'

// export async function POST() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const { data: row } = await supabase
//     .from('onboarding')
//     .select('whatsapp_provisioned, business_name, owner_whatsapp, team_member_whatsapp')
//     .eq('user_id', user.id)
//     .single()

//   if (!row?.whatsapp_provisioned) {
//     return NextResponse.json(
//       { error: 'WhatsApp line not yet provisioned' },
//       { status: 403 }
//     )
//   }

//   const webhookUrl = process.env.TEST_REMINDER_WEBHOOK_URL
//   if (!webhookUrl) {
//     return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
//   }

//   const res = await fetch(webhookUrl, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       user_id: user.id,
//       email: user.email,
//       business_name: row.business_name,
//       owner_whatsapp: row.owner_whatsapp,
//       team_member_whatsapp: row.team_member_whatsapp,
//       type: 'test_reminder',
//     }),
//   })

//   if (!res.ok) {
//     return NextResponse.json({ error: 'Webhook failed' }, { status: 502 })
//   }

//   return NextResponse.json({ success: true })
// }



// // src/app/api/onboarding/test-reminder/route.ts  (FULL REPLACEMENT)
// import { NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'
// import { triggerN8n } from '@/lib/n8n'

// export async function POST() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const { data: client } = await supabase
//     .from('clients')
//     .select('id, whatsapp_phone_number_id')
//     .eq('id', user.id)
//     .maybeSingle()

//   if (!client?.whatsapp_phone_number_id) {
//     return NextResponse.json(
//       { error: 'Your WhatsApp line is not live yet — we register it with Meta after onboarding (usually same day).' },
//       { status: 403 }
//     )
//   }

//   try {
//     await triggerN8n('test-reminder', { client_id: client.id })
//   } catch {
//     return NextResponse.json({ error: 'Send failed — please contact support.' }, { status: 502 })
//   }

//   return NextResponse.json({ success: true })
// }



import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { triggerN8n } from '@/lib/n8n'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: client } = await supabase
    .from('clients')
    .select('whatsapp_phone_number_id')
    .eq('id', user.id)
    .maybeSingle()

  if (!client?.whatsapp_phone_number_id) {
    return NextResponse.json({ error: 'WhatsApp line not yet provisioned' }, { status: 403 })
  }

  try {
    // n8n looks up the client row, sends reminder_24h from THEIR line to owner_whatsapp
    await triggerN8n('test-reminder', { client_id: user.id })
  } catch {
    return NextResponse.json({ error: 'Webhook failed' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}