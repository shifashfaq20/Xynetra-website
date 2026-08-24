// import { NextResponse } from 'next/server'
// import crypto from 'crypto'
// import {
//   createServiceClient,
//   createAuthAdminClient,
// } from '@/lib/supabase/service'

// const SECRET = process.env.PADDLE_WEBHOOK_SECRET || ''

// function verifySignature(rawBody: string, header: string | null): boolean {
//   if (!header || !SECRET) return false
//   const parts = Object.fromEntries(
//     header.split(';').map((p) => {
//       const i = p.indexOf('=')
//       return [p.slice(0, i), p.slice(i + 1)]
//     })
//   )
//   const ts = parts['ts']
//   const h1 = parts['h1']
//   if (!ts || !h1) return false
//   const expected = crypto
//     .createHmac('sha256', SECRET)
//     .update(`${ts}:${rawBody}`)
//     .digest('hex')
//   try {
//     return crypto.timingSafeEqual(Buffer.from(h1), Buffer.from(expected))
//   } catch {
//     return false
//   }
// }

// const ACTIVATE_EVENTS = new Set([
//   'subscription.activated',
//   'subscription.created',
//   'subscription.trialing',
//   'transaction.completed',
// ])
// const STATUS_MAP: Record<string, string> = {
//   'subscription.past_due': 'past_due',
//   'subscription.canceled': 'cancelled',
//   'subscription.paused': 'inactive',
// }

// export async function POST(req: Request) {
//   const rawBody = await req.text()
//   const signature = req.headers.get('paddle-signature')

//   if (!verifySignature(rawBody, signature)) {
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
//   }

//   let event: any
//   try {
//     event = JSON.parse(rawBody)
//   } catch {
//     return NextResponse.json({ error: 'Bad JSON' }, { status: 400 })
//   }

//   const type: string = event?.event_type ?? ''
//   const data: any = event?.data ?? {}

//   let newStatus: string | null = null
//   if (ACTIVATE_EVENTS.has(type)) newStatus = 'active'
//   else if (STATUS_MAP[type]) newStatus = STATUS_MAP[type]

//   if (!newStatus) {
//     return NextResponse.json({ received: true, ignored: type })
//   }

//   const email: string | null =
//     data?.custom_data?.email ??
//     data?.customer?.email ??
//     data?.customer_email ??
//     null

//   if (!email) {
//     console.error(`Paddle webhook ${type}: no email in payload`)
//     return NextResponse.json({ received: true, warning: 'no email' })
//   }

//   // Email → user id via Admin API (reliable)
//   const auth = createAuthAdminClient()
//   const { data: list } = await auth.auth.admin.listUsers()
//   const matchedUser = list?.users?.find(
//     (u: any) => u.email?.toLowerCase() === email.toLowerCase()
//   )
//   const userId = matchedUser?.id
//   if (!userId) {
//     console.error(`Paddle webhook ${type}: no user for ${email}`)
//     return NextResponse.json({ received: true, warning: 'user not found' })
//   }

//   const svc = createServiceClient()

//   // 1) Flip subscription status
//   await svc
//     .from('profiles')
//     .update({ subscription_status: newStatus })
//     .eq('id', userId)

//   // 2) Record a real invoice on completed transactions
//   if (type === 'transaction.completed') {
//     const txId: string = data?.id ?? ''
//     const totals = data?.details?.totals ?? data?.totals ?? {}
//     const amountMinor = Number(totals?.grand_total ?? totals?.total ?? 0)
//     const currency: string =
//       data?.currency_code ?? totals?.currency_code ?? 'USD'
//     const now = new Date()

//     await svc.from('invoices').upsert(
//       {
//         user_id: userId,
//         number: data?.invoice_number ?? txId,
//         paddle_transaction_id: txId,
//         amount: amountMinor / 100, // Paddle sends minor units
//         currency,
//         status: 'paid',
//         issued_at: now.toISOString().slice(0, 10),
//         due_at: now.toISOString().slice(0, 10),
//         period: now.toLocaleString('en-US', {
//           month: 'long',
//           year: 'numeric',
//         }),
//       },
//       { onConflict: 'paddle_transaction_id' }
//     )
//   }

//   return NextResponse.json({ received: true, status: newStatus })
// }



import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  createServiceClient,
  createAuthAdminClient,
} from "@/lib/supabase/service";

const SECRET = process.env.PADDLE_WEBHOOK_SECRET || "";

function verifySignature(rawBody: string, header: string | null): boolean {
  if (!header || !SECRET) return false;
  const parts = Object.fromEntries(
    header.split(";").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i), p.slice(i + 1)];
    })
  );
  const ts = parts["ts"];
  const h1 = parts["h1"];
  if (!ts || !h1) return false;
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(`${ts}:${rawBody}`)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(h1), Buffer.from(expected));
  } catch {
    return false;
  }
}

const ACTIVATE_EVENTS = new Set([
  "subscription.activated",
  "subscription.created",
  "subscription.trialing",
  "transaction.completed",
]);

const STATUS_MAP: Record<string, string> = {
  "subscription.past_due": "past_due",
  "subscription.canceled": "cancelled",
  "subscription.paused": "inactive",
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const type: string = event?.event_type ?? "";
  const data: any = event?.data ?? {};

  let newStatus: string | null = null;
  if (ACTIVATE_EVENTS.has(type)) newStatus = "active";
  else if (STATUS_MAP[type]) newStatus = STATUS_MAP[type];

  if (!newStatus) {
    return NextResponse.json({ received: true, ignored: type });
  }

  const email: string | null =
    data?.custom_data?.email ??
    data?.customer?.email ??
    data?.customer_email ??
    null;

  if (!email) {
    console.error(`Paddle webhook ${type}: no email in payload`);
    return NextResponse.json({ received: true, warning: "no email" });
  }

  const auth = createAuthAdminClient();
  const { data: list } = await auth.auth.admin.listUsers();
  const matchedUser = list?.users?.find(
    (u: any) => u.email?.toLowerCase() === email.toLowerCase()
  );
  const userId = matchedUser?.id;
  if (!userId) {
    console.error(`Paddle webhook ${type}: no user for ${email}`);
    return NextResponse.json({ received: true, warning: "user not found" });
  }

  const svc = createServiceClient();
  const stamp = new Date().toISOString();

  await svc
    .from("profiles")
    .update({ subscription_status: newStatus, updated_at: stamp })
    .eq("id", userId);

  await svc.from("clients").upsert(
    {
      id: userId,
      subscription_status: newStatus,
      updated_at: stamp,
    },
    { onConflict: "id" }
  );

  if (type === "transaction.completed") {
    const txId: string = data?.id ?? "";
    const totals = data?.details?.totals ?? data?.totals ?? {};
    const amountMinor = Number(totals?.grand_total ?? totals?.total ?? 0);
    const currency: string =
      data?.currency_code ?? totals?.currency_code ?? "USD";
    const now = new Date();

    await svc.from("invoices").upsert(
      {
        user_id: userId,
        number: data?.invoice_number ?? txId,
        paddle_transaction_id: txId,
        amount: amountMinor / 100,
        currency,
        status: "paid",
        issued_at: now.toISOString().slice(0, 10),
        due_at: now.toISOString().slice(0, 10),
        period: now.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        }),
      },
      { onConflict: "paddle_transaction_id" }
    );
  }

  return NextResponse.json({ received: true, status: newStatus });
}