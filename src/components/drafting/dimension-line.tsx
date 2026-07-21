"use client";

import { RuleX } from "@/components/drafting/rule";
import Counter from "@/components/drafting/counter";

/** Engineering dimension line. Pass the live measured width (useMeasuredWidth). */
export default function DimensionLine({ width, className = "" }: { width: number; className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-2 text-redline ${className}`}>
      <span className="h-2.5 w-px shrink-0 bg-redline" />
      <RuleX className="flex-1 !bg-redline" />
      <span className="shrink-0 whitespace-nowrap font-mono text-anno-sm tracking-[0.1em] tabular-nums">
        ← <Counter value={width} /> PX →
      </span>
      <RuleX className="flex-1 origin-right !bg-redline" />
      <span className="h-2.5 w-px shrink-0 bg-redline" />
    </div>
  );
}
