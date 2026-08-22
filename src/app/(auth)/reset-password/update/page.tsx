import type { Metadata } from "next";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export const metadata: Metadata = {
  title: "Set a new password",
  robots: { index: false },
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
