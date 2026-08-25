// "use client";

// import React, { useState, useTransition } from "react";
// import {
//   addWaitlistEntry,
//   removeWaitlistEntry,
//   setWaitlistAutoExpire,
//   setWaitlistTtlDays,
//   WAITLIST_TTL_OPTIONS,
//   type WaitlistEntry,
//   type WaitlistTtlDays,
// } from "@/lib/dashboard/action";
// import { Calendar, Trash2, Clock, UserPlus } from "lucide-react";

// function formatAddedDate(iso: string) {
//   try {
//     return new Date(iso).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   } catch {
//     return "—";
//   }
// }

// function getExpirationProgress(createdAt: string, ttlDays: number) {
//   const createdDate = new Date(createdAt);
//   const currentDate = new Date();
//   const diffTime = Math.max(0, currentDate.getTime() - createdDate.getTime());
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   const daysRemaining = Math.max(0, ttlDays - diffDays);
//   const percentRemaining = Math.min(
//     100,
//     Math.max(0, (daysRemaining / Math.max(ttlDays, 1)) * 100)
//   );
//   return { daysRemaining, percent: percentRemaining };
// }

// function normalizeTtl(value: unknown): WaitlistTtlDays {
//   const n = Number(value);
//   if ((WAITLIST_TTL_OPTIONS as readonly number[]).includes(n)) {
//     return n as WaitlistTtlDays;
//   }
//   return 15;
// }

// export function WaitlistManager({
//   initialWaitlist,
//   initialAutoExpire = true,
//   ttlDays: initialTtlDays = 15,
//   readOnly = false,
// }: {
//   initialWaitlist: WaitlistEntry[];
//   initialAutoExpire?: boolean;
//   /** 7 | 15 | 30 | 45 | 60 */
//   ttlDays?: number;
//   readOnly?: boolean;
// }) {
//   const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(
//     initialWaitlist || []
//   );
//   const [autoExpire, setAutoExpire] = useState(Boolean(initialAutoExpire));
//   const [ttlDays, setTtlDaysLocal] = useState<WaitlistTtlDays>(
//     normalizeTtl(initialTtlDays)
//   );
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [pending, startTransition] = useTransition();

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !phone) return;
//     setLoading(true);
//     setError("");
//     try {
//       const row = await addWaitlistEntry(name, phone);
//       setWaitlist((prev) => [row, ...prev]);
//       setName("");
//       setPhone("");
//     } catch (err: any) {
//       setError(err?.message || "Failed to insert entry.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (id: string) => {
//     try {
//       await removeWaitlistEntry(id);
//       setWaitlist((prev) => prev.filter((item) => item.id !== id));
//     } catch {
//       alert("Error removing item.");
//     }
//   };

//   const pruneLocal = (days: number) => {
//     const cutoff = Date.now() - days * 86400000;
//     setWaitlist((list) =>
//       list.filter((p) => new Date(p.created_at).getTime() >= cutoff)
//     );
//   };

//   const handleToggleAutoExpire = (next: boolean) => {
//     setError("");
//     const prev = autoExpire;
//     setAutoExpire(next);
//     startTransition(async () => {
//       try {
//         await setWaitlistAutoExpire(next);
//         if (next) pruneLocal(ttlDays);
//       } catch (err: any) {
//         setAutoExpire(prev);
//         setError(err?.message || "Could not update auto-remove setting.");
//       }
//     });
//   };

//   const handleTtlChange = (value: string) => {
//     const next = normalizeTtl(value);
//     setError("");
//     const prev = ttlDays;
//     setTtlDaysLocal(next);
//     startTransition(async () => {
//       try {
//         await setWaitlistTtlDays(next);
//         if (autoExpire) pruneLocal(next);
//       } catch (err: any) {
//         setTtlDaysLocal(prev);
//         setError(err?.message || "Could not update remove-after days.");
//       }
//     });
//   };

//   return (
//     <div className="flex h-[520px] flex-col rounded-2xl border border-grey-line bg-paper p-6 shadow-sm">
//       <div className="mb-4">
//         <h3 className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-ink">
//           <span>Waitlist Manager</span>
//           <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
//             {autoExpire ? `${ttlDays}-day window` : "No auto-remove"}
//           </span>
//         </h3>
//         <p className="mt-1 font-body text-xs text-ink/50">
//           {readOnly
//             ? "People waiting for an open slot (read-only preview)."
//             : "Add people to automatically offer cancelled slots."}
//         </p>
//       </div>

