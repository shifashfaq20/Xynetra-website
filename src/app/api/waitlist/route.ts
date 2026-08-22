import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Stores an early-access signup. Table is optional; failures are swallowed
// so the marketing form never blocks a visitor.
export async function POST(request: Request) {
  const { email, product } = await request.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = await createClient();
      await supabase.from("waitlist").insert({ email, product });
    } catch {
      // Table may not exist yet — that's fine.
    }
  }

  return NextResponse.json({ ok: true });
}
