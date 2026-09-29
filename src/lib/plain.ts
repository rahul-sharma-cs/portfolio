/**
 * V1 (plain page) copy. Each entry renders as one paragraph:
 *   <strong>{name}</strong>, {lead}. {body} {tail}
 * Facts trace to the résumé, the Drive README, or the user's own answers
 * (Airstitch, Vidya LMS, hackathons, scholarship amount; confirmed 2026-09).
 * The blueprint (V2) keeps its own content in data.ts.
 */
export type PlainEntry = {
  name: string;
  href?: string;
  lead: string;
  body: string;
  tail?: { label: string; href: string };
};

export const plain = {
  tagline: "Software engineer finishing a B.S. in Computer Science at George Mason.",
  intro: [
    "I graduate from George Mason University in December 2026. I'm in Fairfax, Virginia, and available for full-time roles from January 2027.",
  ],
  work: [
    {
      name: "George Mason University",
      href: "https://www.gmu.edu",
      lead: "Undergraduate Teaching Assistant, since May 2026",
      body: "Ran weekly office hours and the Piazza forum for 100+ students across two sections of CS 310 Data Structures, helping them debug Java lists, trees, hash tables and graphs. This fall I grade essays and mock-trial work for about 30 students in CS 405 Ethics and Law in Computing, and score the in-class trial.",
    },
    {
      name: "Airstitch",
      href: "https://airstitch.ai",
      lead: "Software Engineer Intern, October to December 2025",
      body: "An AI startup with two founders, since acquired. Built and tested the OAuth flow new users went through to connect their first integration, traced auth and API edge cases end to end, and wrote the in-app copy for that flow. Worked with users on Slack every day and shipped fixes the same day.",
    },
    {
      name: "TheCollegeTech",
      lead: "Founding Engineer, September to November 2025",
      body: "Built a learning management system on React, TypeScript and Django REST, with role-based access on Supabase, CI/CD and API documentation.",
    },
  ] satisfies PlainEntry[],
  projects: [
    {
      name: "Drive",
      href: "https://drive.rahulsharma-cs.site",
      lead: "July to September 2026",
      body: "File uploads that survive a bad connection. Files go straight from the browser to storage in parts, and each part is checksummed and recorded in Postgres as it lands, so a dropped connection, a closed tab or a killed server loses nothing already sent. Tested on an 11 GiB upload across 1,127 parts. I designed the protocol and architecture; the code was written with AI assistance.",
      tail: { label: "GitHub", href: "https://github.com/rahul-sharma-cs/drive" },
    },
    {
      name: "Vidya LMS",
      lead: "September to November 2025",
      body: "A Canvas-style learning platform where moderators create courses, assign instructors and manage enrollments. Role-based access runs on Supabase auth, course materials live in Azure Blob Storage over PostgreSQL, and the React/TypeScript front end tracks assignments and progress.",
    },
    {
      name: "XPen$e",
      lead: "ShellHacks 2024",
      body: "A wallet that picks the best card at checkout: it reads the merchant over NFC, looks it up with Google Maps, and asks Perplexity which card earns the most. Built in 48 hours with two teammates.",
    },
  ] satisfies PlainEntry[],
  hackathons:
    "I've also built at HackPrinceton 2024, PatriotHacks and other hackathons at George Mason, usually with a team of friends and one weekend to get from an idea to a working demo. We didn't win prizes, but our demos got noticed by judges and recruiters, and judges told us they might use what we built themselves. Hackathons are where I learned to cut scope hard and ship working software fast.",
  education: {
    name: "George Mason University",
    lead: "B.S. Computer Science, August 2022 to December 2026",
    body: "Mason Distinction Scholarship ($72K). Dean's List in Fall 2023, Spring 2026 and Summer 2026.",
  } satisfies PlainEntry,
} as const;
