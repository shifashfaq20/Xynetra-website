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

'use client';

import { useState } from 'react';
import { addWaitlistEntry, removeWaitlistEntry } from '@/lib/dashboard/action';

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
      ]);
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

  return (
    <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col h-[400px]">
      <div className="mb-4">
        <h3 className="font-display text-lg font-bold text-ink">Waitlist Manager</h3>
        <p className="font-body text-xs text-ink/50 mt-0.5">
          {readOnly
            ? 'People waiting for a cancelled slot (read‑only preview).'
            : 'Add people to offer cancelled slots to.'}
        </p>
      </div>

      {!readOnly && (
        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 min-w-0 bg-grey-light border border-grey-line px-3 py-2 text-xs text-ink placeholder-ink/40 rounded focus:border-purple focus:outline-none"
          />
          <input
            type="text"
            placeholder="+14155551234"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 min-w-0 bg-grey-light border border-grey-line px-3 py-2 text-xs text-ink placeholder-ink/40 rounded focus:border-purple focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple text-paper px-4 py-2 text-xs font-bold font-body rounded hover:bg-ink transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}

      {error && <p className="text-[11px] text-coral font-semibold mb-2">{error}</p>}

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {waitlist.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="font-body text-xs text-ink/40">The waitlist is currently empty.</p>
          </div>
        ) : (
          waitlist.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-2.5 bg-grey-light/50 border border-grey-line rounded"
            >
              <div>
                <span className="font-body text-xs font-bold text-ink">{person.name}</span>
                <span className="font-body text-[11px] text-ink/50 ml-2 font-mono">{person.phone}</span>
              </div>
              {!readOnly && (
                <button
                  onClick={() => handleRemove(person.id)}
                  className="text-[11px] font-body text-coral hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}