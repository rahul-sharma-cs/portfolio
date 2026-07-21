"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useMediaQuery } from "@/lib/hooks";

/** Sheet-off-the-desk tilt toward the cursor. Fine pointers only; max ~3 degrees. */
export default function Tilt({
  children,
  max = 3,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();

  if (!fine || reduce) {
    return <div className={className}>{children}</div>;
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
