"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  /** Pass the click event so the cyanotype wipe expands from the toggle. */
  toggleTheme: (e?: React.MouseEvent) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function applyToggle() {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.theme = isDark ? "dark" : "light";
  } catch {
    /* storage unavailable — theme still flips for the session */
  }
}

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      applyToggle();
      return;
    }
    if (!doc.startViewTransition) {
      const root = document.documentElement;
      root.classList.add("theme-fade");
      applyToggle();
      window.setTimeout(() => root.classList.remove("theme-fade"), 350);
      return;
    }
    const W = window.innerWidth;
    const H = window.innerHeight;
    const x = e?.clientX ?? W - 40;
    const y = e?.clientY ?? 24;
    const r = Math.hypot(Math.max(x, W - x), Math.max(y, H - y));
    // Percentages, not px. Chrome 152's compositor runs px clip-path animations on
    // the view-transition pseudo at half scale (origin and radius both land at 1/2),
    // so the wipe started mid-header and stopped short of the corners. Percentage
    // geometry renders correctly there and is identical in every other engine.
    // A circle() percentage radius resolves against sqrt(w^2 + h^2) / sqrt(2).
    const cx = (x / W) * 100;
    const cy = (y / H) * 100;
    const cr = ((r * Math.SQRT2) / Math.hypot(W, H)) * 100;
    const transition = doc.startViewTransition(applyToggle);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0% at ${cx}% ${cy}%)`, `circle(${cr}% at ${cx}% ${cy}%)`] },
          { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {
        /* transition skipped (e.g. rapid toggling) — theme already applied */
      });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}
