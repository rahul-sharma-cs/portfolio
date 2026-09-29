import { Newsreader } from "next/font/google";

/** V1 serif. Self-hosted at build time by next/font; no npm dependency. */
export const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-serif",
});
