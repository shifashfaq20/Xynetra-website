// import type { Metadata } from "next";
// import { SignupForm } from "./SignupForm";

// export const metadata: Metadata = {
//   title: "Create your account",
//   robots: { index: false },
// };

// export default function SignupPage() {
//   return <SignupForm />;
// }


// // src/app/(auth)/signup/page.tsx
// import type { Metadata } from "next";
// import { Suspense } from "react";
// import { SignupForm } from "./SignupForm";

// export const metadata: Metadata = {
//   title: "Create your account",
//   robots: { index: false },
// };

// function SignupFallback() {
//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <p className="text-sm text-ink/60">Loading signup form...</p>
//     </div>
//   );
// }

// export default function SignupPage() {
//   return (
//     <Suspense fallback={<SignupFallback />}>
//       <SignupForm />
//     </Suspense>
//   );
// }





import type { Metadata } from "next";
import { Suspense } from "react";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function SignupFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-ink/60">Loading signup form...</p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFallback />}>
      <SignupForm />
    </Suspense>
  );
}