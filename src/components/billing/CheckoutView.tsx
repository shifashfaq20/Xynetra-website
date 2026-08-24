// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import {
//   PLAN_MAP,
//   PADDLE_CLIENT_TOKEN,
//   money,
//   isPlanId,
//   isBilling,
//   readPendingCheckout,
//   clearPendingCheckout,
//   type Plan,
//   type BillingPeriod,
// } from "@/lib/payments/plans";

// /* Local structural type for the Paddle global. We deliberately do NOT augment
//    the global Window interface here — doing so clashes with @paddle/paddle-js
//    if it is installed (TS2717). Casting through this local type compiles
//    whether or not the SDK is present. */
// type PaddleInstance = {
//   Initialize: (options: Record<string, unknown>) => void;
//   Checkout: { open: (options: Record<string, unknown>) => void };
// };

// function getPaddle(): PaddleInstance | undefined {
//   if (typeof window === "undefined") return undefined;
//   return (window as unknown as { Paddle?: PaddleInstance }).Paddle;
// }

// /* ---------------- Paddle loader (idempotent) ---------------- */
// let paddleScriptEnsured = false;
// function ensurePaddleScript() {
//   if (typeof window === "undefined") return;
//   if (paddleScriptEnsured) return;
//   paddleScriptEnsured = true;
//   if (document.querySelector('script[src*="paddle.com/paddle"]')) return;
//   const s = document.createElement("script");
//   s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
//   s.async = true;
//   document.head.appendChild(s);
// }

// function waitForPaddle(timeout = 8000): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const start = Date.now();
//     const tick = () => {
//       if (getPaddle()) return resolve();
//       if (Date.now() - start > timeout)
//         return reject(new Error("Paddle failed to load"));
//       setTimeout(tick, 100);
//     };
//     tick();
//   });
// }

// let paddleInitialized = false;

// /* ---------------- View ---------------- */
// export default function CheckoutView() {
//   const router = useRouter();
//   const params = useSearchParams();

//   // Resolve plan + billing from the URL, falling back to localStorage.
//   const resolved = (() => {
//     const p = params.get("plan");
//     const b = params.get("billing");
//     if (isPlanId(p) && isBilling(b)) return { planId: p, billing: b };
//     const pending = readPendingCheckout();
//     if (pending) return { planId: pending.plan, billing: pending.billing };
//     return null;
//   })();

//   const plan: Plan | null = resolved ? PLAN_MAP[resolved.planId] : null;
//   const billing: BillingPeriod = resolved?.billing ?? "monthly";

//   const [email, setEmail] = useState("");
//   const [ready, setReady] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const autoOpened = useRef(false);

//   // Clear any stashed choice now that we've read it.
//   useEffect(() => {
//     clearPendingCheckout();
//   }, []);

//   function openCheckout(withEmail: string) {
//     const paddle = getPaddle();
//     if (!plan || !paddle) return;
//     const items: { priceId: string; quantity: number }[] = [
//       { priceId: plan.priceIds[billing], quantity: 1 },
//     ];
//     if (plan.setupPriceId) {
//       items.push({ priceId: plan.setupPriceId, quantity: 1 });
//     }
//     paddle.Checkout.open({
//       items,
//       customer: withEmail ? { email: withEmail } : undefined,
//       customData: { plan: plan.id, billing },
//     });
//   }

//   // Fetch email → load Paddle → init once → auto-open once.
//   useEffect(() => {
//     if (!plan) return;
//     if (!PADDLE_CLIENT_TOKEN) {
//       setError(
//         "Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN. Add it to .env.local and restart the dev server.",
//       );
//       return;
//     }

//     let active = true;

//     (async () => {
//       try {
//         // 1) signed-in user's email (so the auto-open includes the customer)
//         let userEmail = "";
//         try {
//           const supabase = createClient();
//           const { data } = await supabase.auth.getUser();
//           userEmail = data.user?.email ?? "";
//         } catch {
//           /* ignore — Paddle will prompt for email if missing */
//         }
//         if (!active) return;
//         if (userEmail) setEmail(userEmail);

//         // 2) load + initialise Paddle
//         ensurePaddleScript();
//         await waitForPaddle();
//         const paddle = getPaddle();
//         if (!paddle) throw new Error("Paddle not available");

