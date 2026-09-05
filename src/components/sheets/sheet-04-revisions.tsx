"use client";

import { motion, useReducedMotion } from "motion/react";
import { education, links, revisions } from "@/lib/data";
import Sheet from "@/components/drafting/sheet";
import Stamp from "@/components/drafting/stamp";
import Counter from "@/components/drafting/counter";
import { RuleX } from "@/components/drafting/rule";

/** Experience + education as a drawing revision-history table. */
export default function Sheet04Revisions() {
  const reduce = useReducedMotion();
  return (
    <Sheet link={links[3]} eyebrow="Revision History — Experience" threshold={0.35}>
      <div className="grid gap-12 lg:grid-cols-12">
        <ol className="relative space-y-10 border-rule lg:col-span-8 lg:border-l lg:pl-8">
          {revisions.map((rev, i) => (
            <motion.li
              key={rev.rev}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
              className="relative"
            >
              <span aria-hidden className="absolute -left-[2.35rem] top-2 hidden h-px w-4 bg-redline lg:block" />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-anno font-bold uppercase tracking-[0.14em] text-redline">
                  REV {rev.rev}
                </span>
                <span className="font-mono text-anno-sm uppercase tracking-[0.14em] text-pencil">{rev.date}</span>
                <span className="ml-auto hidden font-mono text-anno-sm uppercase tracking-[0.14em] text-pencil sm:inline">
                  APPROVED: {rev.approved}
                </span>
              </div>
              <h3 className="mt-1.5 font-sans text-head-sm font-bold uppercase tracking-tight text-ink">
                {rev.role} <span className="font-normal text-pencil">— {rev.org}</span>
              </h3>
              <ul data-prose className="mt-2 max-w-[62ch] space-y-1.5 text-body-sm leading-relaxed">
                {rev.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-rule" />
                    <span className="text-ink">{b}</span>
                  </li>
                ))}
                {rev.ref && (
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-rule" />
                    <a href={rev.ref.hash} className="text-redline underline underline-offset-4 hover:no-underline">
                      {rev.ref.label} →
                    </a>
                  </li>
                )}
              </ul>
            </motion.li>
          ))}
        </ol>

        <aside id="education" className="scroll-mt-20 lg:col-span-4">
          <div className="relative border border-ink p-6">
            <p className="font-mono text-anno-sm uppercase tracking-[0.16em] text-pencil">Detail — Education</p>
            <RuleX className="mb-5 mt-2" />
            <p className="font-sans text-head-sm font-bold uppercase tracking-tight text-ink">{education.degree}</p>
            <p className="mt-1 text-body-sm text-pencil">{education.school}</p>
            <p className="mt-5 font-mono text-anno-sm uppercase tracking-[0.14em] text-pencil">GPA</p>
            <p className="font-sans text-4xl font-extrabold text-ink">
              <Counter value={education.gpa} decimals={2} />
            </p>
            <div className="mt-5">
              <Stamp>{education.honors.title}</Stamp>
              <p className="mt-2 font-mono text-anno-sm uppercase tracking-[0.14em] text-pencil">
                {education.honors.terms.split(" · ").map((term, i) => (
                  <span key={term}>
                    {i > 0 && " · "}
                    <span className="whitespace-nowrap">{term}</span>
                  </span>
                ))}
              </p>
            </div>
            <p className="mt-5 text-body-sm text-pencil">{education.scholarship}</p>
            <p className="mt-4 font-mono text-anno-sm uppercase tracking-[0.14em] text-pencil">Coursework</p>
            <p className="mt-1 text-body-sm leading-relaxed text-pencil">{education.coursework}</p>
            <p className="mt-4 font-mono text-anno-sm uppercase tracking-[0.14em] text-redline">
              EXPECTED COMPLETION: {education.expected}
            </p>
          </div>
        </aside>
      </div>
    </Sheet>
  );
}
