"use client";

import { useState, useTransition } from "react";
import { markInvoicePaid } from "@/lib/payments/actions";
import { IconCheck } from "@/components/Icon";

// Pakistan rail — no card checkout. Shows payment instructions and an
// "I've paid" button that flags the invoice for manual verification.
export function PakistanBilling({
  invoiceNumber,
  amountLabel,
  status,
  bankDetails,
  easypaisa,
  jazzcash,
}: {
  invoiceNumber: string;
  amountLabel: string;
  status: "paid" | "due" | "pending_verification";
  bankDetails: string;
  easypaisa: string;
  jazzcash: string;
}) {
  const [pending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(status);
  const [error, setError] = useState<string | null>(null);

  function onPaid() {
    setError(null);
    startTransition(async () => {
      const res = await markInvoicePaid(invoiceNumber);
      if (res.ok) setLocalStatus("pending_verification");
      else setError(res.error ?? "Something went wrong.");
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <PayMethod title="Bank transfer" value={bankDetails} />
        <PayMethod title="EasyPaisa" value={easypaisa} />
        <PayMethod title="JazzCash" value={jazzcash} />
      </div>

      <div className="border border-grey-line p-5">
        <p className="font-body text-sm text-ink/70">
          Send <strong>{amountLabel}</strong> using any method above, then use
          the reference <strong>{invoiceNumber}</strong>. Once you&rsquo;ve paid,
          press the button — we&rsquo;ll verify and mark the invoice paid,
          usually within one business day.
        </p>

        <div className="mt-4">
          {localStatus === "pending_verification" ? (
            <div className="flex items-center gap-2 border-l-2 border-purple bg-purple/5 px-4 py-3 font-body text-sm text-ink">
              <IconCheck size={18} className="text-purple" />
              Payment reported — pending verification. We&rsquo;ll confirm
              shortly.
            </div>
          ) : localStatus === "paid" ? (
            <div className="flex items-center gap-2 font-body text-sm text-ink">
              <IconCheck size={18} className="text-purple" /> Paid.
            </div>
          ) : (
            <button
              type="button"
              onClick={onPaid}
              disabled={pending}
              className="btn-primary disabled:opacity-60"
            >
              {pending ? "Recording…" : "I've paid"}
            </button>
          )}
          {error && <p className="mt-2 font-body text-sm text-ink">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function PayMethod({ title, value }: { title: string; value: string }) {
  const placeholder = value.startsWith("[");
  return (
    <div className="border border-grey-line p-4">
      <p className="eyebrow text-ink/50">{title}</p>
      <p
        className={`mt-2 break-words font-body text-sm ${
          placeholder ? "text-ink/40" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
