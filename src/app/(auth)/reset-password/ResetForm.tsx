"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { requestPasswordReset, type AuthState } from "@/lib/auth/actions";
import { Field, SubmitButton, Alert } from "@/components/auth/Field";

export function ResetForm() {
  const [state, action] = useActionState<AuthState, FormData>(
    requestPasswordReset,
    {}
  );

  return (
    <div>
      <p className="eyebrow text-purple">Password reset</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
        Reset your password
      </h1>
      <p className="mt-2 font-body text-sm text-ink/60">
        Enter your email and we&rsquo;ll send you a link to set a new password.
      </p>

      <form action={action} className="mt-8 space-y-5">
        {state.error && <Alert kind="error">{state.error}</Alert>}
        {state.message && <Alert kind="success">{state.message}</Alert>}
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
        />
        <Submit />
      </form>

      <p className="mt-8 font-body text-sm text-ink/60">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-purple hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return <SubmitButton pending={pending}>Send reset link</SubmitButton>;
}
