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
//     <div className="min-h-screen bg-paper px-6 py-16 lg:px-12">
//       <div className="mx-auto max-w-xl">
//         <p className="eyebrow text-purple">Get started</p>
//         <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//           Create your account
//         </h1>
//         <p className="mt-2 font-body text-sm text-ink/60">
//           Track your recovered revenue and manage billing in one place.
//         </p>

//         <form action={action} className="mt-8 space-y-5">
//           <input type="hidden" name="next" value={next} />
//           <input type="hidden" name="plan" value={plan} />
//           <input type="hidden" name="billing" value={billing} />

//           {state.error && <Alert kind="error">{state.error}</Alert>}
//           {state.message && <Alert kind="success">{state.message}</Alert>}

//           <Field
//             label="Full name"
//             name="fullName"
//             autoComplete="name"
//             placeholder="Jordan Lee"
//           />

//           <Field
//             label="Business name"
//             name="businessName"
//             placeholder="Smile Dental Clinic"
//           />

//           <Field
//             label="Work email"
//             name="email"
//             type="email"
//             autoComplete="email"
//             placeholder="you@business.com"
//           />

//           <label className="block">
//             <span className="eyebrow text-ink/60">Billing region</span>
//             <select
//               name="billingRegion"
//               defaultValue="international"
//               className="mt-2 w-full rounded-lg border border-grey-line bg-paper px-4 py-3 font-body text-base text-ink outline-none focus:border-ink"
//             >
//               <option value="international">International</option>
//               <option value="pakistan">Pakistan</option>
//             </select>
//           </label>

//           <label className="block">
//             <span className="eyebrow text-ink/60">Password</span>
//             <div className="relative mt-2">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="new-password"
//                 placeholder="At least 8 characters"
//                 className="w-full rounded-lg border border-grey-line bg-paper px-4 py-3 pr-16 font-body text-base text-ink outline-none focus:border-ink"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm font-medium text-purple hover:underline"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </label>

//           <Submit />
//         </form>

//         <p className="mt-6 font-body text-xs text-ink/50">
//           By creating an account you agree to our{" "}
//           <Link href="/terms" className="text-purple hover:underline">
//             Terms
//           </Link>{" "}
//           and{" "}
//           <Link href="/privacy" className="text-purple hover:underline">
//             Privacy Policy
//           </Link>
//           .
//         </p>

//         <p className="mt-6 font-body text-sm text-ink/60">
//           Already have an account?{" "}
//           <Link href="/login" className="font-semibold text-purple hover:underline">
//             Log in
//           </Link>
//         </p>
//       </div>
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

//   // After signup with confirm-email required, show a dedicated screen
//   if (state.needsEmailConfirmation && state.message) {
//     return (
//       <div className="min-h-screen bg-paper px-6 py-16 lg:px-12">
//         <div className="mx-auto max-w-xl">
//           <p className="eyebrow text-purple">Check your inbox</p>
//           <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//             Confirm your email
//           </h1>
//           <p className="mt-3 font-body text-sm text-ink/70 leading-relaxed">
//             We created your account and sent a confirmation link. Open that email and
//             click the link to activate your account. You can log in only after confirming.
//           </p>
//           <div className="mt-6">
//             <Alert kind="success">{state.message}</Alert>
//           </div>
//           <ul className="mt-6 list-disc space-y-2 pl-5 font-body text-sm text-ink/60">
//             <li>Check spam / promotions if you don’t see it within a minute.</li>
//             <li>The link expires; use “Create account” again only if it expires.</li>
//           </ul>
//           <p className="mt-8 font-body text-sm text-ink/60">
//             Already confirmed?{" "}
//             <Link
//               href={`/login?next=${encodeURIComponent(next)}`}
//               className="font-semibold text-purple hover:underline"
//             >
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-paper px-6 py-16 lg:px-12">
//       <div className="mx-auto max-w-xl">
//         <p className="eyebrow text-purple">Get started</p>
//         <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//           Create your account
//         </h1>
//         <p className="mt-2 font-body text-sm text-ink/60">
//           Track your recovered revenue and manage billing in one place.
//         </p>

//         <form action={action} className="mt-8 space-y-5">
//           <input type="hidden" name="next" value={next} />
//           <input type="hidden" name="plan" value={plan} />
//           <input type="hidden" name="billing" value={billing} />

//           {state.error && <Alert kind="error">{state.error}</Alert>}
//           {state.message && !state.needsEmailConfirmation && (
//             <Alert kind="success">{state.message}</Alert>
//           )}

