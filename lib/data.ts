import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import xpenseImg from "@/public/xpense.png";
import rmtdevImg from "@/public/rmtdev.png";
import synchroImg from "@/public/synchro.png";

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
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
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
