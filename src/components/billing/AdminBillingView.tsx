// import { getAllInvoicesForAdmin } from "@/lib/account";

// const STATUS_LABEL: Record<string, string> = {
//   paid: "Paid",
//   due: "Due",
//   pending_verification: "Pending verification",
// };

// export default async function AdminBillingView() {
//   const invoices = await getAllInvoicesForAdmin();

//   return (
//     <div>
//       <header className="border-b border-grey-line pb-6">
//         <p className="eyebrow text-purple">Admin · Billing</p>
//         <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
//           Client invoices
//         </h1>
//         <p className="mt-1 font-body text-sm text-ink/60">
//           All invoices across every client account.
//         </p>
//       </header>

//       <section className="mt-8">
//         <div className="overflow-x-auto border border-grey-line">
//           <table className="w-full min-w-[640px] border-collapse">
//             <thead>
//               <tr className="border-b border-grey-line bg-grey-light text-left">
//                 <Th>Client</Th>
//                 <Th>Invoice</Th>
//                 <Th>Period</Th>
//                 <Th>Amount</Th>
//                 <Th>Status</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((inv) => (
//                 <tr
//                   key={inv.number}
//                   className="border-b border-grey-line last:border-0"
//                 >
//                   <Td>{inv.client}</Td>
//                   <Td className="font-mono text-xs">{inv.number}</Td>
//                   <Td>{inv.period}</Td>
//                   <Td>
//                     {inv.currency} {inv.amount.toLocaleString("en-US")}
//                   </Td>
//                   <Td>
//                     <span className="font-body text-sm font-semibold text-ink/80">
//                       {STATUS_LABEL[inv.status] ?? inv.status}
//                     </span>
//                   </Td>
//                 </tr>
//               ))}
//               {invoices.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-4 py-10 text-center font-body text-sm text-ink/50"
//                   >
//                     No invoices yet. They appear here once clients pay.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
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


import { getAllInvoicesForAdmin } from "@/lib/account";

type Invoice = {
  client: string;
  number: string;
  period: string;
  amount: number;
  currency: string;
  status: string;
};

const STATUS_LABEL: Record<string, string> = {
  paid: "Paid",
  due: "Due",
  pending_verification: "Pending verification",
};

export default async function AdminBillingView() {
  const invoices = (await getAllInvoicesForAdmin()) as Invoice[];

  return (
    <div>
      <header className="border-b border-grey-line pb-6">
        <p className="eyebrow text-purple">Admin · Billing</p>

        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
          Client invoices
        </h1>

        <p className="mt-1 font-body text-sm text-ink/60">
          All invoices across every client account.
        </p>
      </header>

      <section className="mt-8">
        <div className="overflow-x-auto border border-grey-line">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-grey-line bg-grey-light text-left">
                <Th>Client</Th>
                <Th>Invoice</Th>
                <Th>Period</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv: Invoice) => (
                <tr
                  key={inv.number}
                  className="border-b border-grey-line last:border-0"
                >
                  <Td>{inv.client}</Td>

                  <Td className="font-mono text-xs">{inv.number}</Td>

                  <Td>{inv.period}</Td>

                  <Td>
                    {inv.currency} {Number(inv.amount).toLocaleString("en-US")}
                  </Td>

                  <Td>
                    <span className="font-body text-sm font-semibold text-ink/80">
                      {STATUS_LABEL[inv.status] ?? inv.status}
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
                    No invoices yet. They appear here once clients pay.
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