// import type { Metadata } from "next";
// import { LegalLayout } from "@/components/LegalLayout";
// import { SITE } from "@/lib/constants";

// export const metadata: Metadata = {
//   title: "Privacy Policy",
//   description:
//     "How Xynetra collects, uses, and protects personal data, including data processed through the WhatsApp Business Platform (Meta) and our client services.",
// };

// export default function PrivacyPage() {
//   return (
//     <LegalLayout title="Privacy Policy" updated="9 July 2026">
//       <p>
//         This Privacy Policy explains how Xynetra (&ldquo;Xynetra,&rdquo;
//         &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
//         shares, and protects personal data when you visit {SITE.domain}, use our
//         client dashboard, or interact with automated messages we send on behalf
//         of our clients through the WhatsApp Business Platform and other channels.
//       </p>

//       <h2>1. Who we are</h2>
//       <p>
//         Xynetra builds AI automation systems for small businesses. Depending on
//         the interaction, we act either as a <strong>data controller</strong> (for
//         our own website, marketing, and client accounts) or as a{" "}
//         <strong>data processor</strong> (when we process end-customer messages on
//         behalf of a business client who is the controller).
//       </p>

//       <h2>2. Data we collect</h2>
//       <ul>
//         <li>
//           <strong>Account data:</strong> name, business name, email address, and
//           billing region when you sign up for the client dashboard.
//         </li>
//         <li>
//           <strong>Usage data:</strong> pages visited, device and browser type,
//           and aggregate analytics used to improve the service.
//         </li>
//         <li>
//           <strong>Messaging data:</strong> when our clients use Xynetra to
//           message their customers, we process phone numbers, message content,
//           appointment and lead details, and delivery status through the WhatsApp
//           Business Platform (provided by Meta).
//         </li>
//         <li>
//           <strong>Billing data:</strong> plan, invoices, and payment status.
//           International card payments are processed by Paddle as merchant of
//           record; we do not store full card numbers.
//         </li>
//       </ul>

//       <h2>3. How we use data</h2>
//       <ul>
//         <li>To provide, operate, and improve our services and dashboard.</li>
//         <li>
//           To send appointment confirmations, reminders, and lead responses on
//           behalf of our business clients.
//         </li>
//         <li>To process billing and prevent fraud.</li>
//         <li>To respond to enquiries and provide support.</li>
//         <li>To meet legal and regulatory obligations.</li>
//       </ul>

//       <h2>4. WhatsApp and Meta Platform data</h2>
//       <p>
//         Messages sent through the WhatsApp Business Platform are subject to
//         Meta&rsquo;s terms and policies. We access only the data needed to
//         deliver the messaging outcomes our clients ask for — such as sending a
//         confirmation or booking a slot. We do not sell this data, and we do not
//         use WhatsApp message content for advertising. End customers can opt out
//         of messages at any time by replying to stop, and we honour those requests
//         promptly.
//       </p>

//       <h2>5. Legal bases (UK/EU)</h2>
//       <p>
//         Where UK or EU data protection law applies, we rely on: performance of a
//         contract (to run your account and services); legitimate interests (to
//         improve and secure the service); consent (for marketing where required);
//         and legal obligation (for tax and compliance records).
//       </p>

//       <h2>6. Sharing</h2>
//       <p>
//         We share data only with service providers that help us run Xynetra —
//         including Supabase (database and authentication), Meta (WhatsApp Business
//         Platform), and Paddle (international payments). Each processes data under
//         its own agreement and applicable law. We do not sell personal data.
//       </p>

//       <h2>7. International transfers</h2>
//       <p>
//         We serve clients in the United States, the United Kingdom, and Pakistan.
//         Data may be processed in any of these regions and by our providers
//         elsewhere, using appropriate safeguards such as standard contractual
//         clauses where required.
//       </p>

//       <h2>8. Retention</h2>
//       <p>
//         We keep personal data only as long as needed for the purposes above or as
//         required by law. Messaging data processed on behalf of clients is retained
//         according to the client&rsquo;s instructions and applicable retention
//         rules.
//       </p>

