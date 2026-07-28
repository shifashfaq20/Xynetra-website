// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// type CookieToSet = { name: string; value: string; options?: CookieOptions };

// // Refreshes the Supabase session cookie and guards /app routes.
// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request });

//   const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//   // Without Supabase configured, don't attempt auth — let pages render.
//   if (!url || !key) return supabaseResponse;

//   const supabase = createServerClient(url, key, {
//     cookies: {
//       getAll() {
//         return request.cookies.getAll();
//       },
//       setAll(cookiesToSet: CookieToSet[]) {
//         cookiesToSet.forEach(({ name, value }) =>
//           request.cookies.set(name, value)
//         );
//         supabaseResponse = NextResponse.next({ request });
//         cookiesToSet.forEach(({ name, value, options }) =>
//           supabaseResponse.cookies.set(name, value, options)
//         );
//       },
//     },
//   });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const path = request.nextUrl.pathname;
//   const isAppRoute = path.startsWith("/app");
//   const isAuthRoute =
//     path.startsWith("/login") ||
//     path.startsWith("/signup") ||
//     path.startsWith("/reset-password");

//   if (isAppRoute && !user) {
//     const redirectUrl = request.nextUrl.clone();
//     redirectUrl.pathname = "/login";
//     redirectUrl.searchParams.set("next", path);
//     return NextResponse.redirect(redirectUrl);
//   }

//   if (isAuthRoute && user) {
//     const redirectUrl = request.nextUrl.clone();
//     redirectUrl.pathname = "/app/dashboard";
//     redirectUrl.search = "";
//     return NextResponse.redirect(redirectUrl);
//   }

//   return supabaseResponse;
// }





// // src/lib/supabase/middleware.ts
// import { createServerClient } from '@supabase/ssr'
// import { NextResponse, type NextRequest } from 'next/server'

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request })

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll()
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) =>
//             request.cookies.set(name, value)
//           )
//           supabaseResponse = NextResponse.next({ request })
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   // Refresh the session — important: do NOT remove this
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   // Protect /app and /onboarding routes
//   if (
//     !user &&
//     (request.nextUrl.pathname.startsWith('/app') ||
//       request.nextUrl.pathname.startsWith('/onboarding'))
//   ) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/login'
//     return NextResponse.redirect(url)
//   }

//   // Redirect authenticated users away from login/signup
//   if (
//     user &&
//     (request.nextUrl.pathname === '/login' ||
//       request.nextUrl.pathname === '/signup')
//   ) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/app/dashboard'
//     return NextResponse.redirect(url)
//   }

//   return supabaseResponse
// }

// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the session — important: do NOT remove this
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // 1) Not logged in → block /app and /onboarding, remember destination
  if (
    !user &&
    (path.startsWith('/app') || path.startsWith('/onboarding'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  // 2) Logged in → enforce payment gate on /onboarding and /app
  //    (except /app/checkout and /app/billing which unpaid users need)
  if (
    user &&
    (path.startsWith('/onboarding') || path.startsWith('/app'))
  ) {
    const allowedWhenUnpaid =
      path.startsWith('/app/checkout') || path.startsWith('/app/billing')

    if (!allowedWhenUnpaid) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single()

      if (profile?.subscription_status !== 'active') {
        const url = request.nextUrl.clone()
        url.pathname = '/app/checkout'
        return NextResponse.redirect(url)
      }
    }
  }

  // 3) Logged-in users shouldn't sit on login/signup
  if (
    user &&
    (path === '/login' || path === '/signup')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/app/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
