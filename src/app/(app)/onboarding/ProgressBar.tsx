// src/app/(app)/onboarding/ProgressBar.tsx
'use client'

const STEPS = [
  { num: 1, label: 'Business Details' },
  { num: 2, label: 'Google Calendar' },
  { num: 3, label: 'Review & Activate' },
  { num: 4, label: 'Test & Finish' },
]

export function ProgressBar({ currentStep }: { currentStep: number }) {
  const pct = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      {/* Track */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-zinc-700" />
        {/* Filled line */}
        <div
          className="absolute left-0 top-4 h-0.5 bg-emerald-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />

        {STEPS.map((s) => {
          const done = s.num < currentStep
          const active = s.num === currentStep
          return (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors
                  ${done ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                  ${active ? 'bg-zinc-900 border-emerald-500 text-emerald-400' : ''}
                  ${!done && !active ? 'bg-zinc-800 border-zinc-600 text-zinc-500' : ''}
                `}
              >
                {done ? '✓' : s.num}
              </div>
              <span
                className={`mt-2 text-xs ${active ? 'text-emerald-400' : done ? 'text-zinc-300' : 'text-zinc-500'}`}
              >
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}