//       <h2>9. Your rights</h2>
//       <p>
//         Depending on your location, you may have the right to access, correct,
//         delete, or port your data, and to object to or restrict certain
//         processing. To exercise these rights, email{" "}
//         <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. If we process your data
//         on behalf of a business (for example, a clinic that messages you), please
//         contact that business directly; we will support their response.
//       </p>

//       <h2>10. Security</h2>
//       <p>
//         We use encryption in transit, access controls, and reputable
//         infrastructure providers to protect data. No system is perfectly secure,
//         but we work to keep your data safe and to notify you of material
//         incidents as required by law.
//       </p>

//       <h2>11. Children</h2>
//       <p>
//         Our services are for businesses and are not directed to children under 16.
//         We do not knowingly collect data from children.
//       </p>

//       <h2>12. Changes</h2>
//       <p>
//         We may update this policy from time to time. We will change the
//         &ldquo;last updated&rdquo; date above and, for material changes, notify
//         account holders.
//       </p>

//       <h2>13. Contact</h2>
//       <p>
//         Questions about this policy? Email{" "}
//         <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
//       </p>
//     </LegalLayout>
//   );
// }




import type { Metadata } from "next";
import { LegalArticle } from "@/components/LegalArticle";

export const metadata: Metadata = {
  title: "Privacy Policy — Xynetra",
  description:
    "How Xynetra collects, uses, and protects personal data, our controller and processor roles, sub-processors, international transfers, retention, and your rights under GDPR, UK GDPR, and CCPA.",
};

