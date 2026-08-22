'use client';

export function UpcomingAppointments({ appointments }: { appointments: any[] }) {
  return (
    <div className="bg-paper border border-grey-line p-6 rounded-lg flex flex-col h-[400px]">
      <h3 className="font-display text-lg font-bold text-ink mb-4">Upcoming Appointments</h3>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {appointments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="font-body text-sm text-ink/40">No pending or upcoming bookings found.</p>
          </div>
        ) : (
          appointments.map((appt) => (
            <div key={appt.id} className="flex items-center justify-between border-b border-grey-line pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-body text-sm font-semibold text-ink">{appt.customer_name}</p>
                <p className="font-body text-xs text-ink/50">
                  {new Date(appt.appointment_time).toLocaleString(undefined, {
                    timeZone: appt.timezone || undefined,
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold font-body border rounded-full uppercase ${
                appt.status === 'confirmed' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : appt.status === 'cancelled'
                  ? 'bg-red-50 text-coral border-red-100'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200'
              }`}>
                {appt.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}