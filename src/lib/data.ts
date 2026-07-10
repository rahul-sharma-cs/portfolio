import xpenseImg from "../../public/xpense.png";
import tripImg from "../../public/tripplanner.png";
import synchroImg from "../../public/synchro.png";

export const siteConfig = {
  name: "Rahul Sharma",
  description:
    "Rahul Sharma is an Aspiring SWE looking for internship opportunities.",
  email: "rs.rahul1@outlook.com",
  resume: "/Rahul_Resume.pdf",
  socials: {
    github: "https://github.com/rahul-sharma-cs",
    linkedin: "https://linkedin.com/in/rahulsharma-cs",
    twitter: "https://x.com/rahulsharma_sd",
    instagram: "https://instagram.com/_rahull._.7",
  },
} as const;

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;



export const projectsData = [
  {
    title: "XPenSe",
    description:
      "Developed a wallet app that recommends the best credit card to maximize rewards based on real-time location and merchant data, using NFC and Google Maps API.",
    tags: ["Next.js", "Supabase", "Auth0", "Google Maps API", "Perplexity AI"],
    imageUrl: xpenseImg,
  },
  {
    title: "TripPlanner",
    description:
      "A web app that syncs with your calendar to plan your day, suggesting nearby restaurants between events using Google Maps and Calendar APIs.",
    tags: ["React", "TypeScript", "Next.js", "Firebase", "Auth0", "Google Maps API"],
    imageUrl: tripImg,
  },
  {
    title: "SynchroCode",
    description:
      "Designed and developed a web-based code editor enabling seamless collaboration with real-time updates via WebSockets.",
    tags: ["Node.js", "WebSockets", "Quill.js", "Firebase"],
    imageUrl: synchroImg,
  },
] as const;

export const skillsData = [
  "Python",
  "Java",
  "C/C++",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Supabase",
  "Django",
  "Framer Motion",
] as const;
