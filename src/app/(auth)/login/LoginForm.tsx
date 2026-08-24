// "use client";

// import Link from "next/link";
// import { useActionState } from "react";
// import { useFormStatus } from "react-dom";
// import { useSearchParams } from "next/navigation";
// import { signIn, type AuthState } from "@/lib/auth/actions";
// import { Field, SubmitButton, Alert } from "@/components/auth/Field";

// export function LoginForm() {
//   const params = useSearchParams();
//   const next = params.get("next") ?? "/app/dashboard";
//   const [state, action] = useActionState<AuthState, FormData>(signIn, {});

//   return (
//     <div>
//       <p className="eyebrow text-purple">Client portal</p>
//       <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//         Welcome back
//       </h1>
//       <p className="mt-2 font-body text-sm text-ink/60">
//         Log in to see your results and manage billing.
//       </p>

//       <form action={action} className="mt-8 space-y-5">
//         <input type="hidden" name="next" value={next} />
//         {state.error && <Alert kind="error">{state.error}</Alert>}
//         <Field
//           label="Email"
//           name="email"
//           type="email"
//           autoComplete="email"
//           placeholder="you@business.com"
//         />
//         <div>
//           <Field
//             label="Password"
//             name="password"
//             type="password"
//             autoComplete="current-password"
//             placeholder="••••••••"
//           />
//           <div className="mt-2 text-right">
//             <Link
//               href="/reset-password"
//               className="font-body text-sm text-purple hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>
//         </div>
//         <Submit />
//       </form>

//       <p className="mt-8 font-body text-sm text-ink/60">
//         New to Xynetra?{" "}
//         <Link href="/signup" className="font-semibold text-purple hover:underline">
//           Create an account
//         </Link>
//       </p>
//     </div>
//   );
// }

// function Submit() {
//   const { pending } = useFormStatus();
//   return <SubmitButton pending={pending}>Log in</SubmitButton>;
// }


// "use client";

// import Link from "next/link";
// import { useActionState, useState } from "react";
// import { useFormStatus } from "react-dom";
// import { useSearchParams } from "next/navigation";
// import { signIn, type AuthState } from "@/lib/auth/actions";
// import { Field, SubmitButton, Alert } from "@/components/auth/Field";

// export function LoginForm() {
//   const params = useSearchParams();
//   const next = params.get("next") ?? "/app/dashboard";
//   const [state, action] = useActionState<AuthState, FormData>(signIn, {});
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div>
//       <p className="eyebrow text-purple">Client portal</p>
//       <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
//         Welcome back
//       </h1>
//       <p className="mt-2 font-body text-sm text-ink/60">
//         Log in to see your results and manage billing.
//       </p>

//       <form action={action} className="mt-8 space-y-5">
//         <input type="hidden" name="next" value={next} />

//         {state.error && <Alert kind="error">{state.error}</Alert>}

//         <Field
//           label="Email"
//           name="email"
//           type="email"
//           autoComplete="email"
//           placeholder="you@business.com"
//         />

//         <div>
//           <label className="block">
//             <span className="eyebrow text-ink/60">Password</span>
//             <div className="relative mt-2">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="current-password"
//                 placeholder="••••••••"
//                 className="w-full border border-grey-line bg-paper px-4 py-3 pr-16 font-body text-base text-ink outline-none focus:border-ink"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-purple hover:underline"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </label>

//           <div className="mt-2 text-right">
//             <Link
//               href="/reset-password"
//               className="font-body text-sm text-purple hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>
//         </div>

//         <Submit />
//       </form>

//       <p className="mt-8 font-body text-sm text-ink/60">
//         New to Xynetra?{" "}
//         <Link href="/signup" className="font-semibold text-purple hover:underline">
//           Create an account
//         </Link>
//       </p>
//     </div>
//   );
// }

// function Submit() {
//   const { pending } = useFormStatus();
//   return <SubmitButton pending={pending}>Log in</SubmitButton>;
// }



"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signIn, type AuthState } from "@/lib/auth/actions";
import { Field, SubmitButton, Alert } from "@/components/auth/Field";

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/app/dashboard";
  const urlError = params.get("error");
  const confirmed = params.get("confirmed");
  const [state, action] = useActionState<AuthState, FormData>(signIn, {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <p className="eyebrow text-purple">Client portal</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
        Welcome back
      </h1>
      <p className="mt-2 font-body text-sm text-ink/60">
        Log in to see your results and manage billing.
      </p>

      <form action={action} className="mt-8 space-y-5">
        <input type="hidden" name="next" value={next} />

        {confirmed === "1" && (
          <Alert kind="success">
            Email confirmed. You can log in now.
          </Alert>
        )}

        {urlError === "auth" && !state.error && (
          <Alert kind="error">
            That confirmation or reset link is invalid or expired. Try logging in, or
            request a new link.
          </Alert>
        )}

        {state.error && <Alert kind="error">{state.error}</Alert>}

        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
        />

        <div>
          <label className="block">
            <span className="eyebrow text-ink/60">Password</span>
            <div className="relative mt-2">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full border border-grey-line bg-paper px-4 py-3 pr-16 font-body text-base text-ink outline-none focus:border-ink"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-purple hover:underline"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div className="mt-2 text-right">
            <Link
              href="/reset-password"
              className="font-body text-sm text-purple hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Submit />
      </form>

      <p className="mt-8 font-body text-sm text-ink/60">
        New to Xynetra?{" "}
        <Link href="/signup" className="font-semibold text-purple hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return <SubmitButton pending={pending}>Log in</SubmitButton>;
}