import type { StaticImageData } from "next/image";
import xpenseImg from "../../public/xpense.png";
import tripplannerImg from "../../public/tripplanner.png";
import synchroImg from "../../public/synchro.png";

/**
 * ─────────────────────────────────────────────────────────────────
 * THE content file. Everything person-specific lives here.
 *  - Add a project:   append one object to `projects` (image optional).
 *  - Add a repo link: set `links.github` / `links.live` on the project —
 *    the "REV PENDING" stamp is replaced by real links automatically.
 *  - New résumé:      replace /public/Rahul_Resume.pdf (same filename).
 * ─────────────────────────────────────────────────────────────────
 */

/** Nav sections. `num` is the drawing-sheet number shown in the chrome. */
export const links = [
  { name: "Home", hash: "#home", num: "01" },
  { name: "Work", hash: "#work", num: "02" },
  { name: "Spec", hash: "#spec", num: "03" },
  { name: "Rev", hash: "#rev", num: "04" },
  { name: "Detail", hash: "#detail", num: "05" },
  { name: "Sign-Off", hash: "#sign-off", num: "06" },
] as const;

export const siteConfig = {
  name: "Rahul Sharma",
  role: "Software Engineer",
  /** Title-block STATUS field + ticker copy. */
  status: "SEEKING FULL-TIME",
  gradDate: "DEC 2026",
  current: "FOUNDING ENGINEER — THECOLLEGETECH",
  location: "Fairfax, VA",
  email: "rs.rahul1@outlook.com",
  resume: "/Rahul_Resume.pdf",
  description:
    "Software engineer and CS senior at George Mason University (Dec 2026). Founding engineer at TheCollegeTech. Portfolio drafted as an engineering drawing set.",
  socials: {
    github: "https://github.com/rahul-sharma-cs",
    linkedin: "https://linkedin.com/in/rahulsharma-cs",
    twitter: "https://x.com/rahulsharma_sd",
    instagram: "https://instagram.com/_rahull._.7",
  },
} as const;

export type Project = {
  id: string;
  title: string;
  /** Display date, e.g. "SEP 2024" — omit if unverified. */
  date?: string;
  /** ~60 words, verified facts only. */
  spec: string;
  tags: readonly string[];
  /** Top-first layers driving the exploded axonometric view. */
  architecture: readonly { layer: string; label: string }[];
  /** Optional — image-less plates give the exploded view full width. */
  image?: { src: StaticImageData; alt: string };
  /** Optional — when absent the plate shows the REV PENDING stamp. */
  links?: { github?: string; live?: string };
};

export const projects: readonly Project[] = [
  {
    id: "vidya-lms",
    title: "Vidya LMS",
    date: "JUL 2025",
    spec: "A canvas-style learning management system where moderators create courses, assign instructors, and manage enrollments. Role-based access spans users, instructors, moderators, and admins via Supabase auth; course materials — PDFs, videos, quizzes — live in Azure Blob Storage over a relational PostgreSQL schema. The React/TypeScript frontend serves dynamic dashboards, assignment tracking, and calendar-based progress views.",
    tags: ["React", "TypeScript", "Supabase", "Azure Blob Storage", "PostgreSQL"],
    architecture: [
      { layer: "UI", label: "React/TS dashboards" },
      { layer: "Auth", label: "Supabase RBAC" },
      { layer: "Data", label: "PostgreSQL schema" },
      { layer: "Storage", label: "Azure Blob" },
    ],
  },
  {
    id: "xpense",
    title: "XPen$e",
    date: "SEP 2024",
    spec: "A wallet app that answers one question at the register: which card? Merchant data is read over NFC/EMV, located via the Google Maps API, and fed to a Perplexity AI model that recommends the card maximizing rewards for that purchase. Auth0 handles authentication; Supabase stores card metadata; the frontend is Next.js.",
    tags: ["Next.js", "Supabase", "Auth0", "NFC", "Google Maps API", "Perplexity AI"],
    architecture: [
      { layer: "Capture", label: "NFC/EMV merchant read" },
      { layer: "Context", label: "Google Maps lookup" },
      { layer: "Model", label: "Perplexity recommendation" },
      { layer: "Account", label: "Auth0 + Supabase" },
    ],
    image: { src: xpenseImg, alt: "XPen$e wallet app — personal credit cards screen" },
  },
  {
    id: "tripplanner",
    title: "TripPlanner",
    spec: "A day-planning web app that syncs with your calendar and fills the gaps: given the events you already have, it suggests nearby restaurants between them using the Google Maps and Calendar APIs. Built with React, TypeScript, and Next.js on Firebase, with Auth0 authentication.",
    tags: ["React", "TypeScript", "Next.js", "Firebase", "Auth0", "Google Maps API"],
    architecture: [
      { layer: "UI", label: "React / Next.js" },
      { layer: "Sync", label: "Google Calendar API" },
      { layer: "Places", label: "Google Maps API" },
      { layer: "Data", label: "Firebase" },
    ],
    image: { src: tripplannerImg, alt: "TripPlanner — date search with calendar view" },
  },
  {
    id: "synchrocode",
    title: "SynchroCode",
    spec: "A web-based code editor built for seamless collaboration: edits propagate to every participant in real time over WebSockets. A Node.js backend fans out changes, Quill.js drives the editing surface, and Firebase handles persistence.",
    tags: ["Node.js", "WebSockets", "Quill.js", "Firebase"],
    architecture: [
      { layer: "Editor", label: "Quill.js surface" },
      { layer: "Transport", label: "WebSockets" },
      { layer: "Server", label: "Node.js fan-out" },
      { layer: "Store", label: "Firebase" },
    ],
    image: { src: synchroImg, alt: "SynchroCode — collaborative editor with live chat" },
  },
];

