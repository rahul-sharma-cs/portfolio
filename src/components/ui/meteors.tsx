"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";
import { useTheme } from "@/context/theme-context";

// Deterministic pseudo-random from the index so SSR and client HTML agree.
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const { theme } = useTheme();
  const meteorCount = number || 20;

  const meteorStyles = new Array(meteorCount).fill(true).map((_, idx) => ({
    left: idx * (800 / meteorCount) - 400,
    animationDelay: seededRandom(idx + 1) * 5 + "s",
    animationDuration:
      Math.floor(seededRandom((idx + 1) * 7) * 5 + 5) + "s",
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none z-0"
    >
      {meteorStyles.map((style, idx) => {
        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:to-transparent before:content-['']",
              theme === "dark"
                ? "bg-slate-300 before:from-slate-300"
                : "bg-slate-600 before:from-slate-600",
              className,
            )}
            style={{
              top: "-40px",
              left: style.left + "px",
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};