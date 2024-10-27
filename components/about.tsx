"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { HiDownload } from "react-icons/hi";

// Define animation variants for a pop-in effect
const containerVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: 0.2,
    },
  },
};

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[60rem] sm:mb-40 scroll-mt-28"
      initial="initial"
      animate="animate"
      variants={containerVariants} // Apply the animation variants
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>

      {/* Box with Image and Description */}
      <motion.div
        className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-6 p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Part: Image */}
        <div className="sm:w-1/2 flex justify-center items-center mb-6 sm:mb-0 relative">
          <img
            src="/portrait.jpg"
            alt="Rahul's portrait"
            className="rounded-2xl w-[390px] h-[420px] object-cover object-left shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        {/* Right Part: Description */}
        <div className="sm:w-1/2 text-left leading-8">
          <p className="mb-3">
            After graduating with a degree in{" "}
            <span className="font-medium">Accounting</span>, I decided to pursue
            my passion for programming. I enrolled in a coding bootcamp and
            learned{" "}
            <span className="font-medium">full-stack web development</span>.{" "}
            <span className="italic">My favorite part of programming</span> is
            the problem-solving aspect. I{" "}
            <span className="underline">love</span> the feeling of finally
            figuring out a solution to a problem. My core stack is{" "}
            <span className="font-medium">
              React, Next.js, Node.js, and MongoDB
            </span>
            . I am also familiar with TypeScript and Prisma. I am always looking
            to learn new technologies. I am currently looking for a{" "}
            <span className="font-medium">full-time position</span> as a
            software developer.
          </p>

          <p>
            <span className="italic">When I'm not coding</span>, I enjoy playing
            video games, watching movies, and playing with my dog. I also enjoy{" "}
            <span className="font-medium">learning new things</span>. I am
            currently learning about{" "}
            <span className="font-medium">history and philosophy</span>. I'm
            also learning how to play the guitar.
          </p>
          <a className="group bg-white px-7 py-3 inline-flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-gray-300 dark:bg-white/10"
            href="/Rahul_Resume.pdf"
            download >
            Download My Resume{" "}
            <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
          </a>
        </div>
        
      </motion.div>
    </motion.section>
  );
}
