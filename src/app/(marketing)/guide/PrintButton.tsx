// // src/app/(marketing)/guide/page.tsx
// import type { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Staff Guide — Xynetra',
//   description: 'One-page printable staff guide for Xynetra AI booking assistant.',
// }

// export default function GuidePage() {
//   return (
//     <div className="min-h-screen bg-white text-zinc-900">
//       <div className="max-w-2xl mx-auto px-6 py-12 print:py-6">
//         {/* Header */}
//         <div className="text-center mb-8 border-b border-zinc-200 pb-6">
//           <h1 className="text-3xl font-bold">Xynetra — Staff Guide</h1>
//           <p className="text-zinc-500 mt-1">One-page quick reference for your team</p>
//         </div>

//         {/* Rule 1 */}
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
//             <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
//               1
//             </span>
//             Event Title Rule
//           </h2>
//           <p className="text-zinc-700 mb-3">
//             Every calendar booking <strong>must</strong> contain the customer&apos;s phone number in
//             international format in the event title. Without it, the AI assistant cannot send
//             WhatsApp reminders.
//           </p>
//           <div className="bg-zinc-100 rounded-lg p-4 space-y-2 font-mono text-sm">
//             <p className="text-emerald-700">✓ Correct:</p>
//             <p className="pl-4">Sara +14155551234</p>
//             <p className="pl-4">Haircut — Ahmed +923001234567</p>
//             <p className="text-red-600 mt-3">✗ Wrong:</p>
//             <p className="pl-4">Sara</p>
//             <p className="pl-4">Haircut — Ahmed (0300-1234567)</p>
//           </div>
//         </section>

//         {/* Rule 2 */}
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
//             <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
//               2
//             </span>
//             What Customers Can Reply
//           </h2>
//           <p className="text-zinc-700 mb-3">
//             When a customer receives a reminder, they can reply with:
//           </p>
//           <table className="w-full text-sm border border-zinc-200 rounded-lg overflow-hidden">
//             <thead>
//               <tr className="bg-zinc-100">
//                 <th className="text-left px-4 py-2 font-semibold">Reply</th>
//                 <th className="text-left px-4 py-2 font-semibold">What Happens</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-zinc-200">
//               <tr>
//                 <td className="px-4 py-2 font-mono font-semibold">YES</td>
//                 <td className="px-4 py-2">Confirms the appointment</td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-2 font-mono font-semibold">cancel</td>
//                 <td className="px-4 py-2">Cancels the appointment and frees the slot</td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-2 font-mono font-semibold">reschedule</td>
//                 <td className="px-4 py-2">Starts a rescheduling conversation</td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-2 font-mono font-semibold">AGENT</td>
//                 <td className="px-4 py-2">Escalates to the owner&apos;s WhatsApp</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>

//         {/* Rule 3 */}
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
//             <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
//               3
//             </span>
//             WhatsApp Line Rules
//           </h2>
//           <ul className="list-disc list-inside text-zinc-700 space-y-2">
//             <li>
//               The bot&apos;s WhatsApp number is <strong>never</strong> opened in the WhatsApp app on
//               any phone. It runs on Xynetra&apos;s server.
//             </li>
//             <li>
//               Do <strong>not</strong> try to log into the bot&apos;s number on WhatsApp Web or mobile
//               — it will break the automation.
//             </li>
//           </ul>
//         </section>

//         {/* Support */}
//         <section className="mb-8 rounded-lg bg-zinc-100 p-4">
//           <h2 className="font-bold mb-2">Need Help?</h2>
//           <p className="text-zinc-700 text-sm">
//             Contact Xynetra support:{' '}
//             <a href="mailto:support@xynetra.com" className="text-emerald-700 underline">
//               support@xynetra.com
//             </a>
//           </p>
//         </section>

//         {/* Print button (hidden when printing) */}
//         <div className="text-center print:hidden">
//           <button
//             onClick={() => window.print()}
//             className="px-8 py-3 rounded-lg bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-colors"
//           >
//             🖨 Print This Guide
//           </button>
//         </div>
//       </div>

//       {/* Print styles */}
//       <style>{`
//         @media print {
//           body { font-size: 12pt; }
//           .print\\:hidden { display: none !important; }
//           .print\\:py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
//         }
//       `}</style>
//     </div>
//   )
// }


// src/app/(marketing)/guide/PrintButton.tsx
'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-8 py-3 rounded-lg bg-ink text-paper font-body font-semibold hover:bg-neutral-800 transition-colors"
    >
      🖨 Print This Guide
    </button>
  )
}