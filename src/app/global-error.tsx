"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 2rem", maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>This page couldn&apos;t load</h1>
        <p style={{ color: "#666", marginBottom: 16 }}>Reload to try again, or go back.</p>
        {error.digest && (
          <p style={{ fontFamily: "monospace", fontSize: 12, background: "#f4f4f5", padding: "8px 12px", borderRadius: 6 }}>
            digest: {error.digest}
          </p>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={reset} style={{ background: "#111", color: "#fff", border: 0, padding: "10px 20px", borderRadius: 6 }}>
            Reload
          </button>
          <button onClick={() => history.back()} style={{ background: "#fff", border: "1px solid #ddd", padding: "10px 20px", borderRadius: 6 }}>
            Back
          </button>
        </div>
      </body>
    </html>
  );
}