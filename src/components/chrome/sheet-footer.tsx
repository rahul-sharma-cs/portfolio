"use client";

import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";

/** Running drawing footer + page-corner crop marks. */
export default function SheetFooter() {
  const { activeSection } = useActiveSectionContext();
  const num = links.find((l) => l.name === activeSection)?.num ?? "01";
  const corner = "fixed z-30 h-4 w-4 border-ink/40 pointer-events-none";
  return (
    <>
      <span aria-hidden className={`${corner} left-2 top-14 border-l border-t`} />
      <span aria-hidden className={`${corner} right-2 top-14 border-r border-t`} />
      <span aria-hidden className={`${corner} bottom-2 left-2 border-b border-l`} />
      <span aria-hidden className={`${corner} bottom-2 right-2 border-b border-r`} />
      <p
        aria-hidden
        className="pointer-events-none fixed bottom-3 right-8 z-30 hidden font-mono text-[0.55rem] uppercase tracking-[0.16em] text-pencil sm:block"
      >
        Rahul Sharma — Drawing Set — SHT {num}/06
      </p>
    </>
  );
}
