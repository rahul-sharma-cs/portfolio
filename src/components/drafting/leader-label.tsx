/**
 * Annotation row: leader glyph (dot + line) + optional index + mono label. Use inside <ul>/<ol>.
 * `tone="accent"` (default) is the reserved redline mark; `tone="quiet"` renders the same glyph
 * in rule/pencil tones for high-repetition contexts (e.g. tag lists) where redline would read as texture.
 */
export default function LeaderLabel({
  label,
  index,
  tone = "accent",
  className = "",
}: {
  label: string;
  index?: number;
  tone?: "accent" | "quiet";
  className?: string;
}) {
  const glyphColor = tone === "quiet" ? "bg-rule" : "bg-redline";
  const indexColor = tone === "quiet" ? "text-pencil" : "text-redline";
  return (
    <li className={`flex items-baseline gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-pencil ${className}`}>
      <span aria-hidden className="flex shrink-0 translate-y-[-2px] items-center gap-1">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${glyphColor}`} />
        <span className={`inline-block h-px w-6 ${glyphColor}`} />
      </span>
      {typeof index === "number" && (
        <span className={`shrink-0 ${indexColor}`}>{String(index + 1).padStart(2, "0")}</span>
      )}
      <span>{label}</span>
    </li>
  );
}
