import { Eyebrow } from "@/components/ui";

// Long-form legal content. Body is Ink on Paper, generous line height.
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper">
      <div className="container-x max-w-3xl py-16 sm:py-24">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="h1 mt-4">{title}</h1>
        <p className="mt-4 font-body text-sm text-ink/60">
          Last updated: {updated}
        </p>
        <div className="legal mt-10">{children}</div>
      </div>
    </div>
  );
}
