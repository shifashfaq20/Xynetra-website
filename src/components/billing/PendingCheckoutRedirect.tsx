// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   readPendingCheckout,
//   clearPendingCheckout,
// } from "@/lib/payments/plans";

// export default function PendingCheckoutRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     const pending = readPendingCheckout();
//     if (!pending) return;

//     // Avoid a redirect loop if we're already on the checkout page.
//     if (window.location.pathname.startsWith("/checkout")) return;

//     clearPendingCheckout();
//     router.replace(
//       `/checkout?plan=${pending.plan}&billing=${pending.billing}`,
//     );
//   }, [router]);

//   return null;
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  readPendingCheckout,
  clearPendingCheckout,
} from "@/lib/payments/plans";

export default function PendingCheckoutRedirect() {
  const router = useRouter();

  useEffect(() => {
    const pending = readPendingCheckout();
    if (!pending) return;

    // Avoid a redirect loop if we're already on the checkout page.
    if (window.location.pathname.startsWith("/app/checkout")) return;

    clearPendingCheckout();
    router.replace(
      `/app/checkout?plan=${pending.plan}&billing=${pending.billing}`,
    );
  }, [router]);

  return null;
}
