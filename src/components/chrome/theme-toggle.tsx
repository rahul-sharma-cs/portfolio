"use client";

import { useTheme } from "@/context/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(e)}
      aria-label={theme === "dark" ? "Switch to vellum (light) theme" : "Switch to cyanotype (dark) theme"}
      className="flex h-9 w-9 items-center justify-center border border-rule text-ink transition-colors hover:border-ink"
    >
      {theme === "dark" ? (
        /* sun — drafting-compass style */
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="fill-none stroke-current">
          <circle cx="7" cy="7" r="3" strokeWidth="1" />
          <path strokeWidth="1" d="M7 0v2M7 12v2M0 7h2M12 7h2M2.2 2.2l1.4 1.4M10.4 10.4l1.4 1.4M11.8 2.2l-1.4 1.4M3.6 10.4l-1.4 1.4" />
        </svg>
      ) : (
        /* crescent */
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="fill-none stroke-current">
          <path strokeWidth="1" d="M11.5 8.6A5 5 0 1 1 5.4 2.5a4 4 0 1 0 6.1 6.1Z" />
        </svg>
      )}
    </button>
  );
}
