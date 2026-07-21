"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/** Spring tick-up counter. tabular-nums so layout never shifts. Fires once in view. */
export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 55, damping: 18 });
  const text = useTransform(spring, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (inView) {
      // spring.jump(0) resets the spring's own position synchronously —
      // useSpring(mv) intercepts mv's updates via a passive effect deferred
      // to the next frame, so jumping mv alone collapses jump(0)+set(value)
      // into a single no-op update. Jumping the spring directly is what
      // actually makes the tick-up animate from 0.
      spring.jump(0);
      mv.jump(0);
      mv.set(value);
    }
  }, [inView, mv, spring, value]);

  if (reduce) {
    return (
      <span className={`tabular-nums ${className}`}>
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
    );
  }
  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </motion.span>
  );
}
