'use server'

import { createClient } from '@/lib/supabase/server'

/** Used by the pending-checkout page (button + auto-poll). */
export async function checkMySubscriptionActive(): Promise<boolean> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  return data?.subscription_status === 'active'
}