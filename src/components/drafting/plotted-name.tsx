"use client";

import { motion } from "motion/react";
import { plottedName } from "@/generated/letterforms";

/**
 * The hero name as plotted letterforms. `play=false` renders the finished
 * name (SSR/SEO/reduced-motion/repeat visits). `play=true` runs the plotter:
 * stroke traces (pathLength), then ink fill fades in.
 */
export default function PlottedName({ play }: { play: boolean }) {
  const { lines, unitsPerEm, ascent, descent } = plottedName;
  const strokeW = unitsPerEm * 0.008;
  let glyphIndex = 0;

  return (
    <h1 aria-label="Rahul Sharma" className="block">
      <span className="sr-only">Rahul Sharma</span>
      {lines.map((line, li) => {
        const height = ascent - descent;
        return (
          <svg
            key={li}
            aria-hidden
            viewBox={`0 ${-ascent} ${line.width} ${height}`}
            className="block w-full"
            style={{ maxHeight: "min(34vw, 15rem)" }}
          >
            <g transform="scale(1,-1)">
              {line.glyphs.map((glyph, gi) => {
                const i = glyphIndex++;
                return (
                  <g key={gi} transform={`translate(${glyph.x},0)`}>
                    {play && (
                      <motion.path
                        d={glyph.d}
                        fill="none"
                        stroke="rgb(var(--c-ink))"
                        strokeWidth={strokeW}
                        initial={{ pathLength: 0, opacity: 1 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.35 + i * 0.06, ease: "easeOut" }}
                      />
                    )}
                    <motion.path
                      d={glyph.d}
                      fill="rgb(var(--c-ink))"
                      initial={play ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.35 + i * 0.06 + 0.5 + 0.1 }}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        );
      })}
    </h1>
  );
}