//         if (!paddleInitialized) {
//           paddle.Initialize({
//             token: PADDLE_CLIENT_TOKEN,
//             eventCallback: (data: { name?: string }) => {
//               if (data?.name === "checkout.completed") {
//                 router.push("/app/billing?upgraded=1");
//               }
//             },
//             checkout: {
//               settings: { displayMode: "overlay", theme: "light" },
//             },
//           });
//           paddleInitialized = true;
//         }

//         if (!active) return;
//         setReady(true);

//         // 3) auto-open the overlay once
//         if (!autoOpened.current) {
//           autoOpened.current = true;
//           openCheckout(userEmail);
//         }
//       } catch {
//         if (active) setError("Could not load the payment provider.");
//       }
//     })();

//     return () => {
//       active = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [plan?.id, billing]);

//   /* ---------------- Render ---------------- */
//   if (!plan) {
//     return (
//       <div className="mx-auto max-w-xl px-6 py-24 text-center">
//         <h1 className="text-2xl font-bold">No plan selected</h1>
//         <p className="mt-3 text-neutral-600">
//           Pick a plan to continue to secure checkout.
//         </p>
//         <Link
//           href="/pricing"
//           className="mt-6 inline-flex rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
//         >
//           View pricing
//         </Link>
//       </div>
//     );
//   }

//   const price = billing === "annual" ? plan.annual : plan.monthly;

//   return (
//     <div className="mx-auto max-w-xl px-6 py-20">
//       <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
//         Secure checkout
//       </p>
//       <h1 className="mt-3 text-3xl font-bold tracking-tight">
//         Complete your {plan.name} plan
//       </h1>

//       <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="font-semibold">{plan.name}</p>
//             <p className="text-sm text-neutral-500">
//               {billing === "annual" ? "Annual billing" : "Monthly billing"}
//             </p>
//           </div>
//           <p className="text-2xl font-bold">
//             {money(price)}
//             <span className="text-sm font-normal text-neutral-500">/mo</span>
//           </p>
//         </div>

//         <div className="mt-4 flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-3">
//           <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
//             One-time setup fee
//           </span>
//           <span className="font-bold">{money(plan.setup)}</span>
//         </div>

//         <p className="mt-4 text-xs text-neutral-500">
//           Backed by our 60-day performance guarantee. Cancel anytime after the
//           guarantee period.
//         </p>
//       </div>

//       {error ? (
//         <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       ) : (
//         <button
//           type="button"
//           disabled={!ready}
//           onClick={() => openCheckout(email)}
//           className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
//         >
//           {ready ? "Pay with Paddle" : "Preparing payment…"}
//         </button>
//       )}

//       <p className="mt-4 text-center text-xs text-neutral-400">
//         Payments processed securely by Paddle. Need a different plan?{" "}
//         <Link href="/pricing" className="underline">
//           Back to pricing
//         </Link>
//       </p>
//     </div>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  PLAN_MAP,
  PADDLE_CLIENT_TOKEN,
  money,
  isPlanId,
  isBilling,
  readPendingCheckout,
  clearPendingCheckout,
  type Plan,
  type BillingPeriod,
} from "@/lib/payments/plans";

type PaddleInstance = {
  Initialize: (options: Record<string, unknown>) => void;
  Checkout: { open: (options: Record<string, unknown>) => void };
};

function getPaddle(): PaddleInstance | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { Paddle?: PaddleInstance }).Paddle;
}

let paddleScriptEnsured = false;
function ensurePaddleScript() {
  if (typeof window === "undefined") return;
  if (paddleScriptEnsured) return;
  paddleScriptEnsured = true;
  if (document.querySelector('script[src*="paddle.com/paddle"]')) return;
  const s = document.createElement("script");
  s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
  s.async = true;
  document.head.appendChild(s);
}

function waitForPaddle(timeout = 8000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      if (getPaddle()) return resolve();
      if (Date.now() - start > timeout)
        return reject(new Error("Paddle failed to load"));
      setTimeout(tick, 100);
    };
    tick();
  });
}

let paddleInitialized = false;