//       {!readOnly && (
//         <form
//           onSubmit={handleAdd}
//           className="mb-4 space-y-3 rounded-xl border border-grey-line/60 bg-grey-light/40 p-3.5"
//         >
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               placeholder="Contact Name"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full rounded-lg border border-grey-line bg-paper px-3 py-2 text-xs text-ink placeholder-ink/40 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//             />
//             <input
//               type="text"
//               placeholder="+14155551234"
//               required
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full rounded-lg border border-grey-line bg-paper px-3 py-2 font-mono text-xs text-ink placeholder-ink/40 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2 font-body text-xs font-bold text-paper transition-colors hover:bg-indigo-700 disabled:opacity-50"
//           >
//             <UserPlus size={14} />
//             {loading ? "Adding to Waitlist..." : "Add Waitlist Member"}
//           </button>
//         </form>
//       )}

//       {error && (
//         <p className="mb-2 text-[11px] font-semibold text-red-600">{error}</p>
//       )}

//       <div className="flex-1 space-y-3 overflow-y-auto pr-1">
//         {waitlist.length === 0 ? (
//           <div className="flex h-full min-h-[120px] flex-col items-center justify-center text-center">
//             <p className="font-body text-xs text-ink/40">
//               The waitlist is currently empty.
//             </p>
//           </div>
//         ) : (
//           waitlist.map((person) => {
//             const { daysRemaining, percent } = getExpirationProgress(
//               person.created_at,
//               ttlDays
//             );
//             const isCritical = autoExpire && daysRemaining <= 3;

//             return (
//               <div
//                 key={person.id}
//                 className="space-y-2 rounded-xl border border-grey-line bg-grey-light/30 p-3 transition-all hover:border-grey-line/80"
//               >
//                 <div className="flex items-center justify-between gap-2">
//                   <div className="min-w-0">
//                     <span className="font-body text-xs font-bold text-ink">
//                       {person.name}
//                     </span>
//                     <span className="ml-2 font-mono font-body text-[11px] text-ink/50">
//                       {person.phone}
//                     </span>
//                   </div>
//                   {!readOnly && (
//                     <button
//                       type="button"
//                       onClick={() => handleRemove(person.id)}
//                       className="shrink-0 rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
//                       title="Remove Entry"
//                     >
//                       <Trash2 size={13} />
//                     </button>
//                   )}
//                 </div>

//                 <div className="space-y-1">
//                   <div className="flex items-center justify-between gap-2 text-[10px] text-ink/50">
//                     <span className="flex items-center gap-1 font-body">
//                       <Calendar size={11} />
//                       Added {formatAddedDate(person.created_at)}
//                     </span>
//                     {autoExpire ? (
//                       <span
//                         className={`flex items-center gap-0.5 font-semibold ${
//                           isCritical ? "text-red-600" : "text-indigo-600"
//                         }`}
//                       >
//                         <Clock size={11} />
//                         {daysRemaining}d left
//                       </span>
//                     ) : (
//                       <span className="font-semibold text-ink/40">No expiry</span>
//                     )}
//                   </div>
//                   {autoExpire && (
//                     <div className="h-1.5 w-full overflow-hidden rounded-full bg-grey-line">
//                       <div
//                         className={`h-full rounded-full transition-all duration-300 ${
//                           isCritical
//                             ? "bg-red-500"
//                             : percent > 50
//                               ? "bg-indigo-600"
//                               : "bg-amber-500"
//                         }`}
//                         style={{ width: `${percent}%` }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Bottom: toggle + dropdown 7/15/30/45/60 */}
//       {!readOnly ? (
//         <div className="mt-4 space-y-3 border-t border-grey-line pt-3">
//           <div className="flex items-start justify-between gap-3">
//             <div className="min-w-0">
//               <p className="font-body text-xs font-semibold text-ink">
//                 Auto-remove old waitlist entries
//               </p>
//               <p className="mt-0.5 font-body text-[10px] leading-snug text-ink/50">
//                 When on, anyone added longer ago than the selected window is
//                 removed automatically.
//               </p>
//             </div>
//             <button
//               type="button"
//               role="switch"
//               aria-checked={autoExpire}
//               disabled={pending}
//               onClick={() => handleToggleAutoExpire(!autoExpire)}
//               className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
//                 autoExpire ? "bg-indigo-600" : "bg-grey-line"
//               }`}
//             >
//               <span
//                 className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-paper shadow transition-transform ${
//                   autoExpire ? "translate-x-5" : "translate-x-0"
//                 }`}
//               />
//             </button>
//           </div>

