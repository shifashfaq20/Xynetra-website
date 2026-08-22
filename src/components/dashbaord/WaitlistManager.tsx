// 'use client';

// import { useState } from 'react';
// import { addWaitlistEntry, removeWaitlistEntry } from '@/lib/dashboard/action';

// export function WaitlistManager({ initialWaitlist }: { initialWaitlist: any[] }) {
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
//       setWaitlist([{ id: Math.random().toString(), name, phone, created_at: new Date().toISOString() }, ...waitlist]);
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
//       setWaitlist(waitlist.filter(item => item.id !== id));
//     } catch (err) {
//       alert('Error removing item.');
//     }
//   };

//   return (
//     <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col h-[400px]">
//       <div className="mb-4">
//         <h3 className="font-display text-lg font-bold text-ink">Waitlist Manager</h3>
//         <p className="font-body text-xs text-ink/50 mt-0.5">Add people to offer cancelled slots to.</p>
//       </div>

//       <form onSubmit={handleAdd} className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Name"
//           required
//           value={name}
//           onChange={e => setName(e.target.value)}
//           className="flex-1 min-w-0 bg-grey-light border border-grey-line px-3 py-2 text-xs text-ink placeholder-ink/40 rounded focus:border-purple focus:outline-none"
//         />
//         <input
//           type="text"
//           placeholder="+14155551234"
//           required
//           value={phone}
//           onChange={e => setPhone(e.target.value)}
//           className="flex-1 min-w-0 bg-grey-light border border-grey-line px-3 py-2 text-xs text-ink placeholder-ink/40 rounded focus:border-purple focus:outline-none"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-purple text-paper px-4 py-2 text-xs font-bold font-body rounded hover:bg-ink transition-colors disabled:opacity-50"
//         >
//           {loading ? 'Adding...' : 'Add'}
//         </button>
//       </form>

//       {error && <p className="text-[11px] text-coral font-semibold mb-2">{error}</p>}

//       <div className="flex-1 overflow-y-auto space-y-2 pr-1">
//         {waitlist.length === 0 ? (
//           <div className="h-full flex flex-col items-center justify-center text-center">
//             <p className="font-body text-xs text-ink/40">The waitlist is currently empty.</p>
//           </div>
//         ) : (
//           waitlist.map((person) => (
//             <div key={person.id} className="flex items-center justify-between p-2.5 bg-grey-light/50 border border-grey-line rounded">
//               <div>
//                 <span className="font-body text-xs font-bold text-ink">{person.name}</span>
//                 <span className="font-body text-[11px] text-ink/50 ml-2 font-mono">{person.phone}</span>
//               </div>
//               <button
//                 onClick={() => handleRemove(person.id)}
//                 className="text-[11px] font-body text-coral hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


// src/components/dashboard/WaitlistManager.tsx
'use client';

import React, { useState } from 'react';
import { addWaitlistEntry, removeWaitlistEntry } from '@/lib/dashboard/action';
import { Calendar, Trash2, Clock, UserPlus } from 'lucide-react';

export function WaitlistManager({
  initialWaitlist,
  readOnly = false,
}: {
  initialWaitlist: any[];
  readOnly?: boolean;
}) {
  const [waitlist, setWaitlist] = useState(initialWaitlist);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setError('');

    try {
      await addWaitlistEntry(name, phone);
      setWaitlist([
        { id: Math.random().toString(), name, phone, created_at: new Date().toISOString() },
        ...waitlist,
      ],);
      setName('');
      setPhone('');
    } catch (err: any) {
      setError(err.message || 'Failed to insert entry.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeWaitlistEntry(id);
      setWaitlist(waitlist.filter((item) => item.id !== id));
    } catch (err) {
      alert('Error removing item.');
    }
  };

  // Calculates details of waitlist entry age (limit 30 days)
  const getExpirationProgress = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const daysRemaining = Math.max(0, 30 - diffDays);
    const percentRemaining = (daysRemaining / 30) * 100;

    return {
      daysElapsed: diffDays,
      daysRemaining,
      percent: percentRemaining,
    };
  };

  return (
    <div className="bg-paper border border-grey-line p-6 rounded-2xl flex flex-col h-[520px] shadow-sm">
      <div className="mb-4">
        <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
          <span>Waitlist Manager</span>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">30-day dynamic window</span>
        </h3>
        <p className="font-body text-xs text-ink/50 mt-1">
          {readOnly
            ? 'People waiting for an open slot (read‑only preview).'
            : 'Add people to automatically offer cancelled slots.'}
        </p>
      </div>

      {!readOnly && (
        <form onSubmit={handleAdd} className="space-y-3 p-3.5 bg-grey-light/40 border border-grey-line/60 rounded-xl mb-4">
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
            {loading ? 'Adding to Waitlist...' : 'Add Waitlist Member'}
          </button>
        </form>
      )}

      {error && <p className="text-[11px] text-red-600 font-semibold mb-2">{error}</p>}

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {waitlist.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="font-body text-xs text-ink/40">The waitlist is currently empty.</p>
          </div>
        ) : (
          waitlist.map((person) => {
            const { daysElapsed, daysRemaining, percent } = getExpirationProgress(person.created_at);
            const isCritical = daysRemaining <= 5;

            return (
              <div
                key={person.id}
                className="p-3 bg-grey-light/30 border border-grey-line rounded-xl space-y-2 hover:border-grey-line/80 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-xs font-bold text-ink">{person.name}</span>
                    <span className="font-body text-[11px] text-ink/50 ml-2 font-mono">{person.phone}</span>
                  </div>
                  {!readOnly && (
                    <button
                      onClick={() => handleRemove(person.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Remove Entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                {/* Expiration visual countdown details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-ink/50">
                    <span className="flex items-center gap-1 font-body">
                      <Calendar size={11} /> 
                      {new Date(person.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <span className={`flex items-center gap-0.5 font-semibold ${isCritical ? 'text-red-600' : 'text-indigo-600'}`}>
                      <Clock size={11} />
                      {daysRemaining}d left
                    </span>
                  </div>
                  
                  {/* Lifeline visual progress bar */}
                  <div className="w-full bg-grey-line h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCritical ? 'bg-red-500' : percent > 50 ? 'bg-indigo-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}