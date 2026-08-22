// "use client";

// import Link from "next/link";
// import { useActionState } from "react";
// import { useFormStatus } from "react-dom";
// import { signUp, type AuthState } from "@/lib/auth/actions";
// import { Field, SubmitButton, Alert } from "@/components/auth/Field";

// export function SignupForm() {
//   const [state, action] = useActionState<AuthState, FormData>(signUp, {});

//   return (
//     <div>
//       <p className="eyebrow text-purple">Get started</p>
//       <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//         Create your account
//       </h1>
//       <p className="mt-2 font-body text-sm text-ink/60">
//         Track your recovered revenue and manage billing in one place.
//       </p>

//       <form action={action} className="mt-8 space-y-5">
//         {state.error && <Alert kind="error">{state.error}</Alert>}
//         {state.message && <Alert kind="success">{state.message}</Alert>}
//         <Field label="Full name" name="fullName" autoComplete="name" placeholder="Jordan Lee" />
//         <Field
//           label="Business name"
//           name="businessName"
//           placeholder="Smile Dental Clinic"
//         />
//         <Field
//           label="Work email"
//           name="email"
//           type="email"
//           autoComplete="email"
//           placeholder="you@business.com"
//         />
//         <Field
//           label="Password"
//           name="password"
//           type="password"
//           autoComplete="new-password"
//           placeholder="At least 8 characters"
//         />
//         <label className="block">
//           <span className="eyebrow text-ink/60">Billing region</span>
//           <select
//             name="billingRegion"
//             defaultValue="international"
//             className="mt-2 w-full border border-grey-line bg-paper px-4 py-3 font-body text-base text-ink outline-none focus:border-ink"
//           >
            
//             {/* <option value="international">International (US / UK — card)</option>
//             <option value="pakistan">Pakistan (PKR — bank / EasyPaisa / JazzCash)</option> */}
//           </select>
//         </label>
//         <Submit />
//       </form>

//       <p className="mt-6 font-body text-xs text-ink/50">
//         By creating an account you agree to our{" "}
//         <Link href="/terms" className="text-purple hover:underline">Terms</Link>{" "}
//         and{" "}
//         <Link href="/privacy" className="text-purple hover:underline">Privacy Policy</Link>.
//       </p>

//       <p className="mt-6 font-body text-sm text-ink/60">
//         Already have an account?{" "}
//         <Link href="/login" className="font-semibold text-purple hover:underline">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }

// function Submit() {
//   const { pending } = useFormStatus();
//   return <SubmitButton pending={pending}>Create account</SubmitButton>;
// }

// "use client";

// import Link from "next/link";
// import { useActionState, useState } from "react";
// import { useFormStatus } from "react-dom";
// import { signUp, type AuthState } from "@/lib/auth/actions";
// import { Field, SubmitButton, Alert } from "@/components/auth/Field";

// export function SignupForm() {
//   const [state, action] = useActionState<AuthState, FormData>(signUp, {});
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div>
//       <p className="eyebrow text-purple">Get started</p>
//       <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//         Create your account
//       </h1>
//       <p className="mt-2 font-body text-sm text-ink/60">
//         Track your recovered revenue and manage billing in one place.
//       </p>

//       <form action={action} className="mt-8 space-y-5">
//         {state.error && <Alert kind="error">{state.error}</Alert>}
//         {state.message && <Alert kind="success">{state.message}</Alert>}

//         <Field
//           label="Full name"
//           name="fullName"
//           autoComplete="name"
//           placeholder="Jordan Lee"
//         />

//         <Field
//           label="Business name"
//           name="businessName"
//           placeholder="Smile Dental Clinic"
//         />

//         <Field
//           label="Work email"
//           name="email"
//           type="email"
//           autoComplete="email"
//           placeholder="you@business.com"
//         />

//         <label className="block">
//           <span className="eyebrow text-ink/60">Password</span>
//           <div className="relative mt-2">
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               autoComplete="new-password"
//               placeholder="At least 8 characters"
//               className="w-full border border-grey-line bg-paper px-4 py-3 pr-16 font-body text-base text-ink outline-none focus:border-ink"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm font-medium text-purple hover:underline"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//         </label>

//         <Submit />
//       </form>

//       <p className="mt-6 font-body text-xs text-ink/50">
//         By creating an account you agree to our{" "}
//         <Link href="/terms" className="text-purple hover:underline">
//           Terms
//         </Link>{" "}
//         and{" "}
//         <Link href="/privacy" className="text-purple hover:underline">
//           Privacy Policy
//         </Link>
//         .
//       </p>

//       <p className="mt-6 font-body text-sm text-ink/60">
//         Already have an account?{" "}
//         <Link href="/login" className="font-semibold text-purple hover:underline">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }

// function Submit() {
//   const { pending } = useFormStatus();
//   return <SubmitButton pending={pending}>Create account</SubmitButton>;
// }


// // src/app/(auth)/signup/SignupForm.tsx
// "use client";

