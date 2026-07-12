"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMediaQuery } from "@/lib/hooks";
import LeaderLabel from "@/components/drafting/leader-label";

type Layer = { layer: string; label: string };

const EXPLODED_GAP = 72; // px between planes, exploded
const STACKED_GAP = 20; // px between planes, assembled
const BOOST_GAP = 26; // extra separation on hover/tap

function Plane({
  depth,
  index,
  assemble,
  boost,
  label,
}: {
  depth: number; // 0 = bottom plane, n-1 = top plane
  index: number; // display index (01 = top layer)
  assemble: MotionValue<number>;
  boost: MotionValue<number>;
  label: string;
}) {
  const z = useTransform(() => {
    const a = assemble.get();
    const b = boost.get();
    const base = depth * (EXPLODED_GAP + (STACKED_GAP - EXPLODED_GAP) * a);
    return base + b * depth * BOOST_GAP;
  });
  const transform = useMotionTemplate`rotateX(55deg) rotateZ(-45deg) translateZ(${z}px)`;
  return (
    <motion.div
      style={{ transform }}
      className="absolute inset-x-[16%] top-[22%] h-[44%] border border-ink bg-sheet/90"
    >
      <span className="absolute left-2 top-1.5 font-mono text-[0.6rem] tracking-[0.12em] text-redline">
        {String(index).padStart(2, "0")}
      </span>
      <span className="absolute bottom-1.5 right-2 hidden font-mono text-[0.5rem] uppercase tracking-[0.1em] text-pencil sm:block">
        {label}
      </span>
    </motion.div>
  );
}

export default function ExplodedView({
  layers,
  title,
  className = "",
}: {
  layers: readonly Layer[];
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const [popped, setPopped] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.45"] });
  const assembleSpring = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const assembledStill = useMotionValue(1);
  const assemble = reduce ? assembledStill : assembleSpring;

  const boostRaw = useMotionValue(0);
  const boost = useSpring(boostRaw, { stiffness: 200, damping: 22 });

  const setBoost = (v: number) => {
    if (!reduce) boostRaw.set(v);
  };

  const n = layers.length;

  return (
    <div ref={ref} className={className}>
      <div
        role="img"
        aria-label={`Exploded architecture diagram for ${title}: ${layers.map((l) => l.layer).join(", ")}`}
        className="relative aspect-[4/3] w-full [perspective:1100px]"
        onPointerEnter={fine ? () => setBoost(1) : undefined}
        onPointerLeave={fine ? () => setBoost(0) : undefined}
        onClick={
          !fine && !reduce
            ? () => {
                const next = !popped;
                setBoost(next ? 1 : 0);
                setPopped(next);
              }
            : undefined
        }
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {layers.map((layer, i) => (
            <Plane
              key={layer.layer}
              depth={n - 1 - i}
              index={i + 1}
              assemble={assemble}
              boost={boost}
              label={layer.layer}
            />
          ))}
        </div>
      </div>
      <ol className="mt-2 space-y-1.5">
        {layers.map((layer, i) => (
          <LeaderLabel key={layer.layer} index={i} label={`${layer.layer.toUpperCase()} — ${layer.label.toUpperCase()}`} />
        ))}
      </ol>
      {!fine && !reduce && (
        <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-pencil">
          {popped ? "Tap to assemble" : "Tap to explode"}
        </p>
      )}
    </div>
  );
}
