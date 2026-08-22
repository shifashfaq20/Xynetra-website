"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updatePassword, type AuthState } from "@/lib/auth/actions";
import { Field, SubmitButton, Alert } from "@/components/auth/Field";

export function UpdatePasswordForm() {
  const [state, action] = useActionState<AuthState, FormData>(
    updatePassword,
    {}
  );

  return (
    <div>
      <p className="eyebrow text-purple">Almost done</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
        Set a new password
      </h1>
      <p className="mt-2 font-body text-sm text-ink/60">
        Choose a new password for your account.
      </p>

      <form action={action} className="mt-8 space-y-5">
        {state.error && <Alert kind="error">{state.error}</Alert>}
        <Field
          label="New password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
        <Submit />
      </form>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return <SubmitButton pending={pending}>Update password</SubmitButton>;
}
