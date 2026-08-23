"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="m-6 rounded-xl border border-red-300 bg-red-50 p-6">
      <p className="font-semibold text-red-900">This page failed to load.</p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-red-700">digest: {error.digest}</p>
      )}
      <button onClick={reset} className="mt-4 text-sm underline">
        Try again
      </button>
    </div>
  );
}