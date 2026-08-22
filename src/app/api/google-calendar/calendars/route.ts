// src/app/api/google-calendar/calendars/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('gcal_temp')?.value
  if (!raw) return NextResponse.json({ error: 'No Google session' }, { status: 400 })

  const { calendars, refresh_token } = JSON.parse(raw)
  return NextResponse.json({ calendars, refresh_token })
}