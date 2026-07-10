"use client";

import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { motion } from "motion/react";
import { useSectionInView } from "@/lib/hooks";
import { siteConfig } from "@/lib/data";

const socialLinks = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Twitter", href: siteConfig.socials.twitter },
  { label: "Instagram", href: siteConfig.socials.instagram },
] as const;

export default function Contact() {
  const { ref, id } = useSectionInView("Contact");

  return (
    <motion.section
      id={id}
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
          href={`mailto:${siteConfig.email}`}
          className="block mt-4 text-3xl sm:text-5xl text-blue-600 dark:text-blue-400 duration-300"
          style={{transition: 'color 0.3s ease-in-out',}}
        >
          {siteConfig.email}
        </a>
      </div>

      {/* Social Links Section */}
      <h2 className="text-2xl font-semibold mt-20 mb-4 text-gray-700 dark:text-gray-300">
        Social
      </h2>

      <div className="flex justify-center space-x-8">
        {socialLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-transform duration-200 ease-in-out hover:scale-105"
            aria-label={label}
          >
            {label}
          </a>
        ))}
      </div>
    </motion.section>
  );
}