/** SHT 03 — Bill of Materials. */
export const skills = [
  { item: "001", category: "Languages", spec: "Python · Java · C · C++ · Kotlin · JavaScript · TypeScript · SQL · HTML/CSS · Bash/PowerShell" },
  { item: "002", category: "Frameworks", spec: "React · Next.js · Node.js · Django REST · Tailwind" },
  { item: "003", category: "Data", spec: "PostgreSQL · MySQL · MongoDB · Supabase · Firebase · Azure Blob Storage" },
  { item: "004", category: "Tooling", spec: "Git · Linux · CI/CD · JUnit · NumPy · Android Studio" },
] as const;

/** SHT 04 — revision history, newest first. `approved` = the org mark. */
export const revisions = [
  {
    rev: "C",
    date: "MAY 2025 — PRESENT",
    role: "Founding Engineer",
    org: "TheCollegeTech",
    approved: "TCT",
    bullets: [
      "Architected a Learning Management System end-to-end: Supabase auth, account management, and role-based access control.",
      "Course creation, enrollment, and content-management workflows on a TypeScript/React + Django REST stack with paginated, filtered SQL queries.",
      "Authored API documentation, implemented CI/CD with automated testing, conducted code reviews.",
    ],
  },
  {
    rev: "B",
    date: "JUN 2023 — PRESENT",
    role: "IT Technician, College of Engineering",
    org: "George Mason University",
    approved: "GMU CEC",
    bullets: [
      "Automation scripts (Python, Bash, PowerShell) for Windows/macOS/Linux, automating deployment across 450+ lab computers.",
      "Custom Linux server configurations and documentation that cut recurring support tickets by 30%; 99% uptime across 15–20 labs.",
      "Internal ticketing tools improving average resolution time by 40% for 200+ faculty and staff.",
    ],
  },
  {
    rev: "A",
    date: "AUG 2022",
    role: "B.S. Computer Science — enrolled",
    org: "George Mason University",
    approved: "GMU",
    bullets: ["Initial release. See education detail block."],
  },
] as const;

export const education = {
  school: "George Mason University",
  degree: "B.S. Computer Science",
  gpa: 3.73,
  honors: "Dean's List F23 · S26",
  scholarship: "Mason Distinction Scholarship",
  expected: "DEC 2026",
} as const;

/** SHT 05 — leader-line annotations beside the portrait. */
export const aboutAnnotations = [
  "LEETCODE: REGULAR PRACTICE",
  "INTERESTS: SYSTEM DESIGN · AI · DISTRIBUTED · LOW-LEVEL",
  "OFF-HOURS: VIDEO GAMES · PHILOSOPHY",
] as const;
