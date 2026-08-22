import type { Metadata } from "next";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false },
};

export default function SignupPage() {
  return <SignupForm />;
}
