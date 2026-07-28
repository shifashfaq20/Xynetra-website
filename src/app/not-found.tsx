import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BookDemoButton } from "@/components/CtaButtons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <Logo width={140} />
      <p className="eyebrow mt-10 text-purple">404</p>
      <h1 className="h1 mt-3">This page took a day off.</h1>
      <p className="body-lg mt-4 max-w-md text-ink/70">
        The page you&rsquo;re after doesn&rsquo;t exist. Let&rsquo;s get you back
        to work.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <BookDemoButton variant="outline" />
      </div>
    </div>
  );
}
