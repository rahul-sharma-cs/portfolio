# Rahul Sharma — Portfolio

Personal portfolio drafted as an engineering drawing set: vellum paper and graph
grid by day, cyanotype blueprint by night. Six sheets — title block, drawings,
bill of materials, revision history, detail view, sign-off.

**Live site:** [www.rahulsharma-cs.site](https://www.rahulsharma-cs.site)

## Built with

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** with a two-theme token system (vellum / cyanotype)
- **Motion** for the plotter entrance, exploded axonometric project views,
  draw-on rules, spring stamps, and the caliper scroll-spy
- **Archivo Variable** + **Martian Mono Variable**, self-hosted
- Build provenance: the git SHA and build date are stamped into the hero title block

## Running locally

    npm install
    npm run dev

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`,
`npm run generate:letterforms` (only when the name/typeface changes),
`node scripts/check-contrast.mjs` (WCAG token audit),
`node scripts/generate-og.mjs` (regenerate the social card; needs local Chrome).

## Editing content

Everything person-specific lives in `src/lib/data.ts` — projects, skills,
experience, socials. Adding a project is one object (image optional; add
`links.github` / `links.live` and the "REV PENDING" stamp becomes real links).
Replace `/public/Rahul_Resume.pdf` to update the résumé.

## Contact

- **Email**: [rs.rahul1@outlook.com](mailto:rs.rahul1@outlook.com)
- **LinkedIn**: [@rahulsharma-cs](https://linkedin.com/in/rahulsharma-cs)
- **GitHub**: [@rahul-sharma-cs](https://github.com/rahul-sharma-cs)
