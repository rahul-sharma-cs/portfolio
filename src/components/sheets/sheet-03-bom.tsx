"use client";

import { motion, useReducedMotion } from "motion/react";
import { links, skills } from "@/lib/data";
import Sheet from "@/components/drafting/sheet";

/** Skills as a Bill of Materials. Real table semantics; ITEM column hides on mobile. */
export default function Sheet03Bom() {
  const reduce = useReducedMotion();
  return (
    <Sheet link={links[2]} eyebrow="Specification — Bill of Materials" threshold={0.5}>
      <table className="w-full border-collapse">
        <caption className="sr-only">Technical skills grouped by category</caption>
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" className="hidden py-2.5 pr-4 text-left font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-pencil sm:table-cell sm:w-24">
              Item no
            </th>
            <th scope="col" className="w-32 py-2.5 pr-4 text-left font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-pencil sm:w-44">
              Category
            </th>
            <th scope="col" className="py-2.5 text-left font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-pencil">
              Specification
            </th>
          </tr>
        </thead>
        <tbody>
          {skills.map((row, i) => (
            <motion.tr
              key={row.item}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.25, delay: i * 0.06, ease: "easeOut" }}
              className="border-b border-rule transition-colors hover:bg-redline/5"
            >
              <td className="hidden py-3.5 pr-4 font-mono text-[0.7rem] text-redline sm:table-cell">{row.item}</td>
              <th scope="row" className="py-3.5 pr-4 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink">
                {row.category}
              </th>
              <td className="py-3.5 text-[0.85rem] leading-relaxed text-pencil">{row.spec}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  );
}
