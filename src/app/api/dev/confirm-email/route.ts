// src/app/api/dev/confirm-email/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * DEV ONLY — confirms a user's email so you can test without
 * clicking the link in a real inbox.
 *
 * Usage:  GET /api/dev/confirm-email?email=you@test.com
 *
 * This route returns 404 in production.
 */
export async function GET(request: Request) {
  // Hard-block in production
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Missing ?email= param" },
      { status: 400 }
    );
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !supabaseUrl) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY not set in .env.local" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Find the user by email
  const { data: users, error: listErr } = await supabase.auth.admin.listUsers();

  if (listErr) {
    return NextResponse.json({ error: listErr.message }, { status: 500 });
  }

  const user = users.users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json(
      { error: `No user found with email: ${email}` },
      { status: 404 }
    );
  }

  if (user.email_confirmed_at) {
    return NextResponse.json({
      message: `User ${email} is already confirmed.`,
    });
  }

  // Confirm the user
  const { error: confirmErr } = await supabase.auth.admin.updateUserById(
    user.id,
    { email_confirm: true }
  );

  if (confirmErr) {
    return NextResponse.json({ error: confirmErr.message }, { status: 500 });
  }

  return NextResponse.json({
    message: `✓ Confirmed ${email}. You can now log in at /login`,
  });
}



