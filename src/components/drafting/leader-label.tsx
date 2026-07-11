/** Annotation row: leader glyph (dot + line) + optional index + mono label. Use inside <ul>/<ol>. */
export default function LeaderLabel({
  label,
  index,
  className = "",
}: {
  label: string;
  index?: number;
  className?: string;
}) {
  return (
    <li className={`flex items-baseline gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-pencil ${className}`}>
      <span aria-hidden className="flex shrink-0 translate-y-[-2px] items-center gap-1">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-redline" />
        <span className="inline-block h-px w-6 bg-redline" />
      </span>
      {typeof index === "number" && (
        <span className="shrink-0 text-redline">{String(index + 1).padStart(2, "0")}</span>
      )}
      <span>{label}</span>
    </li>
  );
}
