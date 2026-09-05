"use client";

import Image from "next/image";
import { aboutAnnotations, links } from "@/lib/data";
import portrait from "../../../public/portrait.jpg";
import Sheet from "@/components/drafting/sheet";
import CropMarks from "@/components/drafting/crop-marks";
import LeaderLabel from "@/components/drafting/leader-label";

export default function Sheet05Detail() {
  return (
    <Sheet link={links[4]} eyebrow="Detail View — The Engineer" threshold={0.5}>
      <div className="grid items-start gap-10 md:grid-cols-12">
        <figure className="relative md:col-span-5">
          <div className="relative border border-rule p-2">
            <CropMarks />
            <Image
              src={portrait}
              alt="Portrait of Rahul Sharma"
              quality={95}
              className="duotone-dark-only w-full"
              sizes="(max-width: 768px) 100vw, 40vw"
              placeholder="blur"
            />
          </div>
          <figcaption className="mt-3">
            <ul className="space-y-1.5">
              {aboutAnnotations.map((a, i) => (
                <LeaderLabel key={a} index={i} label={a} />
              ))}
            </ul>
          </figcaption>
        </figure>

        <div data-prose className="md:col-span-7">
          <p className="max-w-[58ch] text-body-lg leading-[1.75] text-ink">
            I&apos;m Rahul — a CS senior at George Mason, most recently a software engineer intern at
            Rise Consultancy Edu, and previously founding engineer at TheCollegeTech, where I designed
            systems and then lived with my decisions. I care about
            interfaces that feel considered, backends that don&apos;t fall over, and the space where
            the two meet.
          </p>
          <p className="mt-5 max-w-[58ch] text-body-lg leading-[1.75] text-pencil">
            Between TA office hours and shifts keeping the engineering college&apos;s computer labs alive, I&apos;m usually deep in
            LeetCode or reading about system design, AI, distributed systems, and low-level
            programming. Off the clock: video games and philosophy — usually not at the same time.
          </p>
        </div>
      </div>
    </Sheet>
  );
}
