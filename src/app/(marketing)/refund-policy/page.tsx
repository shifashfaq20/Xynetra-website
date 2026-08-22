import type { Metadata } from "next";
import { LegalArticle } from "@/components/LegalArticle";

export const metadata: Metadata = {
  title: "Refund Policy — Xynetra",
  description:
    "Xynetra's refund policy: 14-day money-back guarantee, setup-fee refunds, cancellations, annual plans, the 60-day performance guarantee, and how to request a refund.",
};

export default function RefundPolicyPage() {
  return (
    <LegalArticle
      active="refund"
      eyebrow="Legal"
      title="Refund Policy"
      effectiveDate="13 July 2026"
    >
      <p>
        We want you to buy Xynetra Recover with confidence. This policy explains
        when refunds are available and how to request one. Our payments are
        processed by Paddle.com as Merchant of Record, so approved refunds are
        issued by Paddle to your original payment method.
      </p>

      <h2>1. 14-day money-back guarantee (first purchase)</h2>
      <p>
        If you are not satisfied with the Service, you may request a full refund
        of your first subscription payment within 14 days of the initial purchase
        — no questions asked. This applies once per customer and covers the first
        billing period of your first subscription (monthly or annual).
      </p>

      <h2>2. Setup fee</h2>
      <p>
        The one-time setup fee is fully refundable if you cancel before onboarding
        work has begun. Once onboarding has started (number registration, calendar
        integration, or configuration work performed), the setup fee is
        non-refundable, as it pays for work already carried out.
      </p>

      <h2>3. Renewals and cancellations</h2>
      <p>
        Subscriptions renew automatically. You can cancel at any time from your
        dashboard or via the link in your Paddle receipt; you keep access until
        the end of the paid period, and no further charges are made. We do not
        provide prorated refunds for unused time in a billing period after
        cancellation. If a renewal charge was made in error and you contact us
        within 7 days of the charge without having materially used the Service in
        the new period, we will refund that renewal as a courtesy.
      </p>

      <h2>4. Annual plans</h2>
      <p>
        Annual subscriptions are covered by the 14-day money-back guarantee
        above. After 14 days, annual fees are non-refundable for the remainder of
        the term, but you may cancel renewal at any time.
      </p>

      <h2>5. Performance guarantee</h2>
      <p>
        Separately from refunds, our 60-day performance guarantee (described in
        the Terms of Service) provides a free additional month of service if the
        Service does not recover at least its cost in your first 60 days. The
        guarantee is a service credit and does not create an additional cash
        refund right.
      </p>

      <h2>6. Exceptions</h2>
      <p>
        We may decline refunds where we detect abuse of this policy (e.g.
        repeated purchase-and-refund cycles), fraud, or material breach of our
        Terms of Service. Nothing in this policy limits your statutory rights:
        consumers in the EU, UK, and other jurisdictions retain any non-waivable
        rights under local law, and where local law provides a longer or broader
        remedy, that law prevails.
      </p>

      <h2>7. How to request a refund</h2>
      <p>
        Email info@xynetra.com from your account email with your Paddle
        order/receipt number, or reply to your Paddle receipt email. We (or
        Paddle) will confirm the outcome within 5 business days. Approved refunds
        are returned to the original payment method, typically within 5–10
        business days depending on your bank. For Pakistan-based customers who
        paid by bank transfer or mobile wallet, approved refunds are returned to
        the originating account within 10 business days.
      </p>

      <h2>8. Contact</h2>
      <p>Xynetra, Lahore, Pakistan. Email: info@xynetra.com.</p>
    </LegalArticle>
  );
}