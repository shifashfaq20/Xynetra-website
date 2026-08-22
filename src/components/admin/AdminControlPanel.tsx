// "use client";

// import { useEffect, useState, useTransition } from "react";
// import Link from "next/link";
// import {
//   Building2,
//   SlidersHorizontal,
//   ExternalLink,
//   Plus,
//   FlaskConical,
//   Users,
// } from "lucide-react";
// import type { AdminClient } from "@/lib/admin/actions";
// import {
//   listClients,
//   updateClientSettings,
//   createClientAccount,
//   runSimulationForClient,
// } from "@/lib/admin/actions";

// const REGIONS = ["international", "pakistan"];
// const STATUSES = ["active", "inactive", "past_due", "cancelled"];

// function genPassword() {
//   return "Xyn-" + Math.random().toString(36).slice(2, 9) + "A1!";
// }

// export function AdminControlPanel({
//   initialClients,
// }: {
//   initialClients: AdminClient[];
// }) {
//   const [clients, setClients] = useState<AdminClient[]>(initialClients);
//   const [activeId, setActiveId] = useState<string | null>(
//     initialClients[0]?.id || null
//   );
//   const [showAdd, setShowAdd] = useState(false);
//   const [showSim, setShowSim] = useState(false);
//   const [notice, setNotice] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

//   const [pending, start] = useTransition();

//   const active = clients.find((c) => c.id === activeId) || null;

//   // ── configure form draft ──
//   const [region, setRegion] = useState(active?.billing_region || "international");
//   const [status, setStatus] = useState(active?.subscription_status || "active");
//   useEffect(() => {
//     if (active) {
//       setRegion(active.billing_region);
//       setStatus(active.subscription_status);
//     }
//   }, [active?.id, active?.billing_region, active?.subscription_status]);

//   // ── add-client form ──
//   const [newEmail, setNewEmail] = useState("");
//   const [newPass, setNewPass] = useState(genPassword());
//   const [newBiz, setNewBiz] = useState("");
//   const [newRegion, setNewRegion] = useState("international");

//   const reload = () =>
//     start(async () => {
//       try {
//         const list = await listClients();
//         setClients(list);
//         if (!list.find((c) => c.id === activeId)) setActiveId(list[0]?.id || null);
//       } catch (e: any) {
//         setNotice({ kind: "err", msg: e.message });
//       }
//     });

//   const onSaveSettings = () => {
//     if (!active) return;
//     setNotice(null);
//     start(async () => {
//       try {
//         await updateClientSettings(active.id, {
//           billing_region: region,
//           subscription_status: status,
//         });
//         setNotice({ kind: "ok", msg: `Saved settings for ${active.business_name}.` });
//         reload();
//       } catch (e: any) {
//         setNotice({ kind: "err", msg: e.message });
//       }
//     });
//   };

//   const onAddClient = (e: React.FormEvent) => {
//     e.preventDefault();
//     setNotice(null);
//     start(async () => {
//       try {
//         const res = await createClientAccount({
//           email: newEmail.trim(),
//           password: newPass,
//           business_name: newBiz.trim(),
//           billing_region: newRegion,
//         });
//         setNotice({ kind: "ok", msg: `Created ${newEmail}. They can log in now.` });
//         setNewEmail("");
//         setNewBiz("");
//         setNewPass(genPassword());
//         setShowAdd(false);
//         reload();
//         if (res.userId) setActiveId(res.userId);
//       } catch (e: any) {
//         setNotice({ kind: "err", msg: e.message });
//       }
//     });
//   };

