"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { links, siteConfig } from "@/lib/data";
import Sheet from "@/components/drafting/sheet";
import TitleBlock from "@/components/drafting/title-block";
import Stamp from "@/components/drafting/stamp";
import PlottedName from "@/components/drafting/plotted-name";
import DimensionLine from "@/components/drafting/dimension-line";
import { useMeasuredWidth } from "@/lib/hooks";

// Latched once at module evaluation (pre-hydration, after the <head> gate script):
// stable for the component's lifetime, so later re-renders can't kill the animation.
const INTRO_PENDING =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("intro-pending");

/** True exactly when this session hasn't seen the intro (html.intro-pending was set pre-paint). */
function useIntroPlay(): boolean {
  const reduce = useReducedMotion();
  const pending = useSyncExternalStore(
    () => () => {},
    () => INTRO_PENDING,
    () => false
  );
  return pending && !reduce;
}

const BUILD_SHA = process.env.NEXT_PUBLIC_BUILD_SHA ?? "dev";
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";

export default function Sheet01TitleBlock() {
  const play = useIntroPlay();

  // Once mounted: mark seen, release the CSS gate, and — only if the intro was
  // actually pending for this visitor — let any input skip the show. Repeat
  // visitors (wasPending === false) never had anything to skip, so they must
  // not have skip listeners attached to <html> for the rest of the session.
  useEffect(() => {
    const wasPending = document.documentElement.classList.contains("intro-pending");
    try {
      sessionStorage.setItem("bp-intro-seen", "1");
    } catch {}
    document.documentElement.classList.remove("intro-pending");
    if (!wasPending) return;
    const skip = () => document.documentElement.classList.add("intro-skip");
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, []);

  return (
    <Sheet link={links[0]} eyebrow="Title Block" threshold={0.5} className="min-h-[calc(100svh-3rem)]">
      <HeroContent key={play ? "intro" : "static"} play={play} />
    </Sheet>
  );
}

/**
 * The keyed subtree that remounts when `play` flips (post-hydration correction
 * on first visits). Owning `useMeasuredWidth` here — rather than in the parent —
 * means its ResizeObserver mount effect observes the live post-remount element,
 * not a stale detached one from before the remount.
 */
function HeroContent({ play }: { play: boolean }) {
  const { ref: nameRef, width: nameWidth } = useMeasuredWidth<HTMLDivElement>();

  const enter = (delay: number) =>
    play
      ? {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay },
        }
      : {};

  return (
    <div className="flex min-h-[70svh] flex-col justify-between gap-10">
      <div ref={nameRef} data-intro className="w-full max-w-4xl">
        <PlottedName play={play} />
        <motion.div {...enter(1.15)} data-intro className="mt-4">
          {nameWidth > 0 && <DimensionLine width={nameWidth} />}
        </motion.div>
      </div>

      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <motion.div {...enter(0.9)} data-intro className="flex flex-wrap gap-3">
          <a
            href={links[1].hash}
            className="flex min-h-11 items-center border border-ink px-4 font-mono text-anno-sm uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-sheet"
          >
            View drawings ↓
          </a>
          <a
            href={siteConfig.resume}
            className="flex min-h-11 items-center border border-redline px-4 font-mono text-anno-sm uppercase tracking-[0.14em] text-redline transition-colors hover:bg-redline hover:text-sheet"
          >
            Download full set (PDF)
          </a>
        </motion.div>

        <motion.div {...enter(1.3)} data-intro className="w-full md:w-[26rem]">
          <TitleBlock
            rows={[
              [
                { label: "Title", value: siteConfig.role },
                { label: "Drawn by", value: "R. Sharma" },
              ],
              [
                { label: "Current", value: siteConfig.current },
              ],
              [
                { label: "Rev", value: BUILD_SHA },
                { label: "Date", value: BUILD_DATE },
                { label: "Scale", value: "1:1" },
              ],
            ]}
          />
          <div className="flex justify-end">
            <Stamp className="mt-3">
              {siteConfig.status} — {siteConfig.gradDate}
            </Stamp>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
