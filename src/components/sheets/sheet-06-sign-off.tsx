"use client";

import { links, siteConfig } from "@/lib/data";
import Sheet from "@/components/drafting/sheet";
import Stamp from "@/components/drafting/stamp";
import { RuleX } from "@/components/drafting/rule";

const socialRefs = [
  { label: "GITHUB", handle: "RAHUL-SHARMA-CS", href: siteConfig.socials.github },
  { label: "LINKEDIN", handle: "RAHULSHARMA-CS", href: siteConfig.socials.linkedin },
  { label: "X", handle: "RAHULSHARMA_SD", href: siteConfig.socials.twitter },
  { label: "INSTAGRAM", handle: "_RAHULL._.7", href: siteConfig.socials.instagram },
] as const;

export default function Sheet06SignOff() {
  return (
    <Sheet link={links[5]} eyebrow="Sign-Off — Release" threshold={0.6}>
      <div className="flex flex-col items-start gap-10">
        <div className="flex flex-wrap items-center gap-6">
          <h3 className="wdth-expanded max-w-[24ch] font-sans text-head-lg font-extrabold uppercase leading-tight tracking-tight">
            This design is released for interview.
          </h3>
          <Stamp>Approved</Stamp>
        </div>

        <a
          href={`mailto:${siteConfig.email}`}
          className="stretch-wdth break-all font-sans text-mail font-bold lowercase leading-none text-ink underline decoration-redline decoration-2 underline-offset-8 hover:text-redline"
        >
          {siteConfig.email}
        </a>

        <RuleX className="w-full" />

        <div className="grid w-full gap-8 sm:grid-cols-2">
          <ul className="space-y-2.5">
            {socialRefs.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-11 items-center gap-3 font-mono text-anno uppercase tracking-[0.14em] text-pencil hover:text-redline"
                >
                  <span aria-hidden className="h-2 w-px bg-rule group-hover:bg-redline" />
                  REF: {s.label} — {s.handle} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start justify-end gap-4 sm:items-end">
            <a
              href={siteConfig.resume}
              className="flex min-h-11 items-center border border-redline px-4 font-mono text-anno-sm uppercase tracking-[0.14em] text-redline transition-colors hover:bg-redline hover:text-sheet"
            >
              Download full drawing set (PDF)
            </a>
            <p className="font-mono text-anno-sm uppercase tracking-[0.14em] text-pencil">
              Set in Archivo &amp; Martian Mono. Drafted with Next.js 16 + Motion.
            </p>
            <p className="font-mono text-anno-sm uppercase tracking-[0.14em] text-pencil">
              End of set — 06/06 · REV {process.env.NEXT_PUBLIC_BUILD_SHA ?? "dev"}
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
