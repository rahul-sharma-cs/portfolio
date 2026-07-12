"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Rubber stamp. `thunk` = spring slam (HARD CAP: 4 uses sitewide — hero status,
 * Dean's List, Approved, one reserve). `quiet` = fade (per-plate REV PENDING marks).
 */
export default function Stamp({
  children,
  variant = "thunk",
  className = "",
}: {
  children: ReactNode;
  variant?: "thunk" | "quiet";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = `inline-block border-2 border-redline px-3 py-1.5 font-mono text-anno-sm font-bold uppercase tracking-[0.14em] text-redline ${className}`;

  if (variant === "quiet" || reduce) {
    return (
      <motion.span
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4 }}
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
      whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={base}
    >
      {children}
    </motion.span>
  );
}
