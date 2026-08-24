// // src/components/dashboard/WaitlistManager.tsx
// 'use client';

// import React, { useState } from 'react';
// import { addWaitlistEntry, removeWaitlistEntry } from '@/lib/dashboard/action';
// import { Calendar, Trash2, Clock, UserPlus } from 'lucide-react';

// export function WaitlistManager({
//   initialWaitlist,
//   readOnly = false,
// }: {
//   initialWaitlist: any[];
//   readOnly?: boolean;
// }) {
//   const [waitlist, setWaitlist] = useState(initialWaitlist);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !phone) return;

//     setLoading(true);
//     setError('');

//     try {
//       await addWaitlistEntry(name, phone);
//       setWaitlist([
//         { id: Math.random().toString(), name, phone, created_at: new Date().toISOString() },
//         ...waitlist,
//       ],);
//       setName('');
//       setPhone('');
//     } catch (err: any) {
//       setError(err.message || 'Failed to insert entry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (id: string) => {
//     try {
//       await removeWaitlistEntry(id);
//       setWaitlist(waitlist.filter((item) => item.id !== id));
//     } catch (err) {
//       alert('Error removing item.');
//     }
//   };

//   // Calculates details of waitlist entry age (limit 30 days)
//   const getExpirationProgress = (createdAt: string) => {
//     const createdDate = new Date(createdAt);
//     const currentDate = new Date();
//     const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     const daysRemaining = Math.max(0, 30 - diffDays);
//     const percentRemaining = (daysRemaining / 30) * 100;

//     return {
//       daysElapsed: diffDays,
//       daysRemaining,
//       percent: percentRemaining,
//     };
//   };

//   return (
//     <div className="bg-paper border border-grey-line p-6 rounded-2xl flex flex-col h-[520px] shadow-sm">
//       <div className="mb-4">
//         <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
//           <span>Waitlist Manager</span>
//           <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">30-day dynamic window</span>
//         </h3>
//         <p className="font-body text-xs text-ink/50 mt-1">
//           {readOnly
//             ? 'People waiting for an open slot (read‑only preview).'
//             : 'Add people to automatically offer cancelled slots.'}
//         </p>
//       </div>

//       {!readOnly && (
//         <form onSubmit={handleAdd} className="space-y-3 p-3.5 bg-grey-light/40 border border-grey-line/60 rounded-xl mb-4">
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               placeholder="Contact Name"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full bg-paper border border-grey-line px-3 py-2 text-xs text-ink placeholder-ink/40 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
//             />
//             <input
//               type="text"
//               placeholder="+14155551234"
//               required
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full bg-paper border border-grey-line px-3 py-2 text-xs text-ink font-mono placeholder-ink/40 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-paper py-2 text-xs font-bold font-body rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
//           >
//             <UserPlus size={14} />
//             {loading ? 'Adding to Waitlist...' : 'Add Waitlist Member'}
//           </button>
//         </form>
//       )}

//       {error && <p className="text-[11px] text-red-600 font-semibold mb-2">{error}</p>}

//       <div className="flex-1 overflow-y-auto space-y-3 pr-1">
//         {waitlist.length === 0 ? (
//           <div className="h-full flex flex-col items-center justify-center text-center">
//             <p className="font-body text-xs text-ink/40">The waitlist is currently empty.</p>
//           </div>
//         ) : (
//           waitlist.map((person) => {
//             const { daysElapsed, daysRemaining, percent } = getExpirationProgress(person.created_at);
//             const isCritical = daysRemaining <= 5;

//             return (
//               <div
//                 key={person.id}
//                 className="p-3 bg-grey-light/30 border border-grey-line rounded-xl space-y-2 hover:border-grey-line/80 transition-all"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="font-body text-xs font-bold text-ink">{person.name}</span>
//                     <span className="font-body text-[11px] text-ink/50 ml-2 font-mono">{person.phone}</span>
//                   </div>
//                   {!readOnly && (
//                     <button
//                       onClick={() => handleRemove(person.id)}
//                       className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
//                       title="Remove Entry"
//                     >
//                       <Trash2 size={13} />
//                     </button>
//                   )}
//                 </div>

//                 {/* Expiration visual countdown details */}
//                 <div className="space-y-1">
//                   <div className="flex items-center justify-between text-[10px] text-ink/50">
//                     <span className="flex items-center gap-1 font-body">
//                       <Calendar size={11} /> 
//                       {new Date(person.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
//                     </span>
//                     <span className={`flex items-center gap-0.5 font-semibold ${isCritical ? 'text-red-600' : 'text-indigo-600'}`}>
//                       <Clock size={11} />
//                       {daysRemaining}d left
//                     </span>
//                   </div>
                  
