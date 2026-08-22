'use client';

import { useState, useTransition } from 'react';
import { resolveHandoff } from '@/lib/dashboard/action';

export function NeedsAttention({ initialHandoffs }: { initialHandoffs: any[] }) {
  const [items, setItems] = useState(initialHandoffs);
  const [isPending, startTransition] = useTransition();

  const handleResolve = (id: string) => {
    startTransition(async () => {
      await resolveHandoff(id);
      setItems((prev) => prev.filter((h) => h.id !== id));
    });
  };

  return (
    <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col h-[320px]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Needs Your Reply</h3>
          <p className="font-body text-xs text-ink/50 mt-0.5">
            Customer replies that need a human — answer them on WhatsApp, then mark resolved.
          </p>
        </div>
        {items.length > 0 && (
          <span className="rounded-full bg-coral px-2.5 py-0.5 font-body text-xs font-bold text-paper">
            {items.length}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="font-body text-sm text-ink/40">Nothing waiting on you. 🎉</p>
          </div>
        ) : (
          items.map((h) => (
            <div key={h.id} className="border border-grey-line rounded-lg p-3">
              <div className="flex items-center justify-between">
                <p className="font-body text-sm font-semibold text-ink">
                  {h.customer_name || 'Customer'}
                  <span className="ml-2 font-mono text-xs font-normal text-ink/50">
                    {h.customer_phone}
                  </span>
                </p>
                <button
                  onClick={() => handleResolve(h.id)}
                  disabled={isPending}
                  className="text-[11px] font-body font-semibold text-ink/60 hover:text-ink underline disabled:opacity-50"
                >
                  Mark resolved
                </button>
              </div>
              <p className="mt-1 font-body text-xs text-ink/70">“{h.message}”</p>
              <p className="mt-1 font-body text-[10px] text-ink/40 font-mono">
                {new Date(h.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}