//           <Field
//             label="Full name"
//             name="fullName"
//             autoComplete="name"
//             placeholder="Jordan Lee"
//           />

//           <Field
//             label="Business name"
//             name="businessName"
//             placeholder="Smile Dental Clinic"
//           />

//           <Field
//             label="Work email"
//             name="email"
//             type="email"
//             autoComplete="email"
//             placeholder="you@business.com"
//           />

//           <label className="block">
//             <span className="eyebrow text-ink/60">Billing region</span>
//             <select
//               name="billingRegion"
//               defaultValue="international"
//               className="mt-2 w-full rounded-lg border border-grey-line bg-paper px-4 py-3 font-body text-base text-ink outline-none focus:border-ink"
//             >
//               <option value="international">International</option>
//               <option value="pakistan">Pakistan</option>
//             </select>
//           </label>

//           <label className="block">
//             <span className="eyebrow text-ink/60">Password</span>
//             <div className="relative mt-2">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="new-password"
//                 placeholder="At least 8 characters"
//                 className="w-full rounded-lg border border-grey-line bg-paper px-4 py-3 pr-16 font-body text-base text-ink outline-none focus:border-ink"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm font-medium text-purple hover:underline"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </label>

//           <Submit />
//         </form>

//         <p className="mt-6 font-body text-xs text-ink/50">
//           By creating an account you agree to our{" "}
//           <Link href="/terms" className="text-purple hover:underline">
//             Terms
//           </Link>{" "}
//           and{" "}
//           <Link href="/privacy" className="text-purple hover:underline">
//             Privacy Policy
//           </Link>
//           . You’ll need to confirm your email before logging in.
//         </p>

//         <p className="mt-6 font-body text-sm text-ink/60">
//           Already have an account?{" "}
//           <Link href="/login" className="font-semibold text-purple hover:underline">
//             Log in
//           </Link>
//         </p>
//       </div>
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
  const region = params.get("region") ?? "";
  // After confirm/login, unpaid users go to checkout (with plan in URL if present)
  const nextFromUrl = params.get("next");
  const next =
    nextFromUrl && nextFromUrl.startsWith("/")
      ? nextFromUrl
      : plan
        ? `/app/checkout?plan=${encodeURIComponent(plan)}&billing=${encodeURIComponent(billing)}${
            region ? `&region=${encodeURIComponent(region)}` : ""
          }`
        : "/app/checkout";

  const [state, action] = useActionState<AuthState, FormData>(signUp, {});
  const [showPassword, setShowPassword] = useState(false);

  if (state.needsEmailConfirmation && state.message) {
    return (
      <div className="min-h-screen bg-paper px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-xl">
          <p className="eyebrow text-purple">Check your inbox</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
            Confirm your email
          </h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">
            We created your account and sent a confirmation link. After you
            confirm, log in — you&apos;ll complete payment, then setup, then your
            dashboard.
          </p>
          <div className="mt-6">
            <Alert kind="success">{state.message}</Alert>
          </div>
          <ul className="mt-6 list-disc space-y-2 pl-5 font-body text-sm text-ink/60">
            <li>Check spam / promotions if you don&apos;t see it within a minute.</li>
            <li>The link expires; sign up again only if it expires.</li>
          </ul>
          <p className="mt-8 font-body text-sm text-ink/60">
            Already confirmed?{" "}
            <Link
              href={`/login?next=${encodeURIComponent(next)}`}
              className="font-semibold text-purple hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow text-purple">Get started</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 font-body text-sm text-ink/60">
          {plan
            ? "Next you’ll confirm email, pay for your plan, then finish a short setup."
            : "After signup you’ll choose a plan, pay, then finish setup."}
        </p>

        <form action={action} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <input type="hidden" name="plan" value={plan} />
          <input type="hidden" name="billing" value={billing} />
          <input type="hidden" name="region" value={region} />

          {state.error && <Alert kind="error">{state.error}</Alert>}
          {state.message && !state.needsEmailConfirmation && (
            <Alert kind="success">{state.message}</Alert>
          )}

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
              defaultValue={region === "PK" ? "pakistan" : "international"}
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
          . You&apos;ll confirm email, then complete payment before setup.
        </p>

        <p className="mt-6 font-body text-sm text-ink/60">
          Already have an account?{" "}
          <Link
            href={`/login?next=${encodeURIComponent(next)}`}
            className="font-semibold text-purple hover:underline"
          >
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