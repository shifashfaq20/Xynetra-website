// src/app/api/google-calendar/callback/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(
      new URL('/onboarding?step=2&error=google_auth_failed', request.url)
    )
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  })

  const tokens = await tokenRes.json()

  if (!tokens.access_token) {
    return NextResponse.redirect(
      new URL('/onboarding?step=2&error=token_exchange_failed', request.url)
    )
  }
// Inside the callback handler, after getting tokens:
const supabase = createServiceClient(); // or however you do admin supabase
await supabase.from('onboarding_progress').update({
  refresh_token_encrypted: tokens.refresh_token, // encrypt this with your encryption.ts before storing in production
  google_connected: true,
}).eq('user_id', userId);

return NextResponse.redirect(new URL('/onboarding?step=2', request.url));


  // Fetch user's calendars
  const calRes = await fetch(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  )
  const calData = await calRes.json()

  // Store tokens + calendar list in a short-lived cookie so the client can pick
  const cookieStore = await cookies()
  cookieStore.set('gcal_temp', JSON.stringify({
    refresh_token: tokens.refresh_token || null,
    calendars: (calData.items || []).map((c: any) => ({
      id: c.id,
      summary: c.summary,
      primary: c.primary || false,
    })),
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/',
  })

  return NextResponse.redirect(
    new URL('/onboarding?step=2&gcal=connected', request.url)
  )
}