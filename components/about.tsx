"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { HiDownload } from "react-icons/hi";
import { useTheme } from "@/context/theme-context";

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
  const { theme } = useTheme();

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
        className={`flex flex-col sm:flex-row bg-white/40 dark:bg-white/10 rounded-lg shadow-lg mt-6 p-6 backdrop-blur-sm`}
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
          Hi, I'm <span className="font-medium">Rahul Sharma</span>, a sophomore pursuing a BS in 
          <span className="font-medium"> Computer Science</span> at George Mason University. With a strong academic record 
          (GPA: 3.64) and recognition on the Dean’s List, I am passionate about crafting captivating user interfaces, building 
          robust systems, and integrating APIs. I enjoy <span className="font-medium">LeetCode challenges</span> to sharpen my problem-solving skills 
          and deepen my understanding of <span className="italic">data structures and algorithms</span>.
        </p>
        
        <p>
          I have a keen interest in <span className="font-medium">system design, artificial intelligence, distributed systems, and low-level programming</span>. 
          I love exploring new technologies, languages, and frameworks, staying updated with the latest trends in tech. 
          <span className="italic">When I'm not coding</span>, I enjoy playing video games and learning about 
          <span className="font-medium"> philosophy</span>, blending creativity with analytical thinking to solve complex problems.
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
