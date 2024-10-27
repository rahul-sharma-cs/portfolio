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
          href="mailto:rsharm21@gmu.edu"
          className="block mt-4 text-4xl sm:text-5xl text-blue-600 dark:text-blue-400 duration-300"
          style={{
    transition: 'color 0.3s ease-in-out',}}
        >
          rsharm21@gmu.edu
        </a>
      </div>

      {/* Social Links Section */}
      <h2 className="text-2xl font-semibold mt-12 mb-4 text-gray-700 dark:text-gray-300">
        Social
      </h2>

      <div className="flex justify-center space-x-8">
        {/* GitHub */}
        <a
          href="https://github.com/rahulsharma-cs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          aria-label="GitHub"
        >
          GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/rahulsharma-cs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>

        {/* Twitter */}
        <a
          href="https://twitter.com/rahulsharma"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          aria-label="Twitter"
        >
          Twitter
        </a>
      </div>
    </motion.section>
  );
}
