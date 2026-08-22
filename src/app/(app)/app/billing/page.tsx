// import type { Metadata } from "next";
// import { getAccount, getAccountInvoices } from "@/lib/account";
// import { planForRegion, formatMoney } from "@/lib/demo";
// import {
//   railForRegion,
//   paddleConfig,
//   paddleConfigured,
//   pakistanPayment,
// } from "@/lib/payments";
// import { PaddleCheckout } from "@/components/billing/PaddleCheckout";
// import { PakistanBilling } from "@/components/billing/PakistanBilling";

// export const metadata: Metadata = {
//   title: "Billing",
//   robots: { index: false },
// };

// const STATUS_STYLE: Record<string, string> = {
//   paid: "text-ink/60",
//   due: "text-ink",
//   pending_verification: "text-purple",
// };
// const STATUS_LABEL: Record<string, string> = {
//   paid: "Paid",
//   due: "Due",
//   pending_verification: "Pending verification",
// };

// export default async function BillingPage() {
//   const account = (await getAccount())!;
//   const plan = planForRegion(account.billingRegion);
//   const invoices = await getAccountInvoices(account);
//   const rail = railForRegion(account.billingRegion);
//   const dueInvoice = invoices.find((i) => i.status !== "paid") ?? invoices[0];

//   return (
//     <div>
//       <header className="border-b border-grey-line pb-6">
//         <p className="eyebrow text-purple">Billing</p>
//         <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//           Plan &amp; payments
//         </h1>
//         <p className="mt-1 font-body text-sm text-ink/60">
//           Region:{" "}
//           <span className="font-semibold text-ink">
//             {account.billingRegion === "pakistan"
//               ? "Pakistan (PKR)"
//               : "International (USD)"}
//           </span>
//         </p>
//       </header>

//       {/* Current plan */}
//       <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
//         <div className="border border-grey-line p-6">
//           <p className="eyebrow text-ink/50">Current plan</p>
//           <div className="mt-3 flex items-baseline gap-2">
//             <span className="font-display text-2xl font-bold">{plan.name}</span>
//           </div>
//           <p className="mt-1 font-body text-sm text-ink/60">
//             {formatMoney(plan.price, plan.currency)} {plan.cadence}
//           </p>

//           <div className="mt-6 border-t border-grey-line pt-5">
//             <p className="eyebrow text-ink/50">Amount due now</p>
//             <p className="mt-2 font-display text-3xl font-bold text-ink">
//               {formatMoney(dueInvoice.amount, dueInvoice.currency)}
//             </p>
//             <p className="mt-1 font-body text-xs text-ink/55">
//               Invoice {dueInvoice.number} · {dueInvoice.period}
//             </p>
//           </div>
//         </div>

//         {/* Payment rail — chosen by region */}
//         <div className="border border-grey-line p-6">
//           <p className="eyebrow text-ink/50">
//             {rail === "paddle" ? "Pay by card" : "Pay by transfer"}
//           </p>
//           <div className="mt-4">
//             {rail === "paddle" ? (
//               <>
//                 <p className="font-body text-sm text-ink/70">
//                   Secure card payment through Paddle, our merchant of record.
//                   Manage or update your payment method in the checkout.
//                 </p>
//                 <div className="mt-4">
//                   <PaddleCheckout
//                     environment={paddleConfig.environment}
//                     clientToken={paddleConfig.clientToken}
//                     priceId={paddleConfig.priceId}
//                     email={account.email}
//                     configured={paddleConfigured()}
//                     ctaLabel={
//                       dueInvoice.status === "due"
//                         ? "Pay / update payment method"
//                         : "Update payment method"
//                     }
//                   />
//                 </div>
//               </>
//             ) : (
//               <p className="font-body text-sm text-ink/70">
//                 No card needed. Pay by bank transfer, EasyPaisa, or JazzCash
//                 using the details below, then confirm your payment.
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Pakistan manual instructions */}
//       {rail === "pakistan" && dueInvoice.status !== "paid" && (
//         <section className="mt-6 border border-grey-line p-6">
//           <p className="eyebrow text-ink/50">Payment instructions</p>
//           <h2 className="mt-2 font-display text-xl font-bold">
//             Pay invoice {dueInvoice.number}
//           </h2>
//           <div className="mt-5">
//             <PakistanBilling
//               invoiceNumber={dueInvoice.number}
//               amountLabel={formatMoney(dueInvoice.amount, dueInvoice.currency)}
//               status={dueInvoice.status}
//               bankDetails={pakistanPayment.bankDetails}
//               easypaisa={pakistanPayment.easypaisa}
//               jazzcash={pakistanPayment.jazzcash}
//             />
//           </div>
//         </section>
//       )}

