"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { Dock, DockIcon } from "@/components/ui/dock";
import { siteConfig } from "@/lib/data";


export default function Intro() {
  const { ref, id } = useSectionInView("Home", 0.5);

  return (
    <section
      ref={ref}
      id={id}
      className="mb-28 max-w-[50rem] sm:mb-0 scroll-mt-[100rem] px-4"
    >
      <motion.div
        className="text-left mt-16"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl text-gray-500 mb-2">Hello, my name is</h2>
        <h1 className="text-6xl font-bold mb-6 ">{siteConfig.name}</h1>
        <p className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
          I’m an <span className="font-bold">aspiring Software Engineer</span> with a passion for <span className="italic">solving problems</span> and building <span className="italic">impactful projects</span>. As a <span className="font-bold">CS major</span> and <span className="underline">active hackathon participant</span>, I thrive on creating <span className="italic">innovative solutions</span> through development and <span className="font-bold">continuous learning</span>.
        </p>

      </motion.div>

      <Dock magnification={80} distance={100} direction="bottom">
        <DockIcon>
          <Link href={siteConfig.socials.github} target="_blank" aria-label="GitHub">
            <FaGithubSquare className="text-4xl text-gray-700 dark:text-white" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href={siteConfig.socials.linkedin} target="_blank" aria-label="LinkedIn">
            <BsLinkedin className="text-4xl text-blue-600 dark:text-blue-400" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href={`mailto:${siteConfig.email}`} target="_blank" aria-label="Email Rahul">
            <HiMail className="text-4xl text-red-600 dark:text-red-400" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href="#contact" aria-label="Contact Me">
            <BsArrowRight className="text-4xl text-gray-900 dark:text-white" />
          </Link>
        </DockIcon>
      </Dock>
    </section>
  );
}
