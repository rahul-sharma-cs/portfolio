"use client";

import { motion, useReducedMotion } from "motion/react";

/** Hairline that draws itself on (scaleX). Set `className` for color/origin overrides. */
export function RuleX({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={`block h-px origin-left bg-rule ${className}`}
    />
  );
}
