"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { links, siteConfig } from "@/lib/data";
import Sheet from "@/components/drafting/sheet";
import TitleBlock from "@/components/drafting/title-block";
import PlottedName from "@/components/drafting/plotted-name";
import DimensionLine from "@/components/drafting/dimension-line";
import { useMeasuredWidth } from "@/lib/hooks";

/** True exactly when this session hasn't seen the intro (html.intro-pending was set pre-paint). */
function useIntroPlay(): boolean {
  const reduce = useReducedMotion();
  const pending = useSyncExternalStore(
    () => () => {},
    () => document.documentElement.classList.contains("intro-pending"),
    () => false
  );
  return pending && !reduce;
}

const BUILD_SHA = process.env.NEXT_PUBLIC_BUILD_SHA ?? "dev";
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";

export default function Sheet01TitleBlock() {
  const play = useIntroPlay();
  const { ref: nameRef, width: nameWidth } = useMeasuredWidth<HTMLDivElement>();

  // Once mounted: mark seen, release the CSS gate, and let any input skip the show.
  useEffect(() => {
    try {
      sessionStorage.setItem("bp-intro-seen", "1");
    } catch {}
    document.documentElement.classList.remove("intro-pending");

    if (!document.documentElement.classList.contains("intro-pending")) {
      // gate already released on a previous mount — nothing to skip
    }
    const skip = () => {
      document.querySelectorAll<HTMLElement>("[data-intro]").forEach((el) => {
        el.style.opacity = "";
      });
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, []);

  const enter = (delay: number) =>
    play
      ? {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay },
        }
      : { initial: false as const, animate: { opacity: 1, y: 0 } };

  return (
    <Sheet link={links[0]} eyebrow="Title Block" threshold={0.5} className="min-h-[calc(100svh-3rem)]">
      <div className="flex min-h-[70svh] flex-col justify-between gap-10">
        <div ref={nameRef} data-intro className="w-full max-w-4xl">
          <PlottedName play={play} />
          <motion.div {...enter(1.15)} data-intro className="mt-4">
            {nameWidth > 0 && <DimensionLine width={nameWidth} />}
          </motion.div>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div {...enter(1.5)} data-intro className="flex flex-wrap gap-3">
            <a
              href={links[1].hash}
              className="flex min-h-11 items-center border border-ink px-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-sheet"
            >
              View drawings ↓
            </a>
            <a
              href={siteConfig.resume}
              className="flex min-h-11 items-center border border-redline px-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-redline transition-colors hover:bg-redline hover:text-sheet"
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
                [
                  { label: "Status", value: `${siteConfig.status} — ${siteConfig.gradDate}`, accent: true },
                ],
              ]}
            />
          </motion.div>
        </div>
      </div>
    </Sheet>
  );
}
