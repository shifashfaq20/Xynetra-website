// import { Suspense } from "react";
// import type { Metadata } from "next";
// import { LoginForm } from "./LoginForm";

// export const metadata: Metadata = {
//   title: "Client login",
//   robots: { index: false },
// };

// export default function LoginPage() {
//   return (
//     <Suspense>
//       <LoginForm />
//     </Suspense>
//   );
// }


import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Client login",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // Already signed in → go straight to app (or ?next= if safe)
  if (data.user) {
    const params = searchParams ? await searchParams : undefined;
    const raw = params?.next ?? "/app/dashboard";
    const next =
      raw.startsWith("/") && !raw.startsWith("//") ? raw : "/app/dashboard";
    redirect(next);
  }

  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
