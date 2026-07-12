"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/** Fixed graph-paper layer. Drifts slightly against scroll = paper depth. */
export default function SheetGrid() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const y = useTransform(scrollY, (v) => (reduce ? 0 : -((v * 0.06) % 96)));
  return (
    <motion.div
      aria-hidden
      style={{ y }}
      className="bg-grid fixed inset-x-0 -top-[10vh] -z-10 h-[130vh]"
    />
  );
}
