// import type { Metadata } from "next";
// import { LegalLayout } from "@/components/LegalLayout";
// import { SITE } from "@/lib/constants";

// export const metadata: Metadata = {
//   title: "Terms of Service",
//   description:
//     "The terms that govern your use of the Xynetra website, client dashboard, and automation services.",
// };

// export default function TermsPage() {
//   return (
//     <LegalLayout title="Terms of Service" updated="9 July 2026">
//       <p>
//         These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use
//         of the Xynetra website, client dashboard, and automation services (the
//         &ldquo;Services&rdquo;). By using the Services, you agree to these Terms.
//         If you use the Services on behalf of a business, you confirm you have
//         authority to bind that business.
//       </p>

//       <h2>1. The Services</h2>
//       <p>
//         Xynetra provides AI automation systems that send confirmations,
//         reminders, and lead responses, and that book and recover appointments on
//         behalf of business clients — including through the WhatsApp Business
//         Platform. Specific features, limits, and pricing are described in your
//         order or plan.
//       </p>

//       <h2>2. Accounts</h2>
//       <p>
//         You are responsible for the accuracy of your account details, for keeping
//         your login credentials secure, and for all activity under your account.
//         Tell us promptly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> if
//         you suspect unauthorised use.
//       </p>

//       <h2>3. Acceptable use</h2>
//       <ul>
//         <li>
//           You will use the Services only for lawful business messaging and will
//           obtain any consent required to message your customers.
//         </li>
//         <li>
//           You will comply with the WhatsApp Business Platform terms, Meta&rsquo;s
//           policies, and applicable anti-spam and privacy laws.
//         </li>
//         <li>
//           You will not use the Services to send prohibited, deceptive, or
//           harassing content, or to contact people who have opted out.
//         </li>
//       </ul>

//       <h2>4. Billing and payment</h2>
//       <p>
//         Plans are billed on a recurring basis unless stated otherwise.
//         International clients (US/UK) are billed in USD or GBP through Paddle,
//         which acts as merchant of record. Clients in Pakistan are billed in PKR
//         and pay by direct bank transfer, EasyPaisa, or JazzCash against an invoice
//         shown in the dashboard. Fees are non-refundable except where required by
//         law or expressly stated. We may change pricing on renewal with notice.
//       </p>

//       <h2>5. Cancellation</h2>
//       <p>
//         You may cancel a recurring plan at any time; access continues until the
//         end of the current billing period. Some setup or onboarding fees are
//         one-time and non-refundable.
//       </p>

//       <h2>6. Data and privacy</h2>
//       <p>
//         Our handling of personal data is described in our{" "}
//         <a href="/privacy">Privacy Policy</a>. Where we process end-customer data
//         on your behalf, you are the controller and we are the processor, and you
//         are responsible for having a lawful basis to message your customers.
//       </p>

//       <h2>7. Service levels and outcomes</h2>
//       <p>
//         We work to deliver the outcomes described for each product, but we do not
//         guarantee specific revenue results, delivery of every message by
//         third-party networks, or uninterrupted availability. Message delivery
//         depends on Meta and mobile carriers, which are outside our control.
//       </p>

//       <h2>8. Intellectual property</h2>
//       <p>
//         Xynetra and its licensors own the Services, software, and brand. We grant
//         you a limited, non-exclusive, non-transferable right to use the Services
//         during your subscription. You retain ownership of your own content and
//         customer data.
//       </p>

//       <h2>9. Confidentiality</h2>
//       <p>
//         Each party will protect the other&rsquo;s non-public information and use
//         it only to perform under these Terms.
//       </p>

//       <h2>10. Disclaimers</h2>
//       <p>
//         The Services are provided &ldquo;as is&rdquo; and &ldquo;as
//         available.&rdquo; To the fullest extent permitted by law, we disclaim all
//         implied warranties, including merchantability and fitness for a particular
//         purpose.
//       </p>

//       <h2>11. Limitation of liability</h2>
//       <p>
//         To the fullest extent permitted by law, Xynetra will not be liable for
//         indirect, incidental, or consequential damages, and our total liability
//         for any claim will not exceed the fees you paid us in the 12 months before
//         the claim.
//       </p>

//       <h2>12. Termination</h2>
//       <p>
//         We may suspend or terminate access for breach of these Terms or misuse of
//         the Services. On termination, your right to use the Services ends; some
//         provisions survive by their nature.
//       </p>

//       <h2>13. Governing law</h2>
//       <p>
//         These Terms are governed by the laws applicable at Xynetra&rsquo;s place
//         of business, without regard to conflict-of-law rules. Nothing here limits
//         rights you have under mandatory local law.
//       </p>