//   const onSimulate = () => {
//     if (!active) return;
//     setNotice(null);
//     start(async () => {
//       try {
//         await runSimulationForClient(active.id);
//         setNotice({
//           kind: "ok",
//           msg: `Simulation data written for ${active.business_name}. Open “View Client App” to see it live.`,
//         });
//       } catch (e: any) {
//         setNotice({ kind: "err", msg: e.message });
//       }
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {notice && (
//         <div
//           className={`rounded-xl border px-4 py-3 text-sm font-body ${
//             notice.kind === "ok"
//               ? "border-emerald-300 bg-emerald-50 text-emerald-800"
//               : "border-red-300 bg-red-50 text-red-700"
//           }`}
//         >
//           {notice.msg}
//         </div>
//       )}

//       {/* ── Context switcher ── */}
//       <div className="rounded-2xl border border-grey-line bg-paper p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div className="flex items-center gap-4">
//           <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
//             <Building2 size={22} />
//           </span>
//           <div>
//             <p className="font-body text-[11px] font-bold uppercase tracking-wider text-ink/40">
//               Current simulation context
//             </p>
//             <div className="flex items-center gap-3">
//               <h2 className="font-display text-xl font-bold text-ink">
//                 {active?.business_name || "No client selected"}
//               </h2>
//               {active && (
//                 <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 capitalize">
//                   {active.billing_region}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center gap-2">
//           <span className="mr-1 font-body text-sm text-ink/50">Switch active client:</span>
//           {clients.map((c) => (
//             <button
//               key={c.id}
//               onClick={() => setActiveId(c.id)}
//               className={`rounded-full px-4 py-2 text-sm font-semibold font-body transition-colors ${
//                 c.id === activeId
//                   ? "bg-ink text-paper"
//                   : "border border-grey-line text-ink/70 hover:bg-grey-light"
//               }`}
//             >
//               {c.business_name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Admin hero ── */}
//       <div className="rounded-2xl bg-[#0d1224] p-7 text-paper flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//         <div className="max-w-xl">
//           <div className="flex items-center gap-3">
//             <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black">
//               Admin Access
//             </span>
//             <span className="font-body text-sm text-paper/60">Internal Control Panel</span>
//           </div>
//           <h1 className="mt-3 font-display text-3xl font-bold">
//             Xynetra Global Client Controller
//           </h1>
//           <p className="mt-2 font-body text-sm text-paper/70">
//             Configure custom clients, simulate cancellations / waitlist recoveries, view
//             cross‑client statuses, and demonstrate features in real‑time.
//           </p>
//         </div>
//         <div className="flex flex-col gap-2 lg:items-end">
//           <button
//             onClick={() => document.getElementById("clients-list")?.scrollIntoView({ behavior: "smooth" })}
//             className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold hover:bg-indigo-500"
//           >
//             <Users size={16} /> Manage Clients ({clients.length})
//           </button>
//           <button
//             onClick={() => setShowSim((v) => !v)}
//             className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/20"
//           >
//             <FlaskConical size={16} /> Simulation Tools & Sandboxing
//           </button>
//           <button
//             onClick={() => setShowAdd((v) => !v)}
//             className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/20"
//           >
//             <Plus size={16} /> Add New Client
//           </button>
//         </div>
//       </div>

//       {/* ── Simulation panel ── */}
//       {showSim && (
//         <div className="rounded-2xl border border-grey-line bg-paper p-6">
//           <div className="flex items-center gap-2">
//             <FlaskConical size={20} className="text-indigo-600" />
//             <h3 className="font-display text-lg font-bold text-ink">Simulation Tools</h3>
//           </div>
//           <p className="mt-1 font-body text-sm text-ink/60">
//             Writes a batch of simulated appointments (confirmed, cancelled, and
//             waitlist‑recovered) plus reminder activity for the active client, so their
//             dashboard lights up instantly.
//           </p>
//           <button
//             onClick={onSimulate}
//             disabled={!active || pending}
//             className="mt-4 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-paper hover:bg-indigo-500 disabled:opacity-50"
//           >
//             {pending ? "Running…" : `Run simulation for ${active?.business_name || "—"}`}
//           </button>
//         </div>
//       )}

//       {/* ── Add client form ── */}
//       {showAdd && (
//         <form
//           onSubmit={onAddClient}
//           className="rounded-2xl border border-grey-line bg-paper p-6 space-y-4"
//         >
//           <div className="flex items-center gap-2">
//             <Plus size={20} className="text-indigo-600" />
//             <h3 className="font-display text-lg font-bold text-ink">Add New Client</h3>
//           </div>
//           <div className="grid gap-4 sm:grid-cols-2">
//             <Field label="Login email">
//               <input
//                 type="email"
//                 required
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 className={inputCls}
//                 placeholder="client@example.com"
//               />
//             </Field>
//             <Field label="Temporary password">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   required
//                   value={newPass}
//                   onChange={(e) => setNewPass(e.target.value)}
//                   className={inputCls}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setNewPass(genPassword())}
//                   className="shrink-0 rounded-lg border border-grey-line px-3 text-xs font-semibold text-ink/70 hover:bg-grey-light"
//                 >
//                   New
//                 </button>
//               </div>
//             </Field>
//             <Field label="Business name">
//               <input
//                 type="text"
//                 required
//                 value={newBiz}
//                 onChange={(e) => setNewBiz(e.target.value)}
//                 className={inputCls}
//                 placeholder="Apex Dental Care"
//               />
//             </Field>
//             <Field label="Billing region">
//               <select
//                 value={newRegion}
//                 onChange={(e) => setNewRegion(e.target.value)}
//                 className={inputCls}
//               >
//                 {REGIONS.map((r) => (
//                   <option key={r} value={r} className="capitalize">
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </Field>
//           </div>
//           <button
//             type="submit"
//             disabled={pending}
//             className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-paper hover:bg-indigo-500 disabled:opacity-50"
//           >
//             {pending ? "Creating…" : "Create client account"}
//           </button>
//         </form>
//       )}

//       {/* ── Registered clients list ── */}
//       <div id="clients-list" className="rounded-2xl border border-grey-line bg-paper">
//         <div className="flex items-center justify-between border-b border-grey-line p-5">
//           <div className="flex items-center gap-2">
//             <Building2 size={20} className="text-indigo-600" />
//             <h3 className="font-display text-lg font-bold text-ink">Registered Clients List</h3>
//           </div>
//           <span className="font-body text-sm text-ink/40">
//             Click a client to select configuration context
//           </span>
//         </div>

//         {clients.length === 0 ? (
//           <div className="p-10 text-center font-body text-sm text-ink/50">
//             No clients yet. Use “Add New Client” to create the first one.
//           </div>
//         ) : (
//           clients.map((c) => {
//             const isActive = c.id === activeId;
//             return (
//               <div
//                 key={c.id}
//                 className={`flex flex-col gap-4 border-b border-grey-line p-5 last:border-0 lg:flex-row lg:items-center lg:justify-between ${
//                   isActive ? "border-l-4 border-l-indigo-600 bg-indigo-50/40" : ""
//                 }`}
//               >
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-display text-lg font-bold text-ink">
//                       {c.business_name}
//                     </span>
//                     {isActive && (
//                       <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
//                         Active Context
//                       </span>
//                     )}
//                   </div>
//                   <p className="mt-0.5 font-body text-sm text-ink/50">
//                     Owner Email: {c.full_name || c.email}
//                   </p>
//                   <div className="mt-2 flex gap-2">
//                     <Badge>Region: {c.billing_region}</Badge>
//                     <Badge>Status: {c.subscription_status}</Badge>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <Link
//                     href={`/app/clients/${c.id}`}
//                     target="_blank"
//                     className="flex items-center gap-1.5 rounded-lg border border-grey-line px-4 py-2 text-sm font-semibold text-ink/80 hover:bg-grey-light"
//                   >
//                     View Client App <ExternalLink size={14} />
//                   </Link>
//                   <button
//                     onClick={() => setActiveId(c.id)}
//                     className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
//                       isActive
//                         ? "bg-indigo-600 text-paper hover:bg-indigo-500"
//                         : "bg-grey-light text-ink/70 hover:bg-grey-line"
//                     }`}
//                   >
//                     Configure Settings
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* ── Configure settings ── */}
//       {active && (
//         <div className="rounded-2xl border border-grey-line bg-paper p-6 space-y-5">
//           <div className="flex items-center gap-2">
//             <SlidersHorizontal size={20} className="text-indigo-600" />
//             <div>
//               <h3 className="font-display text-lg font-bold text-ink">Configure Settings</h3>
//               <p className="font-body text-sm text-ink/50">
//                 Updating values updates {active.business_name} instantly.
//               </p>
//             </div>
//           </div>

//           <Field label="Billing region">
//             <select
//               value={region}
//               onChange={(e) => setRegion(e.target.value)}
//               className={inputCls}
//             >
//               {REGIONS.map((r) => (
//                 <option key={r} value={r} className="capitalize">
//                   {r}
//                 </option>
//               ))}
//             </select>
//           </Field>

//           <Field label="Subscription status">
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className={inputCls}
//             >
//               {STATUSES.map((s) => (
//                 <option key={s} value={s} className="capitalize">
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </Field>

//           <button
//             onClick={onSaveSettings}
//             disabled={pending}
//             className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-paper hover:bg-indigo-500 disabled:opacity-50"
//           >
//             {pending ? "Saving…" : "Save Client Settings"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// const inputCls =
//   "w-full rounded-lg border border-grey-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-indigo-500";

// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <label className="block">
//       <span className="mb-1 block font-body text-[11px] font-bold uppercase tracking-wider text-ink/50">
//         {label}
//       </span>
//       {children}
//     </label>
//   );
// }

// function Badge({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="rounded-md bg-grey-light px-2.5 py-1 font-body text-xs font-semibold capitalize text-ink/70">
//       {children}
//     </span>
//   );
// }




// src/components/admin/AdminControlPanel.tsx 
"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  Building2, SlidersHorizontal, ExternalLink, Plus, FlaskConical, Users, Phone,
} from "lucide-react";
import type { AdminClient } from "@/lib/admin/actions";
import {
  listClients, updateClientSettings, setClientPhoneNumberId,
  createClientAccount, runSimulationForClient,
} from "@/lib/admin/actions";

