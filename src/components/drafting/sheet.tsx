"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useSectionInView } from "@/lib/hooks";
import type { Link } from "@/lib/types";
import { RuleX } from "@/components/drafting/rule";

/**
 * Section wrapper: scroll-spy registration, ghost sheet numeral (slow parallax,
 * cropped by the viewport edge), mono eyebrow heading, content container.
 */
export default function Sheet({
  link,
  eyebrow,
  threshold = 0.5,
  className = "",
  children,
}: {
  link: Link;
  eyebrow: string;
  threshold?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, id } = useSectionInView(link.name, threshold);
  const sectionRef = useRef<HTMLElement | null>(null);
  const setRefs = (el: HTMLElement | null) => {
    sectionRef.current = el;
    ref(el);
  };
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? ["0px", "0px"] : ["20px", "-20px"]);

  return (
    <section ref={setRefs} id={id} className={`relative scroll-mt-20 overflow-x-clip py-20 sm:py-28 ${className}`}>
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -right-3 top-4 select-none font-sans text-[clamp(7rem,20vw,17rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--c-rule))]"
      >
        {link.num}
      </motion.span>
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mb-2 font-mono text-anno-sm font-medium uppercase tracking-[0.16em] text-pencil">
          SHT {link.num}/06 — {eyebrow}
        </h2>
        <RuleX className="mb-10" />
        {children}
      </div>
    </section>
  );
}