//                   {/* Lifeline visual progress bar */}
//                   <div className="w-full bg-grey-line h-1.5 rounded-full overflow-hidden">
//                     <div
//                       className={`h-full rounded-full transition-all duration-300 ${
//                         isCritical ? 'bg-red-500' : percent > 50 ? 'bg-indigo-600' : 'bg-amber-500'
//                       }`}
//                       style={{ width: `${percent}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useTransition } from "react";
import {
  addWaitlistEntry,
  removeWaitlistEntry,
  setWaitlistAutoExpire,
  type WaitlistEntry,
} from "@/lib/dashboard/action";
import { Calendar, Trash2, Clock, UserPlus } from "lucide-react";

const TTL_DAYS = 15;

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
  const percentRemaining = Math.min(100, Math.max(0, (daysRemaining / ttlDays) * 100));

  return {
    daysElapsed: diffDays,
    daysRemaining,
    percent: percentRemaining,
  };
}

export function WaitlistManager({
  initialWaitlist,
  initialAutoExpire = true,
  ttlDays = TTL_DAYS,
  readOnly = false,
}: {
  initialWaitlist: WaitlistEntry[];
  initialAutoExpire?: boolean;
  ttlDays?: number;
  readOnly?: boolean;
}) {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(initialWaitlist || []);
  const [autoExpire, setAutoExpire] = useState(initialAutoExpire);
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

  const handleToggleAutoExpire = (next: boolean) => {
    setError("");
    const prev = autoExpire;
    setAutoExpire(next);
    startTransition(async () => {
      try {
        await setWaitlistAutoExpire(next);
        if (next) {
          // Drop rows that are already past TTL in the UI
          const cutoff = Date.now() - ttlDays * 86400000;
          setWaitlist((list) =>
            list.filter((p) => new Date(p.created_at).getTime() >= cutoff)
          );
        }
      } catch (err: any) {
        setAutoExpire(prev);
        setError(err?.message || "Could not update auto-remove setting.");
      }
    });
  };

  return (
    <div className="bg-paper border border-grey-line p-6 rounded-2xl flex flex-col h-[520px] shadow-sm">
      <div className="mb-4">
        <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2 flex-wrap">
          <span>Waitlist Manager</span>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
            {ttlDays}-day window
          </span>
        </h3>
        <p className="font-body text-xs text-ink/50 mt-1">
          {readOnly
            ? "People waiting for an open slot (read-only preview)."
            : "Add people to automatically offer cancelled slots."}
        </p>
      </div>

      {!readOnly && (
        <form
          onSubmit={handleAdd}
          className="space-y-3 p-3.5 bg-grey-light/40 border border-grey-line/60 rounded-xl mb-4"
        >
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Contact Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-paper border border-grey-line px-3 py-2 text-xs text-ink placeholder-ink/40 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="+14155551234"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-paper border border-grey-line px-3 py-2 text-xs text-ink font-mono placeholder-ink/40 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-paper py-2 text-xs font-bold font-body rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <UserPlus size={14} />
            {loading ? "Adding to Waitlist..." : "Add Waitlist Member"}
          </button>
        </form>
      )}

      {error && (
        <p className="text-[11px] text-red-600 font-semibold mb-2">{error}</p>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {waitlist.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center min-h-[120px]">
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
                className="p-3 bg-grey-light/30 border border-grey-line rounded-xl space-y-2 hover:border-grey-line/80 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-body text-xs font-bold text-ink">
                      {person.name}
                    </span>
                    <span className="font-body text-[11px] text-ink/50 ml-2 font-mono">
                      {person.phone}
                    </span>
                  </div>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => handleRemove(person.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors shrink-0"
                      title="Remove Entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-ink/50 gap-2">
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
                      <span className="font-semibold text-ink/40">No expiry</span>
                    )}
                  </div>

                  {autoExpire && (
                    <div className="w-full bg-grey-line h-1.5 rounded-full overflow-hidden">
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

      {/* Bottom bar — 15-day auto-remove */}
      {!readOnly && (
        <div className="mt-4 pt-3 border-t border-grey-line flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-body text-xs font-semibold text-ink">
              Auto-remove after {ttlDays} days
            </p>
            <p className="font-body text-[10px] text-ink/50 mt-0.5 leading-snug">
              When on, anyone added more than {ttlDays} days ago is removed
              automatically.
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
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-paper shadow transition-transform ${
                autoExpire ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}