// import Link from "next/link";
// import { useActionState, useState } from "react";
// import { useFormStatus } from "react-dom";
// import { useSearchParams } from "next/navigation";
// import { signUp, type AuthState } from "@/lib/auth/actions";
// import { Field, SubmitButton, Alert } from "@/components/auth/Field";

// export function SignupForm() {
//   const params = useSearchParams();
//   const plan = params.get("plan") ?? "";
//   const billing = params.get("billing") ?? "monthly";
//   const next = params.get("next") ?? "/app/checkout";

//   const [state, action] = useActionState<AuthState, FormData>(signUp, {});
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div>
//       <p className="eyebrow text-purple">Get started</p>
//       <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//         Create your account
//       </h1>
//       <p className="mt-2 font-body text-sm text-ink/60">
//         Track your recovered revenue and manage billing in one place.
//       </p>

//       <form action={action} className="mt-8 space-y-5">
//         {/* Carry checkout destination through signup */}
//         <input type="hidden" name="next" value={next} />
//         <input type="hidden" name="plan" value={plan} />
//         <input type="hidden" name="billing" value={billing} />

//         {state.error && <Alert kind="error">{state.error}</Alert>}
//         {state.message && <Alert kind="success">{state.message}</Alert>}

//         <Field
//           label="Full name"
//           name="fullName"
//           autoComplete="name"
//           placeholder="Jordan Lee"
//         />

//         <Field
//           label="Business name"
//           name="businessName"
//           placeholder="Smile Dental Clinic"
//         />

//         <Field
//           label="Work email"
//           name="email"
//           type="email"
//           autoComplete="email"
//           placeholder="you@business.com"
//         />

//         <label className="block">
//           <span className="eyebrow text-ink/60">Billing region</span>
//           <select
//             name="billingRegion"
//             defaultValue="international"
//             className="mt-2 w-full border border-grey-line bg-paper px-4 py-3 font-body text-base text-ink outline-none focus:border-ink"
//           >
//             <option value="international">International</option>
//             <option value="pakistan">Pakistan</option>
//           </select>
//         </label>

//         <label className="block">
//           <span className="eyebrow text-ink/60">Password</span>
//           <div className="relative mt-2">
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               autoComplete="new-password"
//               placeholder="At least 8 characters"
//               className="w-full border border-grey-line bg-paper px-4 py-3 pr-16 font-body text-base text-ink outline-none focus:border-ink"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm font-medium text-purple hover:underline"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//         </label>

//         <Submit />
//       </form>

//       <p className="mt-6 font-body text-xs text-ink/50">
//         By creating an account you agree to our{" "}
//         <Link href="/terms" className="text-purple hover:underline">
//           Terms
//         </Link>{" "}
//         and{" "}
//         <Link href="/privacy" className="text-purple hover:underline">
//           Privacy Policy
//         </Link>
//         .
//       </p>

//       <p className="mt-6 font-body text-sm text-ink/60">
//         Already have an account?{" "}
//         <Link
//           href="/login"
//           className="font-semibold text-purple hover:underline"
//         >
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }

// function Submit() {
//   const { pending } = useFormStatus();
//   return <SubmitButton pending={pending}>Create account</SubmitButton>;
// }





"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signUp, type AuthState } from "@/lib/auth/actions";
import { Field, SubmitButton, Alert } from "@/components/auth/Field";

export function SignupForm() {
  const params = useSearchParams();
  const plan = params.get("plan") ?? "";
  const billing = params.get("billing") ?? "monthly";
  const next = params.get("next") ?? "/app/checkout";

  const [state, action] = useActionState<AuthState, FormData>(signUp, {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-paper px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow text-purple">Get started</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 font-body text-sm text-ink/60">
          Track your recovered revenue and manage billing in one place.
        </p>

        <form action={action} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <input type="hidden" name="plan" value={plan} />
          <input type="hidden" name="billing" value={billing} />

          {state.error && <Alert kind="error">{state.error}</Alert>}
          {state.message && <Alert kind="success">{state.message}</Alert>}

          <Field
            label="Full name"
            name="fullName"
            autoComplete="name"
            placeholder="Jordan Lee"
          />

          <Field
            label="Business name"
            name="businessName"
            placeholder="Smile Dental Clinic"
          />

          <Field
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@business.com"
          />

          <label className="block">
            <span className="eyebrow text-ink/60">Billing region</span>
            <select
              name="billingRegion"
              defaultValue="international"
              className="mt-2 w-full rounded-lg border border-grey-line bg-paper px-4 py-3 font-body text-base text-ink outline-none focus:border-ink"
            >
              <option value="international">International</option>
              <option value="pakistan">Pakistan</option>
            </select>
          </label>

          <label className="block">
            <span className="eyebrow text-ink/60">Password</span>
            <div className="relative mt-2">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-grey-line bg-paper px-4 py-3 pr-16 font-body text-base text-ink outline-none focus:border-ink"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm font-medium text-purple hover:underline"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <Submit />
        </form>

        <p className="mt-6 font-body text-xs text-ink/50">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="text-purple hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-purple hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <p className="mt-6 font-body text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-purple hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return <SubmitButton pending={pending}>Create account</SubmitButton>;
}