//           <div
//             className={`flex items-center justify-between gap-3 ${
//               !autoExpire ? "opacity-50" : ""
//             }`}
//           >
//             <label
//               htmlFor="waitlist-ttl-select"
//               className="shrink-0 font-body text-xs font-semibold text-ink"
//             >
//               Remove after
//             </label>
//             <select
//               id="waitlist-ttl-select"
//               value={ttlDays}
//               disabled={!autoExpire || pending}
//               onChange={(e) => handleTtlChange(e.target.value)}
//               className="rounded-lg border border-grey-line bg-paper px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-indigo-500 disabled:cursor-not-allowed"
//             >
//               {WAITLIST_TTL_OPTIONS.map((d) => (
//                 <option key={d} value={d}>
//                   {d} days
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       ) : (
//         <div className="mt-4 border-t border-grey-line pt-3">
//           <p className="font-body text-[10px] text-ink/50">
//             Auto-remove:{" "}
//             {autoExpire ? `on · after ${ttlDays} days` : "off"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import React, { useState, useTransition } from "react";
import {
  addWaitlistEntry,
  removeWaitlistEntry,
  setWaitlistAutoExpire,
  setWaitlistTtlDays,
} from "@/lib/dashboard/action";
import {
  WAITLIST_TTL_OPTIONS,
  normalizeTtl,
  type WaitlistEntry,
  type WaitlistTtlDays,
} from "@/lib/dashboard/waitlist-types";
import { Calendar, Trash2, Clock, UserPlus } from "lucide-react";

function formatAddedDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

function getExpirationProgress(createdAt: string, ttlDays: number) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = Math.max(0, currentDate.getTime() - createdDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, ttlDays - diffDays);
  const percentRemaining = Math.min(
    100,
    Math.max(0, (daysRemaining / Math.max(ttlDays, 1)) * 100)
  );
  return { daysRemaining, percent: percentRemaining };
}

