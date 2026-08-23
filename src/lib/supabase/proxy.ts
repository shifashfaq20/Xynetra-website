
// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// type CookieToSet = { name: string; value: string; options?: CookieOptions };

// export async function proxy(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request });
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() { return request.cookies.getAll(); },
//         setAll(cookiesToSet: CookieToSet[]) {
//           cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
//           supabaseResponse = NextResponse.next({ request });
//           cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
//         },
//       },
//     }
//   );

//   let user: any = null;
//   try { const { data } = await supabase.auth.getUser(); user = data.user; } catch {}

//   const path = request.nextUrl.pathname;
//   if (!user && (path.startsWith("/app") || path.startsWith("/onboarding"))) {
//     const url = request.nextUrl.clone(); url.pathname = "/login"; url.searchParams.set("next", path);
//     return NextResponse.redirect(url);
//   }

//   if (user && (path.startsWith("/onboarding") || path.startsWith("/app"))) {
//     const allowed = path.startsWith("/app/checkout") || path.startsWith("/app/billing");
//     if (!allowed) {
//       let profile: any = null;
//       try { const r = await supabase.from("profiles").select("subscription_status").eq("id", user.id).single(); profile = r.data; } catch {}
//       if (profile?.subscription_status !== "active") {
//         const url = request.nextUrl.clone(); url.pathname = "/app/checkout"; return NextResponse.redirect(url);
//       }
//     }
//   }

//   if (user && (path === "/login" || path === "/signup")) {
//     const url = request.nextUrl.clone(); url.pathname = "/app/dashboard"; return NextResponse.redirect(url);
//   }

//   return supabaseResponse;
// }

// export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };



import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/admin/roles";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

export async function updateSession(request: NextRequest) {
  let res = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          res = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user: any = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (e) {
    console.error("[XYNETRA] middleware.getUser", e);
  }

  const path = request.nextUrl.pathname;
  const isProtected = path.startsWith("/app") || path.startsWith("/onboarding");

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (user && isProtected) {
    const admin = isAdminEmail(user.email ?? "");
    const exempt =
      admin ||
      path.startsWith("/app/checkout") ||
      path.startsWith("/app/billing") ||
      path.startsWith("/app/admin");

    if (!exempt) {
      let status: string | null = null;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("subscription_status")
          .eq("id", user.id)
          .maybeSingle();
        if (error) console.error("[XYNETRA] middleware.profile", error.message);
        status = data?.subscription_status ?? null;
      } catch (e) {
        console.error("[XYNETRA] middleware.profile.threw", e);
      }

      // Only redirect on a KNOWN-inactive status. A query failure must not
      // trap every user in a checkout loop.
      if (status !== null && status !== "active") {
        const url = request.nextUrl.clone();
        url.pathname = "/app/checkout";
        return NextResponse.redirect(url);
      }
    }
  }

  if (user && (path === "/login" || path === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = isAdminEmail(user.email ?? "") ? "/app/admin" : "/app/dashboard";
    return NextResponse.redirect(url);
  }

  return res;
}