//       {/* Invoice history */}
//       <section className="mt-8">
//         <p className="eyebrow text-ink/50">Invoices</p>
//         <div className="mt-4 overflow-x-auto border border-grey-line">
//           <table className="w-full min-w-[520px] border-collapse">
//             <thead>
//               <tr className="border-b border-grey-line bg-grey-light text-left">
//                 <Th>Invoice</Th>
//                 <Th>Period</Th>
//                 <Th>Issued</Th>
//                 <Th>Amount</Th>
//                 <Th>Status</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((inv) => (
//                 <tr key={inv.number} className="border-b border-grey-line last:border-0">
//                   <Td className="font-mono text-xs">{inv.number}</Td>
//                   <Td>{inv.period}</Td>
//                   <Td>{inv.issuedAt}</Td>
//                   <Td>{formatMoney(inv.amount, inv.currency)}</Td>
//                   <Td>
//                     <span
//                       className={`font-body text-sm font-semibold ${STATUS_STYLE[inv.status]}`}
//                     >
//                       {STATUS_LABEL[inv.status]}
//                     </span>
//                   </Td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <p className="mt-3 font-body text-xs text-ink/50">
//           Invoices are demo records seeded for your account. The table body
//           stays black-on-white — no accent fills (brand rule).
//         </p>
//       </section>
//     </div>
//   );
// }

// function Th({ children }: { children: React.ReactNode }) {
//   return (
//     <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-caption text-ink/60">
//       {children}
//     </th>
//   );
// }
// function Td({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <td className={`px-4 py-3 font-body text-sm text-ink/80 ${className}`}>
//       {children}
//     </td>
//   );
// }




import type { Metadata } from "next";
import { getAccount, getAccountInvoices } from "@/lib/account";
import { isAdminEmail } from "@/lib/admin/roles";
import AdminBillingView from "@/components/billing/AdminBillingView";
import { planForRegion, formatMoney } from "@/lib/demo";
import {
  railForRegion,
  paddleConfig,
  paddleConfigured,
  pakistanPayment,
} from "@/lib/payments";
import { PaddleCheckout } from "@/components/billing/PaddleCheckout";
import { PakistanBilling } from "@/components/billing/PakistanBilling";

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false },
};

const STATUS_STYLE: Record<string, string> = {
  paid: "text-ink/60",
  due: "text-ink",
  pending_verification: "text-purple",
};
const STATUS_LABEL: Record<string, string> = {
  paid: "Paid",
  due: "Due",
  pending_verification: "Pending verification",
};