export default function CheckoutView() {
  const router = useRouter();
  const params = useSearchParams();

  const [resolved, setResolved] = useState<{
    planId: string;
    billing: BillingPeriod;
  } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const p = params.get("plan");
    const b = params.get("billing");

    if (isPlanId(p)) {
      setResolved({
        planId: p,
        billing: isBilling(b) ? b : "monthly",
      });
      setHydrated(true);
      return;
    }

    const pending = readPendingCheckout();
    if (pending && isPlanId(pending.plan)) {
      setResolved({
        planId: pending.plan,
        billing: isBilling(pending.billing) ? pending.billing : "monthly",
      });
      setHydrated(true);
      return;
    }

    setResolved(null);
    setHydrated(true);
  }, [params]);

  const plan: Plan | null =
    resolved && isPlanId(resolved.planId) ? PLAN_MAP[resolved.planId] : null;
  const billing: BillingPeriod = resolved?.billing ?? "monthly";

  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoOpened = useRef(false);

  function openCheckout(withEmail: string) {
    const paddle = getPaddle();
    if (!plan || !paddle) return;

    const items: { priceId: string; quantity: number }[] = [
      { priceId: plan.priceIds[billing], quantity: 1 },
    ];
    if (plan.setupPriceId) {
      items.push({ priceId: plan.setupPriceId, quantity: 1 });
    }

    paddle.Checkout.open({
      items,
      customer: withEmail ? { email: withEmail } : undefined,
      customData: {
        plan: plan.id,
        billing,
        ...(withEmail ? { email: withEmail } : {}),
      },
    });
  }

  useEffect(() => {
    if (!hydrated || !plan) return;

    if (!PADDLE_CLIENT_TOKEN) {
      setError(
        "Card checkout is not configured yet. Please contact support@xynetra.com."
      );
      return;
    }

    let active = true;

    (async () => {
      try {
        let userEmail = "";
        try {
          const supabase = createClient();
          const { data } = await supabase.auth.getUser();
          userEmail = data.user?.email ?? "";
        } catch {
          /* ignore */
        }
        if (!active) return;
        if (userEmail) setEmail(userEmail);

        ensurePaddleScript();
        await waitForPaddle();
        const paddle = getPaddle();
        if (!paddle) throw new Error("Paddle not available");

        if (!paddleInitialized) {
          paddle.Initialize({
            token: PADDLE_CLIENT_TOKEN,
            eventCallback: (data: { name?: string }) => {
              if (data?.name === "checkout.completed") {
                clearPendingCheckout();
                router.push("/onboarding");
              }
            },
            checkout: {
              settings: { displayMode: "overlay", theme: "light" },
            },
          });
          paddleInitialized = true;
        }

        if (!active) return;
        setReady(true);

        if (!autoOpened.current) {
          autoOpened.current = true;
          openCheckout(userEmail);
        }
      } catch {
        if (active) setError("Could not load the payment provider. Please retry.");
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, plan?.id, billing]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center text-neutral-500">
        Loading checkout…
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Plan required
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">
            Choose a plan to continue
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">
            You&apos;re signed in, but you haven&apos;t selected a plan or
            completed payment yet. Go back to pricing, pick a plan, then finish
            checkout. After payment you&apos;ll complete setup and unlock your
            client dashboard.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Back to pricing
            </Link>
            <Link
              href="/login"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-ink hover:bg-neutral-50"
            >
              Use another account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const price = billing === "annual" ? plan.annual : plan.monthly;

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
        Secure checkout
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        Complete your {plan.name} plan
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Pay with Paddle → short onboarding → client dashboard.
      </p>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{plan.name}</p>
            <p className="text-sm text-neutral-500">
              {billing === "annual" ? "Annual billing" : "Monthly billing"}
            </p>
          </div>
          <p className="text-2xl font-bold">
            {money(price)}
            <span className="text-sm font-normal text-neutral-500">/mo</span>
          </p>
        </div>

        {plan.setup != null && Number(plan.setup) > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              One-time setup fee
            </span>
            <span className="font-bold">{money(plan.setup)}</span>
          </div>
        )}
      </div>

      {error ? (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : (
        <button
          type="button"
          disabled={!ready}
          onClick={() => openCheckout(email)}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
        >
          {ready ? "Pay with Paddle" : "Preparing payment…"}
        </button>
      )}

      <p className="mt-4 text-center text-xs text-neutral-400">
        Want a different plan?{" "}
        <Link href="/pricing" className="underline">
          Back to pricing
        </Link>
      </p>
    </div>
  );
}