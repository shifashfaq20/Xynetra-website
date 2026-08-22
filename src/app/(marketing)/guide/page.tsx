// src/app/(marketing)/guide/page.tsx
import type { Metadata } from 'next'
import { PrintButton } from './PrintButton'

export const metadata: Metadata = {
  title: 'Staff Guide — Xynetra Recovery',
  description: 'One-page printable staff guide for your booking assistant.',
}

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="max-w-2xl mx-auto px-6 py-12 print:py-6">
        <div className="text-center mb-8 border-b border-grey-line pb-6">
          <h1 className="font-display text-3xl font-bold">Staff Guide</h1>
          <p className="font-body text-ink/50 mt-1">One-page quick reference for your team</p>
        </div>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-coral-light text-coral flex items-center justify-center text-sm font-bold">1</span>
            The Event Title Rule
          </h2>
          <p className="font-body text-ink/80 mb-3">
            Every booking <strong>must</strong> include the customer&apos;s phone number in
            international format in the event title. Without it, that customer can&apos;t be reminded.
          </p>
          <div className="bg-grey-light rounded-lg p-4 space-y-2 font-mono text-sm">
            <p className="text-coral font-semibold">✓ Correct:</p>
            <p className="pl-4">Sara +14155551234</p>
            <p className="pl-4">Haircut — Ahmed +923001234567</p>
            <p className="text-ink/50 mt-3 font-semibold">✗ Wrong:</p>
            <p className="pl-4">Sara</p>
            <p className="pl-4">Haircut — Ahmed (0300-1234567)</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-coral-light text-coral flex items-center justify-center text-sm font-bold">2</span>
            What Customers Can Reply
          </h2>
          <table className="w-full font-body text-sm border border-grey-line rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-grey-light">
                <th className="text-left px-4 py-2 font-semibold">Customer replies…</th>
                <th className="text-left px-4 py-2 font-semibold">What happens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-line">
              <tr><td className="px-4 py-2 font-semibold">yes</td><td className="px-4 py-2">Appointment confirmed</td></tr>
              <tr><td className="px-4 py-2 font-semibold">cancel</td><td className="px-4 py-2">Cancelled, slot freed, and offered to your waitlist</td></tr>
              <tr><td className="px-4 py-2 font-semibold">a new time</td><td className="px-4 py-2">Moved to an available slot inside your opening hours</td></tr>
              <tr><td className="px-4 py-2 font-semibold">anything else</td><td className="px-4 py-2">Flagged in your dashboard under &ldquo;Needs Your Reply&rdquo;</td></tr>
            </tbody>
          </table>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-coral-light text-coral flex items-center justify-center text-sm font-bold">3</span>
            Your Business Number
          </h2>
          <ul className="list-disc list-inside font-body text-ink/80 space-y-2">
            <li>Your dedicated number runs on our platform — <strong>never</strong> open it in the WhatsApp app on any phone.</li>
            <li>Don&apos;t try to log into it on WhatsApp Web or mobile — that disconnects your reminders.</li>
            <li>Keep using your normal number for everyday chat with customers.</li>
          </ul>
        </section>

        <section className="mb-8 rounded-lg bg-grey-light p-4">
          <h2 className="font-display font-bold mb-2">Need Help?</h2>
          <p className="font-body text-ink/80 text-sm">
            Contact support:{' '}
            <a href="mailto:support@xynetra.com" className="text-coral underline">support@xynetra.com</a>
          </p>
        </section>

        <div className="text-center print:hidden">
          <PrintButton />
        </div>
      </div>

      <style>{`
        @media print {
          body { font-size: 12pt; }
          .print\\:hidden { display: none !important; }
          .print\\:py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
        }
      `}</style>
    </div>
  )
}