"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Desktop-only crosshair + live X/Y readout. Augments (never replaces) the native
 * cursor; snaps a redline bracket to interactive targets; fades over prose.
 * Mounts only on (pointer:fine) without reduced-motion. Carries zero unique info.
 */
export default function CrosshairCursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();
  if (!fine || reduce) return null;
  return <Crosshair />;
}

function Crosshair() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45 });
  const sy = useSpring(y, { stiffness: 700, damping: 45 });
  const readX = useTransform(sx, (v) => `X:${String(Math.max(0, Math.round(v))).padStart(4, "0")}`);
  const readY = useTransform(sy, (v) => `Y:${String(Math.max(0, Math.round(v))).padStart(4, "0")}`);

  const bx = useSpring(useMotionValue(0), { stiffness: 400, damping: 32 });
  const by = useSpring(useMotionValue(0), { stiffness: 400, damping: 32 });
  const bw = useSpring(useMotionValue(0), { stiffness: 400, damping: 32 });
  const bh = useSpring(useMotionValue(0), { stiffness: 400, damping: 32 });

  const [mode, setMode] = useState<"free" | "target" | "prose">("free");

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      const interactive = el?.closest?.("a, button, [role='button'], input, [data-cursor='target']");
      if (interactive) {
        const r = interactive.getBoundingClientRect();
        bx.set(r.left - 6);
        by.set(r.top - 6);
        bw.set(r.width + 12);
        bh.set(r.height + 12);
        setMode("target");
        return;
      }
      setMode(el?.closest?.("p, [data-prose]") ? "prose" : "free");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [x, y, bx, by, bw, bh]);

  const lineOpacity = mode === "free" ? 0.28 : mode === "prose" ? 0.08 : 0;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <motion.div
        style={{ x: sx, opacity: lineOpacity }}
        className="absolute top-0 h-screen w-px bg-ink transition-opacity duration-200"
      />
      <motion.div
        style={{ y: sy, opacity: lineOpacity }}
        className="absolute left-0 h-px w-screen bg-ink transition-opacity duration-200"
      />
      <motion.p
        style={{ x: sx, y: sy, opacity: mode === "free" ? 1 : 0 }}
        className="absolute font-mono text-[0.55rem] tracking-[0.08em] text-pencil transition-opacity duration-200"
      >
        {/* offset lives on inner padding, not a CSS transform — motion's style={{x,y}}
            would otherwise clobber a transform set via className on this same element */}
        <span className="block pl-3 pt-3.5">
          <motion.span>{readX}</motion.span> <motion.span>{readY}</motion.span>
        </span>
      </motion.p>
      <motion.div
        style={{ x: bx, y: by, width: bw, height: bh, opacity: mode === "target" ? 1 : 0 }}
        className="absolute transition-opacity duration-150"
      >
        <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-redline" />
        <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2 border-redline" />
        <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-redline" />
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-redline" />
      </motion.div>
    </div>
  );
}
