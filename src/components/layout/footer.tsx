import React from "react";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mb-5 mt-5 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
        reserved.
      </small>
    </footer>
  );
}
