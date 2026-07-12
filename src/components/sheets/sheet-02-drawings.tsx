"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { links, projects, type Project } from "@/lib/data";
import Sheet from "@/components/drafting/sheet";
import Stamp from "@/components/drafting/stamp";
import { RuleX } from "@/components/drafting/rule";
import DimensionLine from "@/components/drafting/dimension-line";
import LeaderLabel from "@/components/drafting/leader-label";
import Tilt from "@/components/drafting/tilt";
import ExplodedView from "@/components/drafting/exploded-view";
import CropMarks from "@/components/drafting/crop-marks";
import { useMeasuredWidth } from "@/lib/hooks";

function PlateImage({ image }: { image: NonNullable<Project["image"]> }) {
  const { ref, width } = useMeasuredWidth<HTMLDivElement>();
  return (
    <figure>
      <div ref={ref} className="relative border border-rule p-2">
        <CropMarks />
        <Image
          src={image.src}
          alt={image.alt}
          quality={95}
          className="duotone w-full"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <figcaption className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-pencil">
          Printed reproduction — not to scale
        </figcaption>
      </div>
      {width > 0 && <DimensionLine width={width} className="mt-2" />}
    </figure>
  );
}

function Plate({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const flipped = index % 2 === 1;
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <header className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-redline">
          Fig. {String(index + 1).padStart(2, "0")}
        </p>
        {project.date && (
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-pencil">{project.date}</p>
        )}
      </header>
      <h3 className="wdth-expanded mt-1 font-sans text-[clamp(1.9rem,4.5vw,3.4rem)] font-extrabold uppercase leading-none tracking-tight">
        {project.title}
      </h3>
      <RuleX className="mb-8 mt-4" />

      <div className="grid items-start gap-8 md:grid-cols-12">
        <Tilt className={`md:col-span-6 ${flipped ? "md:order-2" : ""}`}>
          <ExplodedView layers={project.architecture} title={project.title} />
        </Tilt>

        <div className={`space-y-6 md:col-span-6 ${flipped ? "md:order-1" : ""}`}>
          {project.image && <PlateImage image={project.image} />}
          <p data-prose className="max-w-[58ch] text-[0.95rem] leading-relaxed text-pencil">
            {project.spec}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {project.tags.map((tag) => (
              <LeaderLabel key={tag} label={tag} />
            ))}
          </ul>
          <div className="pt-1">
            {project.links?.github || project.links?.live ? (
              <ul className="space-y-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
                {project.links.github && (
                  <li>
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="text-redline underline underline-offset-4 hover:no-underline">
                      REF: GITHUB — {project.title} ↗
                    </a>
                  </li>
                )}
                {project.links.live && (
                  <li>
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="text-redline underline underline-offset-4 hover:no-underline">
                      REF: LIVE — {project.title} ↗
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <Stamp variant="quiet">Rev pending — demo on request</Stamp>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Sheet02Drawings() {
  return (
    <Sheet link={links[1]} eyebrow="Drawings — Selected Work" threshold={0.15}>
      <div className="space-y-24 sm:space-y-32">
        {projects.map((project, i) => (
          <Plate key={project.id} project={project} index={i} />
        ))}
      </div>
    </Sheet>
  );
}
