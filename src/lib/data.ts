import type { StaticImageData } from "next/image";
import driveImg from "../../public/drive.png";
import xpenseImg from "../../public/xpense.png";

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
  current: "TEACHING ASSISTANT — GMU CS",
  location: "Fairfax, VA",
  email: "rs.rahul1@outlook.com",
  resume: "/Rahul_Resume.pdf",
  description:
    "Software engineer and CS senior at George Mason University (Dec 2026). Most recently a software engineer intern at Rise Consultancy Edu; previously founding engineer at TheCollegeTech. Portfolio drafted as an engineering drawing set.",
  socials: {
    github: "https://github.com/rahul-sharma-cs",
    linkedin: "https://linkedin.com/in/rahulsharma-cs",
    twitter: "https://x.com/rahulsharma_sd",
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
    id: "drive",
    title: "Drive",
    date: "JUL — SEP 2026",
    spec: "A self-hosted file store built around one hard problem: uploading a very large file over a connection that will not stay up. One Go binary serves the API and the React/TypeScript app; bytes travel browser-to-storage over presigned S3 multipart URLs, every confirmed part is durable state in Postgres, and interrupted uploads resume from the last confirmed part. Per-part MD5/ETag checks and ledger reconciliation carried an 11 GiB upload across 1,127 parts; a 220 MiB production round trip verified by SHA-256. Files share over revocable links with optional password, expiry, and download caps; Playwright drives the browser proof.",
    tags: ["Go", "React", "TypeScript", "PostgreSQL", "S3 Multipart", "Docker", "Playwright"],
    architecture: [
      { layer: "UI", label: "React file manager" },
      { layer: "Transfer", label: "Presigned multipart PUTs" },
      { layer: "Server", label: "Go API + part ledger" },
      { layer: "Store", label: "S3 object storage · Postgres" },
    ],
    image: { src: driveImg, alt: "Drive — file browser with a multipart upload in flight, per-part progress segments" },
    links: { github: "https://github.com/rahul-sharma-cs/drive", live: "https://drive.rahulsharma-cs.site" },
  },
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
    date: "DEC 2024",
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
];

/** SHT 03 — Bill of Materials. */
export const skills = [
  { item: "001", category: "Languages", spec: "Python · Go · TypeScript · JavaScript · Java · C++ · SQL · Bash · PowerShell" },
  { item: "002", category: "Frontend", spec: "React · Next.js · Tailwind CSS" },
  { item: "003", category: "Backend", spec: "REST APIs · FastAPI · Django REST Framework · Node.js" },
  { item: "004", category: "Data & Infra", spec: "PostgreSQL · Redis · S3-compatible storage (AWS S3, Cloudflare R2) · Docker · Linux · Git · CI/CD" },
  { item: "005", category: "Testing", spec: "Playwright · Vitest" },
] as const;

export type Revision = {
  rev: string;
  date: string;
  role: string;
  org: string;
  /** The org mark in the APPROVED column. */
  approved: string;
  bullets: readonly string[];
  /** Optional in-page cross-reference rendered as a link after the bullets ("see detail" callout). */
  ref?: { label: string; hash: string };
};

/** SHT 04 — revision history, newest first. */
export const revisions: readonly Revision[] = [
  {
    rev: "E",
    date: "MAY — JUL 2026",
    role: "Software Engineer Intern",
    org: "Rise Consultancy Edu, Remote",
    approved: "RISE EDU",
    bullets: [
      "Built a React/TypeScript expenditure chart for a client dashboard in a production full-stack app with payment integrations.",
      "Traced misleading spending trends to sparse API data: normalized records to monthly intervals and zero-filled the gaps before rendering.",
      "Evaluated charting libraries against the design system; shipped through Jira tickets and senior engineers' PR reviews to production.",
    ],
  },
  {
    rev: "D",
    date: "MAY 2026 — PRESENT",
    role: "Undergraduate Teaching Assistant",
    org: "George Mason University",
    approved: "GMU CS",
    bullets: [
      "CS 310 Data Structures (Summer 2026) and CS 405 Ethics and Law in Computing (Fall 2026): office hours, Piazza, and grading for 100+ students — from debugging Java trees and hash tables to scoring the mock trial.",
    ],
  },
  {
    rev: "C",
    date: "JUN — AUG 2025",
    role: "Founding Engineer",
    org: "TheCollegeTech",
    approved: "TCT",
    bullets: [
      "Built a Learning Management System with a TypeScript/React frontend and Django REST backend: authentication, account management, and role-based access control on Supabase.",
      "Designed the course creation, enrollment, and content workflows, with paginated and filtered SQL queries.",
      "Set up CI/CD with automated tests, wrote the API documentation, and ran code reviews.",
    ],
  },
  {
    rev: "B",
    date: "JUN 2023 — PRESENT",
    role: "IT Technician, College of Engineering",
    org: "George Mason University",
    approved: "GMU CEC",
    bullets: [
      "Keep 10–15 computer labs (~30 machines each) at ~95% uptime; Python, Bash, and PowerShell scripts automate imaging and configuration across Windows, macOS, and Linux.",
      "Support faculty, staff, and graduate assistants; documented fixes cut repeat tickets.",
    ],
  },
  {
    rev: "A",
    date: "AUG 2022",
    role: "B.S. Computer Science — enrolled",
    org: "George Mason University",
    approved: "GMU",
    bullets: [],
    ref: { label: "Initial release — see education detail", hash: "#education" },
  },
];

export const education = {
  school: "George Mason University",
  degree: "B.S. Computer Science",
  gpa: 3.75,
  honors: { title: "Dean's List", terms: "Fall 2023 · Spring 2026 · Summer 2026" },
  scholarship: "Mason Distinction Scholarship",
  coursework: "Data Structures & Algorithms · Database Systems · Machine Learning · Software Engineering · Operating Systems",
  expected: "DEC 2026",
} as const;

/** SHT 05 — leader-line annotations beside the portrait. */
export const aboutAnnotations = [
  "LEETCODE: REGULAR PRACTICE",
  "INTERESTS: SYSTEM DESIGN · AI · DISTRIBUTED · LOW-LEVEL",
  "OFF-HOURS: VIDEO GAMES · PHILOSOPHY",
] as const;
