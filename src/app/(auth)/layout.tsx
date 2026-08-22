import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE } from "@/lib/constants";

// Split auth layout. Left = Ink panel with reversed logo (accent surface rule:
// on Ink, use the white reversed logo). Right = Paper form.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Ink panel */}
      <div className="relative hidden flex-col justify-between bg-ink p-10 text-paper lg:flex">
        <Link href="/" aria-label="Xynetra home">
          <Logo variant="reversed" width={150} href={null} />
        </Link>
        <div>
          <p className="eyebrow text-purple">Client portal</p>
          <h2 className="h2 mt-4 max-w-md text-paper">
            The revenue you recovered, in one place.
          </h2>
          <p className="body mt-4 max-w-md text-paper/70">
            Appointments confirmed, slots recovered, leads answered in under 60
            seconds — and the money that came back with them.
          </p>
        </div>
        {/* Circuit strip anchored to the bottom edge, on black. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-12 bg-repeat-x"
          style={{
            backgroundImage:
              "url('/brand/pattern/xynetra-circuit-strip-tileable.webp')",
            backgroundSize: "auto 100%",
          }}
        />
      </div>

      {/* Form panel */}
      <div className="flex flex-col bg-paper">
        <div className="border-b border-grey-line p-6 lg:hidden">
          <Logo width={132} />
        </div>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm py-10">{children}</div>
        </div>
        <div className="p-6 text-center font-body text-xs text-ink/50">
          © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}
        </div>
      </div>
    </div>
  );
}
