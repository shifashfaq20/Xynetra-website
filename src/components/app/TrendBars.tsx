// Simple accent bar chart for the 12-week trend. Single accent color, no
// gridlines or chartjunk — echoes the brand's restraint.
export function TrendBars({
  data,
  accent,
}: {
  data: number[];
  accent: "coral" | "blue";
}) {
  const max = Math.max(...data, 1);
  const bg = accent === "coral" ? "bg-coral" : "bg-blue";
  return (
    <div className="mt-4 flex h-28 items-end gap-1.5" role="img" aria-label="12-week trend">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className={`w-full ${bg}`}
            style={{ height: `${Math.max((v / max) * 100, 4)}%` }}
            title={`Week ${i + 1}: ${v}`}
          />
          <span className="font-body text-[10px] text-ink/40">{i + 1}</span>
        </div>
      ))}
    </div>
  );
}
