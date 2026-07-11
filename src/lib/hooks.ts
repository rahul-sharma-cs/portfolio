"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "react-intersection-observer";
import { links } from "@/lib/data";
import type { SectionName } from "@/lib/types";
import { useActiveSectionContext } from "@/context/active-section-context";

/**
 * Scroll-spy: marks `name` active when >= `threshold` of the section is visible.
 * Returns the intersection ref and the section's DOM id (derived from the nav
 * hash so name/hash/id can never drift). Observer updates are suppressed for
 * 1000ms after a nav click so intermediate sections don't steal the highlight.
 */
export function useSectionInView(name: SectionName, threshold = 0.5) {
  const { ref, inView } = useInView({ threshold });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(name);
    }
  }, [inView, name, setActiveSection, timeOfLastClick]);

  const hash = links.find((link) => link.name === name)!.hash;
  return { ref, id: hash.slice(1) };
}

/**
 * Measures an element's rendered width (rounded px). Debounced ResizeObserver;
 * state only updates when the rounded value changes — no churn.
 */
export function useMeasuredWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const measure = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      setWidth((prev) => (prev === w ? prev : w));
    };
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    });
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return { ref, width };
}

/** SSR-safe media query (false on the server). */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