//       <h2>14. Changes</h2>
//       <p>
//         We may update these Terms. We will change the &ldquo;last updated&rdquo;
//         date above and, for material changes, notify account holders. Continued
//         use after changes means you accept the updated Terms.
//       </p>

//       <h2>15. Contact</h2>
//       <p>
//         Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
//       </p>
//     </LegalLayout>
//   );
// }



import type { Metadata } from "next";
import { LegalArticle } from "@/components/LegalArticle";

export const metadata: Metadata = {
  title: "Terms of Service — Xynetra",
  description:
    "The terms governing use of Xynetra Recover and Xynetra's services, including subscriptions, messaging obligations, the 60-day performance guarantee, and liability.",
};

export default function TermsPage() {
  return (
    <LegalArticle
      active="terms"
      eyebrow="Legal"
      title="Terms of Service"
      effectiveDate="13 July 2026"
    >
      <p>
        These Terms of Service (“Terms”) govern access to and use of the
        websites, software, and services provided by Xynetra (“Xynetra”, “we”,
        “us”), including the Xynetra Recover no-show prevention and slot-recovery
        service (together, the “Service”). By creating an account, purchasing a
        subscription, or using the Service, you (“Customer”, “you”) agree to
        these Terms. If you use the Service on behalf of a business, you
        represent that you have authority to bind that business.
      </p>

      <h2>1. The Service</h2>
      <p>
        Xynetra Recover is a subscription software service for appointment-based
        businesses. It connects to your booking calendar, sends automated
        appointment reminders and notifications to your customers via WhatsApp,
        processes customer replies (confirmations, cancellations, and reschedule
        requests), offers cancelled slots to your waitlist, and provides
        periodic performance reports. Features vary by subscription plan as
        described on our pricing page.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You must provide accurate, current information when creating an account
        and keep it updated. You are responsible for safeguarding your login
        credentials and for all activity under your account. Notify us
        immediately at info@xynetra.com of any unauthorized use. You must be at
        least 18 years old and legally capable of entering into contracts to use
        the Service.
      </p>

      <h2>3. Subscriptions, fees, and payment</h2>
      <p>
        Our order process is conducted by our online reseller Paddle.com. Paddle
        is the Merchant of Record for all our orders: Paddle provides
        customer-service inquiries relating to payment and handles returns as set
        out in our Refund Policy. Prices, plans, billing cycles (monthly or
        annual), and any one-time setup fee are shown at checkout. Applicable
        taxes (e.g. VAT or sales tax) are calculated and collected by Paddle
        based on your location.
      </p>
      <p>
        Subscriptions renew automatically at the end of each billing period
        until cancelled. You can cancel at any time from your account dashboard
        or via the cancellation link in your Paddle receipt; cancellation takes
        effect at the end of the current paid period, and you retain access
        until then. We may change prices with at least 30 days’ notice; changes
        apply from your next renewal. Payments in Pakistan may be handled
        directly by Xynetra by bank transfer or mobile wallet under an
        invoice-and-verification process; the terms of this document apply
        equally to such payments.
      </p>

      <h2>4. Your obligations regarding messaging and customer data</h2>
      <p>
        The Service sends messages to your customers on your behalf. You are
        solely responsible for ensuring you have the legal right and any required
        consent to contact each customer whose details you provide to the
        Service, in accordance with laws applicable to you and your customers
        (including, as applicable, the GDPR and ePrivacy rules in the EU/UK, the
        TCPA in the United States, and equivalent local laws). You agree to:
      </p>
      <ul>
        <li>
          Only load contact details of customers with whom you have a genuine
          business/appointment relationship;
        </li>
        <li>
          Honor opt-outs promptly: if a customer asks to stop receiving messages,
          remove them from your booking flow and waitlist;
        </li>
        <li>
          Comply with WhatsApp’s Business Messaging Policy and Meta’s platform
          terms as they apply to messages sent for your business;
        </li>
        <li>
          Not use the Service to send marketing spam, unlawful, deceptive, or
          harassing content.
        </li>
      </ul>
      <p>
        We may suspend messaging for your account if your usage causes our
        messaging channels to be rate-limited, flagged, or blocked by Meta, or if
        we reasonably believe your use violates law or this section.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        You must not: (a) resell, sublicense, or provide the Service to third
        parties except for use within your own business; (b) reverse engineer,
        copy, or create derivative works of the Service; (c) use the Service to
        violate any law or third-party right; (d) interfere with or disrupt the
        integrity or performance of the Service; (e) attempt to gain unauthorized
        access to the Service or its related systems.
      </p>

      <h2>6. Third-party services and dependencies</h2>
      <p>
        The Service depends on third-party platforms, including Meta’s WhatsApp
        Business Platform, Google Calendar, and cloud infrastructure providers.
        We do not control these platforms. Their availability, policies, pricing,
        and technical rules may change, and such changes may affect the Service.
        Message delivery ultimately depends on Meta’s systems and the recipient’s
        device and cannot be guaranteed. Your use of Google Calendar and WhatsApp
        remains subject to those providers’ own terms.
      </p>

      <h2>7. Service availability and support</h2>
      <p>
        We aim to keep the Service available continuously but do not guarantee
        uninterrupted operation. Planned maintenance and factors outside our
        control (including third-party outages) may cause downtime. Support is
        provided by email at info@xynetra.com; response targets vary by plan as
        described on the pricing page.
      </p>

      <h2>8. Performance guarantee</h2>
      <p>
        Where advertised, our performance guarantee works as follows: if, during
        your first 60 days on a paid plan, the value of appointments recovered by
        the Service (recovered slots multiplied by your configured average
        appointment value) is less than the subscription fees you paid for that
        period, we will credit your account with one additional month of service
        free of charge. The guarantee is a service credit, not a cash refund,
        applies once per Customer, and requires that the Service was correctly
        connected to an active calendar during the period.
      </p>

      <h2>9. Data protection</h2>
      <p>
        Our collection and use of personal data is described in our Privacy
        Policy. For personal data of your customers that you provide to the
        Service (such as names, phone numbers, and appointment details), you act
        as the data controller and Xynetra acts as your processor: we process
        that data only to provide the Service to you and in accordance with your
        lawful instructions, applying appropriate technical and organizational
        security measures, and we will assist you, so far as reasonably possible,
        with data-subject requests that relate to data processed by the Service.
      </p>

      <h2>10. Intellectual property</h2>
      <p>
        We retain all rights, title, and interest in the Service, including
        software, workflows, templates, and branding. You receive a limited,
        non-exclusive, non-transferable right to use the Service during your
        subscription. You retain all rights to your business data; you grant us a
        limited license to process it solely to provide the Service. We may use
        aggregated, anonymized usage statistics to improve the Service.
      </p>

      <h2>11. Termination</h2>
      <p>
        You may stop using the Service and cancel at any time. We may suspend or
        terminate your access if you materially breach these Terms and (where
        curable) fail to remedy the breach within 14 days of notice, or
        immediately in the case of unlawful use, non-payment, or risk to the
        platform. Upon termination we will, on request made within 30 days,
        provide an export of your client configuration data, after which we may
        delete your data in accordance with our retention practices.
      </p>

      <h2>12. Disclaimers</h2>
      <p>
        The Service is provided “as is” and “as available”. To the maximum extent
        permitted by law, we disclaim all warranties, express or implied,
        including merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that the Service will be error-free
        or that every reminder or message will be delivered, and we make no
        promise of specific business results except as expressly stated in
        Section 8.
      </p>

      <h2>13. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law: (a) neither party is liable for
        indirect, incidental, special, consequential, or punitive damages, or for
        loss of profits, revenue, goodwill, or data; and (b) our total aggregate
        liability arising out of or relating to the Service is limited to the
        amounts you paid to us for the Service in the 12 months preceding the
        event giving rise to the claim. Nothing in these Terms excludes liability
        that cannot be excluded by law, including liability for fraud.
      </p>

      <h2>14. Indemnity</h2>
      <p>
        You will indemnify and hold harmless Xynetra from claims, damages, and
        reasonable costs arising from: (a) your breach of Section 4 (messaging
        consent and compliance); (b) your customer data or your instructions to
        us; or (c) your unlawful use of the Service.
      </p>

      <h2>15. Changes to the Service or these Terms</h2>
      <p>
        We may modify the Service and these Terms. For material changes to the
        Terms we will give at least 30 days’ notice by email or in-product
        notice; continued use after the effective date constitutes acceptance. If
        you do not agree to a change, you may cancel before it takes effect.
      </p>

      <h2>16. Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws of Pakistan, without regard to
        conflict-of-laws rules. The courts of Lahore, Pakistan shall have
        exclusive jurisdiction, except that either party may seek injunctive
        relief in any competent court. Nothing in this section deprives you of
        mandatory consumer protections of the country in which you reside.
      </p>

      <h2>17. Contact</h2>
      <p>Xynetra, Lahore, Pakistan. Email: info@xynetra.com.</p>
    </LegalArticle>
  );
}