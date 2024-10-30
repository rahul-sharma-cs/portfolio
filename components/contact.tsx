"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >

      {/* Large Email Link */}
      <div className="mt-20 text-left">
        {/* "Get in Touch" */}
        <h1 className="text-5xl sm:text-8xl font-extrabold leading-tight whitespace-nowrap">
          Get in touch
        </h1>

        {/* Email Address */}
        <a
          href="mailto:rs.rahul1@outlook.com"
          className="block mt-4 text-3xl sm:text-5xl text-blue-600 dark:text-blue-400 duration-300"
          style={{transition: 'color 0.3s ease-in-out',}}
        >
          rs.rahul1@outlook.com
        </a>
      </div>

      {/* Social Links Section */}
      <h2 className="text-2xl font-semibold mt-20 mb-4 text-gray-700 dark:text-gray-300">
        Social
      </h2>

      <div className="flex justify-center space-x-8">
        {/* GitHub */}
        <a
          href="https://github.com/rahul-sharma-cs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-transform duration-200 ease-in-out hover:scale-105"
          aria-label="GitHub"
        >
          GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/rahulsharma-cs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-transform duration-200 ease-in-out hover:scale-105"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>

        {/* Twitter */}
        <a
          href="https://x.com/rahulsharma_sd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-transform duration-200 ease-in-out hover:scale-105"
          aria-label="Twitter"
        >
          Twitter
        </a>
        
        {/* Instagram */}
        <a
          href="https://instagram.com/_rahull._.7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-transform duration-200 ease-in-out hover:scale-105"
          aria-label="Instagram"
        >
          Instagram
        </a>
      </div>
    </motion.section>
  );
}
