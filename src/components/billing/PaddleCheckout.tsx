// "use client";

// import { useEffect, useState } from "react";
// import { initializePaddle, type Paddle } from "@paddle/paddle-js";

// // International rail — Paddle Billing overlay checkout for the subscription.
// // Uses sandbox + placeholder IDs until the Paddle account is approved.
// export function PaddleCheckout({
//   environment,
//   clientToken,
//   priceId,
//   email,
//   configured,
//   ctaLabel,
// }: {
//   environment: "sandbox" | "production";
//   clientToken: string;
//   priceId: string;
//   email: string;
//   configured: boolean;
//   ctaLabel: string;
// }) {
//   const [paddle, setPaddle] = useState<Paddle | undefined>();
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!configured) return;
//     initializePaddle({ environment, token: clientToken })
//       .then((p) => setPaddle(p))
//       .catch(() => setError("Payment overlay failed to load. Please retry."));
//   }, [configured, environment, clientToken]);

//   function openCheckout() {
//     if (!paddle) return;
//     paddle.Checkout.open({
//       items: [{ priceId, quantity: 1 }],
//       customer: email ? { email } : undefined,
//       settings: { displayMode: "overlay", theme: "light" },
//     });
//   }

//   if (!configured) {
//     return (
//       <div className="border-l-2 border-purple bg-purple/5 px-4 py-3 font-body text-sm text-ink">
//         Card checkout is in sandbox setup. Add your{" "}
//         <code className="font-mono text-xs">PADDLE_CLIENT_TOKEN</code> and{" "}
//         <code className="font-mono text-xs">PADDLE_PRICE_ID</code> to enable the
//         live overlay (see README).
//       </div>
//     );
//   }

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={openCheckout}
//         disabled={!paddle}
//         className="btn-primary disabled:opacity-60"
//       >
//         {paddle ? ctaLabel : "Loading checkout…"}
//       </button>
//       {error && (
//         <p className="mt-2 font-body text-sm text-ink">{error}</p>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

// International rail — Paddle Billing overlay checkout for the subscription.
export function PaddleCheckout({
  environment,
  clientToken,
  priceId,
  email,
  configured,
  ctaLabel,
}: {
  environment: "sandbox" | "production";
  clientToken: string;
  priceId: string;
  email: string;
  configured: boolean;
  ctaLabel: string;
}) {
  const [paddle, setPaddle] = useState<Paddle | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!configured) return;
    initializePaddle({
      environment,
      token: clientToken,
      // Fires for every checkout event. On success we advance immediately;
      // the webhook + checkout-page poll are the backstop if the status
      // hasn't flipped by the time the onboarding gate checks.
      eventCallback: (event) => {
        if (event.name === "checkout.completed") {
          window.location.href = "/onboarding";
        }
      },
    })
      .then((p) => setPaddle(p))
      .catch(() => setError("Payment overlay failed to load. Please retry."));
  }, [configured, environment, clientToken]);

  function openCheckout() {
    if (!paddle) return;
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: email ? { email } : undefined,
      // Rides through to every webhook event — the webhook locates the
      // buyer by this email and flips profiles.subscription_status.
      customData: email ? { email } : undefined,
      settings: { displayMode: "overlay", theme: "light" },
    });
  }

  if (!configured) {
    return (
      <div className="border-l-2 border-purple bg-purple/5 px-4 py-3 font-body text-sm text-ink">
        Card checkout is in sandbox setup. Add your{" "}
        <code className="font-mono text-xs">PADDLE_CLIENT_TOKEN</code> and{" "}
        <code className="font-mono text-xs">PADDLE_PRICE_ID</code> to enable the
        live overlay (see README).
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={openCheckout}
        disabled={!paddle}
        className="btn-primary disabled:opacity-60"
      >
        {paddle ? ctaLabel : "Loading checkout…"}
      </button>
      {error && (
        <p className="mt-2 font-body text-sm text-ink">{error}</p>
      )}
    </div>
  );
}