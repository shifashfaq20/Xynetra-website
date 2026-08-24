// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// // Exchanges the email-link code for a session (email confirm + password reset).
// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   const next = searchParams.get("next") ?? "/app/dashboard";

//   if (code) {
//     const supabase = await createClient();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);
//     if (!error) {
//       return NextResponse.redirect(`${origin}${next}`);
//     }
//   }

//   return NextResponse.redirect(`${origin}/login?error=auth`);
// }

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Email confirmation + password-reset links land here (?code=...&next=...).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextRaw = searchParams.get("next") ?? "/app/dashboard";
  const next = nextRaw.startsWith("/") ? nextRaw : "/app/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("[XYNETRA] auth/callback", error.message);
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}