"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { links, siteConfig } from "@/lib/data";
import type { Link } from "@/lib/types";
import { useActiveSectionContext } from "@/context/active-section-context";
import ThemeToggle from "@/components/chrome/theme-toggle";

/**
 * The measurement-rule nav: a hairline with numbered tick marks; the active
 * section is bracketed by a sliding redline "caliper" (layoutId). The résumé
 * control is always visible. Mobile: current sheet number + expandable index.
 */
export default function MeasurementNav() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [open, setOpen] = useState(false);
  const active = links.find((l) => l.name === activeSection) ?? links[0];

  const go = (link: Link) => () => {
    setActiveSection(link.name);
    setTimeOfLastClick(Date.now());
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-sheet/85 backdrop-blur-sm">
      <nav aria-label="Sheets" className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Desktop ticks */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.hash} className="relative">
              <a
                href={link.hash}
                onClick={go(link)}
                className={`relative flex items-center gap-2 py-3.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors ${
                  activeSection === link.name ? "text-ink" : "text-pencil hover:text-ink"
                }`}
              >
                <span aria-hidden className="h-2 w-px bg-rule" />
                {link.num} {link.name.toUpperCase()}
              </a>
              {activeSection === link.name && (
                <motion.span
                  layoutId="caliper"
                  aria-hidden
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-y-2.5 -inset-x-2 border-x-2 border-redline"
                />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile: current sheet + index toggle */}
        <button
          type="button"
          className="flex min-h-11 items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink md:hidden"
          aria-expanded={open}
          aria-controls="sheet-index"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="h-2 w-px bg-redline" />
          SHT {active.num}/06 — {active.name.toUpperCase()}
          <span aria-hidden className="text-pencil">{open ? "▴" : "▾"}</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="flex min-h-11 items-center border border-redline px-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-redline transition-colors hover:bg-redline hover:text-sheet"
          >
            <span aria-hidden className="sm:hidden">@</span>
            <span aria-hidden className="hidden sm:inline">Email</span>
          </a>
          <a
            href={siteConfig.resume}
            className="flex min-h-11 items-center border border-redline px-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-redline transition-colors hover:bg-redline hover:text-sheet"
          >
            <span className="hidden sm:inline">Full set (</span>PDF<span className="hidden sm:inline">)</span>
          </a>
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile sheet index */}
      {open && (
        <ul id="sheet-index" className="border-t border-rule px-5 pb-3 pt-1 md:hidden">
          {links.map((link) => (
            <li key={link.hash}>
              <a
                href={link.hash}
                onClick={go(link)}
                className={`flex min-h-11 items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] ${
                  activeSection === link.name ? "text-redline" : "text-pencil"
                }`}
              >
                <span aria-hidden className="h-2 w-px bg-rule" />
                {link.num} {link.name.toUpperCase()}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex min-h-11 items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-redline"
            >
              <span aria-hidden className="h-2 w-px bg-redline" />
              EMAIL
            </a>
          </li>
          <li>
            <a
              href={siteConfig.resume}
              className="flex min-h-11 items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-redline"
            >
              <span aria-hidden className="h-2 w-px bg-redline" />
              FULL SET (PDF)
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