const REGIONS = ["international", "pakistan"];
const STATUSES = ["active", "inactive", "past_due", "cancelled"];

const PHONE_OPTION_LABEL: Record<string, string> = {
  client_sim: "Client bought a local SIM",
  landline: "Business landline (voice verification)",
  agency_virtual: "We procure a virtual number",
};

function genPassword() {
  return "Xyn-" + Math.random().toString(36).slice(2, 9) + "A1!";
}

export function AdminControlPanel({ initialClients }: { initialClients: AdminClient[] }) {
  const [clients, setClients] = useState<AdminClient[]>(initialClients);
  const [activeId, setActiveId] = useState<string | null>(initialClients[0]?.id || null);
  const [showAdd, setShowAdd] = useState(false);
  const [showSim, setShowSim] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [pending, start] = useTransition();

  const active = clients.find((c) => c.id === activeId) || null;

  const [region, setRegion] = useState(active?.billing_region || "international");
  const [status, setStatus] = useState(active?.subscription_status || "active");
  const [phoneNumberId, setPhoneNumberId] = useState(active?.whatsapp_phone_number_id || "");
  useEffect(() => {
    if (active) {
      setRegion(active.billing_region);
      setStatus(active.subscription_status);
      setPhoneNumberId(active.whatsapp_phone_number_id || "");
    }
  }, [active?.id, active?.billing_region, active?.subscription_status, active?.whatsapp_phone_number_id]);

  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState(genPassword());
  const [newBiz, setNewBiz] = useState("");
  const [newRegion, setNewRegion] = useState("international");

  const reload = () =>
    start(async () => {
      try {
        const list = await listClients();
        setClients(list);
        // if (!list.find((c) => c.id === activeId)) setActiveId(list[0]?.id || null);
        if (!list.find((c: { id: string }) => c.id === activeId)) {
  setActiveId(list[0]?.id || null);
}
      } catch (e: any) {
        setNotice({ kind: "err", msg: e.message });
      }
    });

  const onSaveSettings = () => {
    if (!active) return;
    setNotice(null);
    start(async () => {
      try {
        await updateClientSettings(active.id, { billing_region: region, subscription_status: status });
        await setClientPhoneNumberId(active.id, phoneNumberId.trim() || null);
        setNotice({ kind: "ok", msg: `Saved settings for ${active.business_name}.` });
        reload();
      } catch (e: any) {
        setNotice({ kind: "err", msg: e.message });
      }
    });
  };

  const onAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    start(async () => {
      try {
        const res = await createClientAccount({
          email: newEmail.trim(), password: newPass,
          business_name: newBiz.trim(), billing_region: newRegion,
        });
        setNotice({ kind: "ok", msg: `Created ${newEmail}. They can log in now.` });
        setNewEmail(""); setNewBiz(""); setNewPass(genPassword()); setShowAdd(false);
        reload();
        if (res.userId) setActiveId(res.userId);
      } catch (e: any) {
        setNotice({ kind: "err", msg: e.message });
      }
    });
  };

  const onSimulate = () => {
    if (!active) return;
    setNotice(null);
    start(async () => {
      try {
        await runSimulationForClient(active.id);
        setNotice({ kind: "ok", msg: `Simulation data written for ${active.business_name}.` });
      } catch (e: any) {
        setNotice({ kind: "err", msg: e.message });
      }
    });
  };

  return (
    <div className="space-y-6">
      {notice && (
        <div className={`rounded-xl border px-4 py-3 text-sm font-body ${
          notice.kind === "ok"
            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
            : "border-red-300 bg-red-50 text-red-700"
        }`}>
          {notice.msg}
        </div>
      )}

      {/* Context switcher */}
      <div className="rounded-2xl border border-grey-line bg-paper p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Building2 size={22} />
          </span>
          <div>
            <p className="font-body text-[11px] font-bold uppercase tracking-wider text-ink/40">
              Current simulation context
            </p>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl font-bold text-ink">
                {active?.business_name || "No client selected"}
              </h2>
              {active && (
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 capitalize">
                  {active.billing_region}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-body text-sm text-ink/50">Switch active client:</span>
          {clients.map((c) => (
            <button
              key={c.id} onClick={() => setActiveId(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold font-body transition-colors ${
                c.id === activeId ? "bg-ink text-paper" : "border border-grey-line text-ink/70 hover:bg-grey-light"
              }`}
            >
              {c.business_name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-2xl bg-[#0d1224] p-7 text-paper flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black">
              Admin Access
            </span>
            <span className="font-body text-sm text-paper/60">Internal Control Panel</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold">Xynetra Global Client Controller</h1>
          <p className="mt-2 font-body text-sm text-paper/70">
            Register WhatsApp lines (paste Meta Phone Number IDs), configure billing, simulate
            activity, and take clients live.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <button
            onClick={() => document.getElementById("clients-list")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold hover:bg-indigo-500"
          >
            <Users size={16} /> Manage Clients ({clients.length})
          </button>
          <button
            onClick={() => setShowSim((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/20"
          >
            <FlaskConical size={16} /> Simulation Tools & Sandboxing
          </button>
          <button
            onClick={() => setShowAdd((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/20"
          >
            <Plus size={16} /> Add New Client
          </button>
        </div>
      </div>

      {/* Simulation */}
      {showSim && (
        <div className="rounded-2xl border border-grey-line bg-paper p-6">
          <div className="flex items-center gap-2">
            <FlaskConical size={20} className="text-indigo-600" />
            <h3 className="font-display text-lg font-bold text-ink">Simulation Tools</h3>
          </div>
          <p className="mt-1 font-body text-sm text-ink/60">
            Writes a batch of simulated appointments plus reminder activity for the active client.
          </p>
          <button
            onClick={onSimulate} disabled={!active || pending}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-paper hover:bg-indigo-500 disabled:opacity-50"
          >
            {pending ? "Running…" : `Run simulation for ${active?.business_name || "—"}`}
          </button>
        </div>
      )}

      {/* Add client */}
      {showAdd && (
        <form onSubmit={onAddClient} className="rounded-2xl border border-grey-line bg-paper p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Plus size={20} className="text-indigo-600" />
            <h3 className="font-display text-lg font-bold text-ink">Add New Client</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Login email">
              <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className={inputCls} placeholder="client@example.com" />
            </Field>
            <Field label="Temporary password">
              <div className="flex gap-2">
                <input type="text" required value={newPass} onChange={(e) => setNewPass(e.target.value)} className={inputCls} />
                <button type="button" onClick={() => setNewPass(genPassword())} className="shrink-0 rounded-lg border border-grey-line px-3 text-xs font-semibold text-ink/70 hover:bg-grey-light">New</button>
              </div>
            </Field>
            <Field label="Business name">
              <input type="text" required value={newBiz} onChange={(e) => setNewBiz(e.target.value)} className={inputCls} placeholder="Apex Dental Care" />
            </Field>
            <Field label="Billing region">
              <select value={newRegion} onChange={(e) => setNewRegion(e.target.value)} className={inputCls}>
                {REGIONS.map((r) => <option key={r} value={r} className="capitalize">{r}</option>)}
              </select>
            </Field>
          </div>
          <button type="submit" disabled={pending} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-paper hover:bg-indigo-500 disabled:opacity-50">
            {pending ? "Creating…" : "Create client account"}
          </button>
        </form>
      )}

      {/* Clients list */}
      <div id="clients-list" className="rounded-2xl border border-grey-line bg-paper">
        <div className="flex items-center justify-between border-b border-grey-line p-5">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-indigo-600" />
            <h3 className="font-display text-lg font-bold text-ink">Registered Clients List</h3>
          </div>
          <span className="font-body text-sm text-ink/40">Click a client to select configuration context</span>
        </div>

        {clients.length === 0 ? (
          <div className="p-10 text-center font-body text-sm text-ink/50">
            No clients yet. Use “Add New Client” to create the first one.
          </div>
        ) : (
          clients.map((c) => {
            const isActive = c.id === activeId;
            const linked = !!c.whatsapp_phone_number_id;
            return (
              <div
                key={c.id}
                className={`flex flex-col gap-4 border-b border-grey-line p-5 last:border-0 lg:flex-row lg:items-center lg:justify-between ${
                  isActive ? "border-l-4 border-l-indigo-600 bg-indigo-50/40" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-ink">{c.business_name}</span>
                    {isActive && (
                      <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">Active Context</span>
                    )}
                  </div>
                  <p className="mt-0.5 font-body text-sm text-ink/50">Owner Email: {c.full_name || c.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>Region: {c.billing_region}</Badge>
                    <Badge>Status: {c.subscription_status}</Badge>
                    <span className={`rounded-md px-2.5 py-1 font-body text-xs font-semibold ${
                      linked ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      WhatsApp: {linked ? "line live" : "pending"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/app/clients/${c.id}`} target="_blank"
                    className="flex items-center gap-1.5 rounded-lg border border-grey-line px-4 py-2 text-sm font-semibold text-ink/80 hover:bg-grey-light"
                  >
                    View Client App <ExternalLink size={14} />
                  </Link>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "bg-indigo-600 text-paper hover:bg-indigo-500" : "bg-grey-light text-ink/70 hover:bg-grey-line"
                    }`}
                  >
                    Configure Settings
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Configure */}
      {active && (
        <div className="rounded-2xl border border-grey-line bg-paper p-6 space-y-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-indigo-600" />
            <div>
              <h3 className="font-display text-lg font-bold text-ink">Configure Settings</h3>
              <p className="font-body text-sm text-ink/50">Updating values updates {active.business_name} instantly.</p>
            </div>
          </div>

          {/* Intake summary — what you need during the registration call */}
          <div className="rounded-xl border border-grey-line bg-grey-light/50 p-4 space-y-1.5">
            <p className="font-body text-[11px] font-bold uppercase tracking-wider text-ink/50">Onboarding intake</p>
            <p className="font-body text-sm text-ink/80">
              Number plan: <strong>{active.phone_option ? PHONE_OPTION_LABEL[active.phone_option] : "not chosen yet"}</strong>
              {active.phone_number ? ` — ${active.phone_number}` : ""}
              {active.phone_country ? ` (country: ${active.phone_country})` : ""}
            </p>
            <p className="font-body text-sm text-ink/60">
              Timezone: {active.timezone || "—"} · Owner WhatsApp: {active.owner_whatsapp || "—"}
            </p>
          </div>

          <Field label="Billing region">
            <select value={region} onChange={(e) => setRegion(e.target.value)} className={inputCls}>
              {REGIONS.map((r) => <option key={r} value={r} className="capitalize">{r}</option>)}
            </select>
          </Field>

          <Field label="Subscription status">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
              {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
          </Field>

          <Field label="WhatsApp Phone Number ID (from Meta → App → WhatsApp → API Setup)">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Phone size={18} />
              </span>
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className={inputCls + " font-mono"}
                placeholder="e.g. 741852096312458 — paste AFTER registering the line"
              />
            </div>
            <p className="mt-1.5 font-body text-xs text-ink/50">
              This is the go-live switch: once saved, n8n starts serving this client on the next
              15-minute cycle. Clear the field to take the line offline.
            </p>
          </Field>

          <button
            onClick={onSaveSettings} disabled={pending}
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-paper hover:bg-indigo-500 disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save Client Settings"}
          </button>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-grey-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-indigo-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-body text-[11px] font-bold uppercase tracking-wider text-ink/50">{label}</span>
      {children}
    </label>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-grey-light px-2.5 py-1 font-body text-xs font-semibold capitalize text-ink/70">
      {children}
    </span>
  );
}


