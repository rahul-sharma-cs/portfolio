/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sheet: "rgb(var(--c-sheet) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        pencil: "rgb(var(--c-pencil) / <alpha-value>)",
        rule: "rgb(var(--c-rule) / <alpha-value>)",
        redline: "rgb(var(--c-redline) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['"Archivo Variable"', "Arial", "sans-serif"],
        mono: ['"Martian Mono Variable"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // mono annotation tier (spec floor: 0.65rem)
        "anno-sm": ["0.65rem", { lineHeight: "1.4" }],
        "anno": ["0.7rem", { lineHeight: "1.4" }],
        "anno-lg": ["0.8rem", { lineHeight: "1.45" }],
        // body tier
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.65" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.75" }],
        // display tier (existing clamps, named)
        "head-sm": ["1.125rem", { lineHeight: "1.3" }],
        "head": ["clamp(1.9rem, 4.5vw, 3.4rem)", { lineHeight: "1" }],
        "head-lg": ["clamp(1.5rem, 3.5vw, 2.6rem)", { lineHeight: "1.15" }],
        "mail": ["clamp(2rem, 9vw, 4.2rem)", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
