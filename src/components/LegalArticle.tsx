import Link from "next/link";

type LegalKey = "terms" | "privacy" | "refund";

const CROSS_NAV: { key: LegalKey; href: string; label: string }[] = [
  { key: "terms", href: "/terms", label: "Terms of Service" },
  { key: "privacy", href: "/privacy", label: "Privacy Policy" },
  { key: "refund", href: "/refund-policy", label: "Refund Policy" },
];

export function LegalArticle({
  active,
  eyebrow,
  title,
  effectiveDate,
  children,
}: {
  active: LegalKey;
  eyebrow: string;
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-paper text-ink">
      <div className="container-x py-20 md:py-28">
        {/* Cross-navigation between the three legal pages */}
        <nav
          className="legal-xnav flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
          aria-label="Legal pages"
        >
          {CROSS_NAV.map((item, i) => (
            <span key={item.key} className="flex items-center gap-3">
              <Link
                href={item.href}
                aria-current={item.key === active ? "page" : undefined}
              >
                {item.label}
              </Link>
              {i < CROSS_NAV.length - 1 && (
                <span className="text-neutral-300" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="legal-doc mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            Effective date: {effectiveDate}
          </p>

          <div className="mt-10">{children}</div>

          <div className="mt-14 border-t border-grey-line pt-8 text-sm text-neutral-500">
            <p>Prepared for Xynetra, Lahore, Pakistan.</p>
            <p className="mt-1">
              Questions? Email{" "}
              <a href="mailto:info@xynetra.com">info@xynetra.com</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}