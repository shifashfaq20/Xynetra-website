// Deterministic demo data, seeded per account from the user id.
// Used until the dashboard is wired to production tables.

export type BillingRegion = "international" | "pakistan";

export type Currency = "USD" | "GBP" | "PKR";

// Small seeded PRNG so each account shows stable-but-distinct numbers.
function hashSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

export type ProductMetrics = {
  product: "recovery" | "lead_to_booking";
  name: string;
  accent: "coral" | "blue";
  live: boolean;
  metrics: { label: string; value: string; sub: string }[];
  weekly: number[]; // last 12 weeks, for the trend bars
  weeklyLabel: string;
};

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  PKR: "Rs ",
};

export function currencyForRegion(region: BillingRegion): Currency {
  return region === "pakistan" ? "PKR" : "USD";
}

export function formatMoney(amount: number, currency: Currency): string {
  const sym = CURRENCY_SYMBOL[currency];
  return `${sym}${amount.toLocaleString("en-US")}`;
}

// Per-account results for both products. Recovery is live; Lead-to-Booking
// is shown as "coming soon" with no live numbers.
export function getProductResults(
  userId: string,
  currency: Currency
): ProductMetrics[] {
  const rand = rng(hashSeed(userId));

  const confirmed = 180 + Math.floor(rand() * 220);
  const recovered = 22 + Math.floor(rand() * 40);
  const noShowRate = (4 + rand() * 4).toFixed(1);
  const perSlot = currency === "PKR" ? 6500 : currency === "GBP" ? 55 : 70;
  const revenue = recovered * perSlot;

  const weekly = Array.from({ length: 12 }, () => 2 + Math.floor(rand() * 8));

  return [
    {
      product: "recovery",
      name: "Xynetra Recovery",
      accent: "coral",
      live: true,
      metrics: [
        {
          label: "Appointments confirmed",
          value: confirmed.toLocaleString("en-US"),
          sub: "last 12 weeks",
        },
        {
          label: "Slots recovered",
          value: recovered.toLocaleString("en-US"),
          sub: "cancellations refilled",
        },
        {
          label: "Est. revenue recovered",
          value: formatMoney(revenue, currency),
          sub: "from refilled slots",
        },
        {
          label: "No-show rate",
          value: `${noShowRate}%`,
          sub: "down from ~15% baseline",
        },
      ],
      weekly,
      weeklyLabel: "Slots recovered per week",
    },
    {
      product: "lead_to_booking",
      name: "Xynetra Lead-to-Booking",
      accent: "blue",
      live: false,
      metrics: [
        { label: "Leads answered < 60s", value: "—", sub: "launching soon" },
        { label: "Jobs booked", value: "—", sub: "launching soon" },
        { label: "Est. revenue booked", value: "—", sub: "launching soon" },
        { label: "Avg. reply time", value: "—", sub: "launching soon" },
      ],
      weekly: Array.from({ length: 12 }, () => 0),
      weeklyLabel: "Available at launch",
    },
  ];
}

export type Invoice = {
  number: string;
  period: string;
  issuedAt: string;
  dueAt: string;
  amount: number;
  currency: Currency;
  status: "paid" | "due" | "pending_verification";
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function planForRegion(region: BillingRegion) {
  const currency = currencyForRegion(region);
  const price = currency === "PKR" ? 45000 : currency === "GBP" ? 149 : 199;
  return {
    name: "Xynetra Recovery — Growth",
    price,
    currency,
    cadence: "per month",
  };
}

// Deterministic invoice history: previous months paid, current month due.
export function getInvoices(userId: string, region: BillingRegion): Invoice[] {
  const { price, currency } = planForRegion(region);
  const now = new Date("2026-07-09");
  const rand = rng(hashSeed(userId + ":inv"));
  const prefix = `XYN-${(hashSeed(userId) % 9000) + 1000}`;

  const invoices: Invoice[] = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const issued = new Date(d.getFullYear(), d.getMonth(), 1);
    const due = new Date(d.getFullYear(), d.getMonth(), 7);
    // slight variation on historical amounts
    const amount = i === 0 ? price : price + Math.floor(rand() * 3) * 0;
    invoices.push({
      number: `${prefix}-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`,
      period: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
      issuedAt: issued.toISOString().slice(0, 10),
      dueAt: due.toISOString().slice(0, 10),
      amount,
      currency,
      status: i === 0 ? "due" : "paid",
    });
  }
  return invoices;
}
