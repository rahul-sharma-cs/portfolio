export type Cell = { label: string; value: string; accent?: boolean };

/** The engineering drawing title block: rows of bordered label/value cells. */
export default function TitleBlock({ rows, className = "" }: { rows: Cell[][]; className?: string }) {
  return (
    <div className={`border border-ink font-mono text-[0.65rem] tracking-[0.06em] ${className}`}>
      {rows.map((cells, r) => (
        <div key={r} className={`flex ${r > 0 ? "border-t border-ink" : ""}`}>
          {cells.map((cell, i) => (
            <div key={cell.label} className={`min-w-0 flex-1 px-2.5 py-1.5 ${i > 0 ? "border-l border-ink" : ""}`}>
              <span className="block text-[0.55rem] uppercase tracking-[0.14em] text-pencil">{cell.label}</span>
              <span className={`block truncate font-semibold uppercase ${cell.accent ? "text-redline" : "text-ink"}`}>
                {cell.value}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
