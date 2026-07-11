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
    },
  },
  plugins: [],
};
