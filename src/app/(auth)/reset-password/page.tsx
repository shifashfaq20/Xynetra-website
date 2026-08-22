import type { Metadata } from "next";
import { ResetForm } from "./ResetForm";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return <ResetForm />;
}
