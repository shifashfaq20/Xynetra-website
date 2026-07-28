'use client';

export function ActivityFeed({ reminders }: { reminders: any[] }) {
  return (
    <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col h-[320px]">
      <h3 className="font-display text-lg font-bold text-ink mb-4">Activity Feed</h3>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {reminders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="font-body text-sm text-ink/40">No reminders sent out recently.</p>
          </div>
        ) : (
          reminders.map((rem) => (
            <div key={rem.id} className="border-b border-grey-line pb-2.5 last:border-0 last:pb-0">
              <p className="font-body text-xs text-ink">{rem.message}</p>
              <p className="font-body text-[10px] text-ink/40 mt-1 font-mono">
                {new Date(rem.sent_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}