export function WaitlistManager({
  initialWaitlist,
  initialAutoExpire = true,
  ttlDays: initialTtlDays = 15,
  readOnly = false,
}: {
  initialWaitlist: WaitlistEntry[];
  initialAutoExpire?: boolean;
  /** 7 | 15 | 30 | 45 | 60 */
  ttlDays?: number;
  readOnly?: boolean;
}) {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(
    initialWaitlist || []
  );
  const [autoExpire, setAutoExpire] = useState(Boolean(initialAutoExpire));
  const [ttlDays, setTtlDaysLocal] = useState<WaitlistTtlDays>(
    normalizeTtl(initialTtlDays)
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    setError("");
    try {
      const row = await addWaitlistEntry(name, phone);
      setWaitlist((prev) => [row, ...prev]);
      setName("");
      setPhone("");
    } catch (err: any) {
      setError(err?.message || "Failed to insert entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeWaitlistEntry(id);
      setWaitlist((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Error removing item.");
    }
  };

  const pruneLocal = (days: number) => {
    const cutoff = Date.now() - days * 86400000;
    setWaitlist((list) =>
      list.filter((p) => new Date(p.created_at).getTime() >= cutoff)
    );
  };

  const handleToggleAutoExpire = (next: boolean) => {
    setError("");
    const prev = autoExpire;
    setAutoExpire(next);
    startTransition(async () => {
      try {
        await setWaitlistAutoExpire(next);
        if (next) pruneLocal(ttlDays);
      } catch (err: any) {
        setAutoExpire(prev);
        setError(err?.message || "Could not update auto-remove setting.");
      }
    });
  };

  const handleTtlChange = (value: string) => {
    const next = normalizeTtl(value);
    setError("");
    const prev = ttlDays;
    setTtlDaysLocal(next);
    startTransition(async () => {
      try {
        await setWaitlistTtlDays(next);
        if (autoExpire) pruneLocal(next);
      } catch (err: any) {
        setTtlDaysLocal(prev);
        setError(err?.message || "Could not update remove-after days.");
      }
    });
  };

  return (
    <div className="flex h-[520px] flex-col rounded-2xl border border-grey-line bg-paper p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-ink">
          <span>Waitlist Manager</span>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
            {autoExpire ? `${ttlDays}-day window` : "No auto-remove"}
          </span>
        </h3>
        <p className="mt-1 font-body text-xs text-ink/50">
          {readOnly
            ? "People waiting for an open slot (read-only preview)."
            : "Add people to automatically offer cancelled slots."}
        </p>
      </div>

      {!readOnly && (
        <form
          onSubmit={handleAdd}
          className="mb-4 space-y-3 rounded-xl border border-grey-line/60 bg-grey-light/40 p-3.5"
        >
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Contact Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-grey-line bg-paper px-3 py-2 text-xs text-ink placeholder-ink/40 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="+14155551234"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-grey-line bg-paper px-3 py-2 font-mono text-xs text-ink placeholder-ink/40 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2 font-body text-xs font-bold text-paper transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            <UserPlus size={14} />
            {loading ? "Adding to Waitlist..." : "Add Waitlist Member"}
          </button>
        </form>
      )}

      {error && (
        <p className="mb-2 text-[11px] font-semibold text-red-600">{error}</p>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {waitlist.length === 0 ? (
          <div className="flex h-full min-h-[120px] flex-col items-center justify-center text-center">
            <p className="font-body text-xs text-ink/40">
              The waitlist is currently empty.
            </p>
          </div>
        ) : (
          waitlist.map((person) => {
            const { daysRemaining, percent } = getExpirationProgress(
              person.created_at,
              ttlDays
            );
            const isCritical = autoExpire && daysRemaining <= 3;

            return (
              <div
                key={person.id}
                className="space-y-2 rounded-xl border border-grey-line bg-grey-light/30 p-3 transition-all hover:border-grey-line/80"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-body text-xs font-bold text-ink">
                      {person.name}
                    </span>
                    <span className="ml-2 font-mono font-body text-[11px] text-ink/50">
                      {person.phone}
                    </span>
                  </div>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => handleRemove(person.id)}
                      className="shrink-0 rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                      title="Remove Entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2 text-[10px] text-ink/50">
                    <span className="flex items-center gap-1 font-body">
                      <Calendar size={11} />
                      Added {formatAddedDate(person.created_at)}
                    </span>
                    {autoExpire ? (
                      <span
                        className={`flex items-center gap-0.5 font-semibold ${
                          isCritical ? "text-red-600" : "text-indigo-600"
                        }`}
                      >
                        <Clock size={11} />
                        {daysRemaining}d left
                      </span>
                    ) : (
                      <span className="font-semibold text-ink/40">
                        No expiry
                      </span>
                    )}
                  </div>
                  {autoExpire && (
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-grey-line">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCritical
                            ? "bg-red-500"
                            : percent > 50
                              ? "bg-indigo-600"
                              : "bg-amber-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom: toggle + dropdown 7/15/30/45/60 */}
      {!readOnly ? (
        <div className="mt-4 space-y-3 border-t border-grey-line pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-body text-xs font-semibold text-ink">
                Auto-remove old waitlist entries
              </p>
              <p className="mt-0.5 font-body text-[10px] leading-snug text-ink/50">
                When on, anyone added longer ago than the selected window is
                removed automatically.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoExpire}
              disabled={pending}
              onClick={() => handleToggleAutoExpire(!autoExpire)}
              className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
                autoExpire ? "bg-indigo-600" : "bg-grey-line"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-paper shadow transition-transform ${
                  autoExpire ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div
            className={`flex items-center justify-between gap-3 ${
              !autoExpire ? "opacity-50" : ""
            }`}
          >
            <label
              htmlFor="waitlist-ttl-select"
              className="shrink-0 font-body text-xs font-semibold text-ink"
            >
              Remove after
            </label>
            <select
              id="waitlist-ttl-select"
              value={ttlDays}
              disabled={!autoExpire || pending}
              onChange={(e) => handleTtlChange(e.target.value)}
              className="rounded-lg border border-grey-line bg-paper px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-indigo-500 disabled:cursor-not-allowed"
            >
              {WAITLIST_TTL_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d} days
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="mt-4 border-t border-grey-line pt-3">
          <p className="font-body text-[10px] text-ink/50">
            Auto-remove:{" "}
            {autoExpire ? `on · after ${ttlDays} days` : "off"}
          </p>
        </div>
      )}
    </div>
  );
}