export default async function BillingPage() {
  const account = (await getAccount())!;

  // ADMIN → all clients' invoices (no plan / no pay-by-card)
  if (isAdminEmail(account.email)) {
    return <AdminBillingView />;
  }

  // CLIENT → own plan + real invoices
  const plan = planForRegion(account.billingRegion);
  const invoices = await getAccountInvoices(account);
  const rail = railForRegion(account.billingRegion);
  const dueInvoice = invoices.find((i) => i.status !== "paid") ?? invoices[0];

  return (
    <div>
      <header className="border-b border-grey-line pb-6">
        <p className="eyebrow text-purple">Billing</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
          Plan &amp; payments
        </h1>
        <p className="mt-1 font-body text-sm text-ink/60">
          Region:{" "}
          <span className="font-semibold text-ink">
            {account.billingRegion === "pakistan"
              ? "Pakistan (PKR)"
              : "International (USD)"}
          </span>
        </p>
      </header>

      {/* Current plan */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="border border-grey-line p-6">
          <p className="eyebrow text-ink/50">Current plan</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold">{plan.name}</span>
          </div>
          <p className="mt-1 font-body text-sm text-ink/60">
            {formatMoney(plan.price, plan.currency)} {plan.cadence}
          </p>

          {dueInvoice && (
            <div className="mt-6 border-t border-grey-line pt-5">
              <p className="eyebrow text-ink/50">Amount due now</p>
              <p className="mt-2 font-display text-3xl font-bold text-ink">
                {formatMoney(dueInvoice.amount, dueInvoice.currency)}
              </p>
              <p className="mt-1 font-body text-xs text-ink/55">
                Invoice {dueInvoice.number} · {dueInvoice.period}
              </p>
            </div>
          )}
        </div>

        {/* Payment rail — chosen by region */}
        <div className="border border-grey-line p-6">
          <p className="eyebrow text-ink/50">
            {rail === "paddle" ? "Pay by card" : "Pay by transfer"}
          </p>
          <div className="mt-4">
            {rail === "paddle" ? (
              <>
                <p className="font-body text-sm text-ink/70">
                  Secure card payment through Paddle, our merchant of record.
                  Manage or update your payment method in the checkout.
                </p>
                <div className="mt-4">
                  <PaddleCheckout
                    environment={paddleConfig.environment}
                    clientToken={paddleConfig.clientToken}
                    priceId={paddleConfig.priceId}
                    email={account.email}
                    configured={paddleConfigured()}
                    ctaLabel={
                      dueInvoice?.status === "due"
                        ? "Pay / update payment method"
                        : "Update payment method"
                    }
                  />
                </div>
              </>
            ) : (
              <p className="font-body text-sm text-ink/70">
                No card needed. Pay by bank transfer, EasyPaisa, or JazzCash
                using the details below, then confirm your payment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Pakistan manual instructions */}
      {rail === "pakistan" && dueInvoice && dueInvoice.status !== "paid" && (
        <section className="mt-6 border border-grey-line p-6">
          <p className="eyebrow text-ink/50">Payment instructions</p>
          <h2 className="mt-2 font-display text-xl font-bold">
            Pay invoice {dueInvoice.number}
          </h2>
          <div className="mt-5">
            <PakistanBilling
              invoiceNumber={dueInvoice.number}
              amountLabel={formatMoney(dueInvoice.amount, dueInvoice.currency)}
              status={dueInvoice.status}
              bankDetails={pakistanPayment.bankDetails}
              easypaisa={pakistanPayment.easypaisa}
              jazzcash={pakistanPayment.jazzcash}
            />
          </div>
        </section>
      )}

      {/* Invoice history */}
      <section className="mt-8">
        <p className="eyebrow text-ink/50">Invoices</p>
        <div className="mt-4 overflow-x-auto border border-grey-line">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b border-grey-line bg-grey-light text-left">
                <Th>Invoice</Th>
                <Th>Period</Th>
                <Th>Issued</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.number}
                  className="border-b border-grey-line last:border-0"
                >
                  <Td className="font-mono text-xs">{inv.number}</Td>
                  <Td>{inv.period}</Td>
                  <Td>{inv.issuedAt}</Td>
                  <Td>{formatMoney(inv.amount, inv.currency)}</Td>
                  <Td>
                    <span
                      className={`font-body text-sm font-semibold ${STATUS_STYLE[inv.status]}`}
                    >
                      {STATUS_LABEL[inv.status]}
                    </span>
                  </Td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center font-body text-sm text-ink/50"
                  >
                    No invoices yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-caption text-ink/60">
      {children}
    </th>
  );
}
function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 font-body text-sm text-ink/80 ${className}`}>
      {children}
    </td>
  );
}