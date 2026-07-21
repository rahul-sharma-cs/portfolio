"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Rubber stamp. `thunk` = spring slam (HARD CAP: 4 uses sitewide — hero status,
 * Dean's List, Approved, one reserve). `quiet` = fade (per-plate REV PENDING marks).
 *
 * `mode` controls the entrance trigger:
 *  - "view" (default): whileInView — plays when scrolled into the viewport.
 *    Zero change for existing call sites.
 *  - "mount": initial + animate — plays once on mount, for subtrees that remount
 *    when an opacity-gated ancestor arms (e.g. the hero intro). Accepts `delay`,
 *    folded into the transition.
 *  - "static": final state only, no animation.
 *
 * Reduced motion always renders the static final state, regardless of mode.
 */
export default function Stamp({
  children,
  variant = "thunk",
  mode = "view",
  delay,
  className = "",
}: {
  children: ReactNode;
  variant?: "thunk" | "quiet";
  mode?: "view" | "mount" | "static";
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = `inline-block border-2 border-redline px-3 py-1.5 font-mono text-anno-sm font-bold uppercase tracking-[0.14em] text-redline ${className}`;

  if (mode === "static" || reduce) {
    return (
      <motion.span style={{ rotate: -3 }} className={base}>
        {children}
      </motion.span>
    );
  }

  if (variant === "quiet") {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        {...(mode === "mount"
          ? { animate: { opacity: 1 } }
          : { whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.6 } })}
        transition={{ duration: 0.4, delay }}
        style={{ rotate: -3 }}
        className={base}
      >
        {children}
      </motion.span>
    );
  }
  return (
    <motion.span
      initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
      {...(mode === "mount"
        ? { animate: { opacity: 1, scale: 1, rotate: -3 } }
        : { whileInView: { opacity: 1, scale: 1, rotate: -3 }, viewport: { once: true, amount: 0.6 } })}
      transition={{ type: "spring", stiffness: 500, damping: 28, delay }}
      className={base}
    >
      {children}
    </motion.span>
  );
}