export default function PrivacyPage() {
  return (
    <LegalArticle
      active="privacy"
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="13 July 2026"
    >
      <p>
        This Privacy Policy explains how Xynetra (“we”, “us”) collects, uses, and
        protects personal data in connection with our websites and the Xynetra
        Recover service (the “Service”). We are committed to handling personal
        data in line with the EU General Data Protection Regulation (GDPR), the
        UK GDPR, the California Consumer Privacy Act (CCPA/CPRA), and other
        applicable privacy laws.
      </p>

      <h2>1. Who this policy covers, and our two roles</h2>
      <p>We process personal data in two distinct roles:</p>
      <ul>
        <li>
          <strong>As a controller</strong> — for data about you, our customer:
          account details, billing information, website usage, and communications
          with us.
        </li>
        <li>
          <strong>As a processor</strong> — for data about your customers (the
          people who book appointments with your business): names, phone numbers,
          appointment times, and message content. We process this data only on
          your behalf and under your instructions to deliver the Service. If you
          are an end customer of one of our business clients, that business is
          responsible for your data; please direct requests to them, and we will
          assist them in fulfilling your rights.
        </li>
      </ul>

      <h2>2. Data we collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> name, business name, email address,
          password (stored as a secure hash), billing region.
        </li>
        <li>
          <strong>Billing data:</strong> processed by our Merchant of Record,
          Paddle.com, which collects payment card details, billing address, and
          tax information. We never receive or store full card numbers.
          Pakistan-based customers paying by bank transfer or mobile wallet
          provide payment reference details which we store for verification.
        </li>
        <li>
          <strong>Service data (processed on behalf of our clients):</strong>{" "}
          customer names, WhatsApp phone numbers, appointment dates and times,
          message content exchanged with the automated assistant, waitlist
          entries, and calendar event details.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser type, device
          information, and usage logs collected when you use our website and
          dashboard, including via strictly necessary cookies for authentication.
          We do not use advertising cookies.
        </li>
      </ul>

      <h2>3. How and why we use data (legal bases)</h2>
      <ul>
        <li>
          <strong>To provide the Service and perform our contract with you</strong>{" "}
          (Art. 6(1)(b) GDPR): operating reminders, processing replies, slot
          recovery, reports, and support.
        </li>
        <li>
          <strong>To process payments and comply with legal obligations</strong>{" "}
          (Art. 6(1)(c)): invoicing, tax, and accounting via Paddle.
        </li>
        <li>
          <strong>For our legitimate interests</strong> (Art. 6(1)(f)): securing
          the Service, preventing abuse, improving features using aggregated and
          de-identified usage data, and sending service-related communications.
        </li>
        <li>
          <strong>With your consent</strong> (Art. 6(1)(a)) where required: for
          example, marketing emails, which you can withdraw at any time via the
          unsubscribe link.
        </li>
        <li>
          <strong>Automated message classification:</strong> customer replies are
          processed by an AI language model to classify intent (confirm, cancel,
          reschedule, or other) so the Service can respond. Messages that cannot
          be handled automatically are forwarded to the relevant business owner.
          This processing is essential to the Service; no automated decision with
          legal or similarly significant effect is made about individuals.
        </li>
      </ul>

      <h2>4. Service providers (sub-processors)</h2>
      <p>
        We share personal data only with providers necessary to run the Service,
        under contracts that protect the data:
      </p>
      <ul>
        <li>
          <strong>Paddle.com Market Ltd</strong> — Merchant of Record, payment
          processing and tax handling (UK/EU/US).
        </li>
        <li>
          <strong>Supabase</strong> — database and authentication hosting (cloud
          regions as configured).
        </li>
        <li>
          <strong>Meta Platforms (WhatsApp Business Platform)</strong> — delivery
          of WhatsApp messages.
        </li>
        <li>
          <strong>Google LLC (Google Calendar API)</strong> — reading and
          updating appointment events.
        </li>
        <li>
          <strong>OpenAI</strong> — processing of message text for intent
          classification.
        </li>
        <li>
          <strong>Hosting and infrastructure providers</strong> for our
          automation and website (including our server host and Vercel).
        </li>
      </ul>
      <p>
        We do not sell personal data, and we do not share personal data for
        cross-context behavioral advertising.
      </p>

      <h2>5. International transfers</h2>
      <p>
        We operate from Pakistan and use service providers in the United States,
        the EU, and the UK. Where personal data subject to the GDPR or UK GDPR is
        transferred internationally, we rely on appropriate safeguards such as the
        European Commission’s Standard Contractual Clauses and, where applicable,
        the EU–US Data Privacy Framework certifications of our providers.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep account data for as long as your account is active and for up to
        12 months afterwards, unless a longer period is required by law (e.g. tax
        records retained by Paddle). Service data (appointments, reminders,
        message logs) is retained while your subscription is active to operate
        the Service and produce reports, and is deleted or anonymized within 90
        days of account termination, except where retention is legally required.
        You may request earlier deletion at any time.
      </p>

      <h2>7. Security</h2>
      <p>
        We apply appropriate technical and organizational measures: encryption in
        transit (TLS), encrypted storage with our cloud providers, row-level
        security and role-based access on databases, secret-managed API
        credentials, and least-privilege access. No system is perfectly secure;
        if we become aware of a personal data breach affecting you, we will
        notify you and the relevant authorities as required by law.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on your location, you may have the right to: access the
        personal data we hold about you; receive a copy in a portable format;
        correct inaccurate data; request deletion; restrict or object to
        processing; withdraw consent; and not be discriminated against for
        exercising these rights (CCPA). To exercise any right, email
        info@xynetra.com; we respond within 30 days (or as required by applicable
        law). EU/UK residents may lodge a complaint with their local supervisory
        authority; California residents may contact the California Privacy
        Protection Agency.
      </p>

      <h2>9. Children</h2>
      <p>
        The Service is a business tool and is not directed at children. We do not
        knowingly collect personal data from anyone under 16 as a controller.
        Appointment data processed on behalf of our clients may incidentally
        include minors (e.g. a parent booking for a child); such data is
        controlled by the relevant business.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        announced by email or in-product notice, with the updated effective date
        shown at the top. The current version always applies.
      </p>

      <h2>11. Contact</h2>
      <p>
        Data controller: Xynetra, Lahore, Pakistan. Email: info@xynetra.com.
      </p>
    </LegalArticle>
  );
}