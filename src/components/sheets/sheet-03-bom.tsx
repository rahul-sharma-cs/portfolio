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
          <tr className="hidden border-b border-ink sm:table-row">
            <th scope="col" className="hidden py-2.5 pr-4 text-left font-mono text-anno-sm font-medium uppercase tracking-[0.16em] text-pencil sm:table-cell sm:w-24">
              Item no
            </th>
            <th scope="col" className="w-32 py-2.5 pr-4 text-left font-mono text-anno-sm font-medium uppercase tracking-[0.16em] text-pencil sm:w-44">
              Category
            </th>
            <th scope="col" className="py-2.5 text-left font-mono text-anno-sm font-medium uppercase tracking-[0.16em] text-pencil">
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
              className="block border-b border-rule py-3.5 sm:table-row sm:py-0"
            >
              <td className="hidden py-3.5 pr-4 font-mono text-anno text-redline sm:table-cell">{row.item}</td>
              <th
                scope="row"
                className="block pb-1 text-left font-mono text-anno font-semibold uppercase tracking-[0.12em] text-ink sm:table-cell sm:py-3.5 sm:pr-4"
              >
                {row.category}
              </th>
              <td className="block text-body-sm leading-relaxed text-pencil sm:table-cell sm:py-3.5">{row.spec}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  );
}
