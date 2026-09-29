"use client";

import { aboutAnnotations, links } from "@/lib/data";
import Sheet from "@/components/drafting/sheet";
import LeaderLabel from "@/components/drafting/leader-label";

export default function Sheet05Detail() {
  return (
    <Sheet link={links[4]} eyebrow="Detail View — The Engineer" threshold={0.5}>
      <div className="grid items-start gap-10 md:grid-cols-12">
        <ul className="space-y-1.5 md:col-span-4">
          {aboutAnnotations.map((a, i) => (
            <LeaderLabel key={a} index={i} label={a} />
          ))}
        </ul>

        <div data-prose className="md:col-span-8">
          <p className="max-w-[58ch] text-body-lg leading-[1.75] text-ink">
            I&apos;m Rahul — a CS senior at George Mason, previously a software engineer intern at
            Airstitch and founding engineer at TheCollegeTech, where I designed systems and then lived
            with my decisions. I care about
            interfaces that feel considered, backends that don&apos;t fall over, and the space where
            the two meet.
          </p>
          <p className="mt-5 max-w-[58ch] text-body-lg leading-[1.75] text-pencil">
            Between TA office hours and shifts keeping the engineering college&apos;s computer labs alive, I&apos;m usually deep in
            LeetCode or reading about system design, AI, distributed systems, and low-level
            programming. Off the clock: video games and philosophy — usually not at the same time.
          </p>
          <p className="mt-5 max-w-[58ch] text-body-lg leading-[1.75] text-pencil">
            I&apos;ve also built at HackPrinceton 2024, PatriotHacks and other hackathons at George Mason,
            usually with a team of friends and one weekend to get from an idea to a working demo. We
            didn&apos;t win prizes, but our demos got noticed by judges and recruiters, and judges told us
            they might use what we built themselves. Hackathons are where I learned to cut scope hard and
            ship working software fast.
          </p>
        </div>
      </div>
    </Sheet>
  );
}
