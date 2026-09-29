# Rahul Sharma — Portfolio

Personal portfolio in two versions, switched from the V1/V2 control in the
bottom-right corner:

- **V1, at `/`** — a plain, single-column page: who I am, work, projects,
  education. Plain CSS, one serif, no client components.
- **V2, at `/v2`** — the same story drafted as an engineering drawing set:
  vellum paper and graph grid by day, cyanotype blueprint by night, six sheets.

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

V1's copy lives in `src/lib/plain.ts`; V2's in `src/lib/data.ts`. Contact links and the résumé path are shared through `siteConfig`.

Everything person-specific lives in `src/lib/data.ts` — projects, skills,
experience, socials — and mirrors the committed one-page résumé
(`public/Rahul_Resume.pdf`), which is the source of truth for facts and dates. Adding a project is one object (image optional; `links.github` /
`links.live` render as REF links when present).
Replace `/public/Rahul_Resume.pdf` to update the résumé.

## Contact

- **Email**: [rs.rahul1@outlook.com](mailto:rs.rahul1@outlook.com)
- **LinkedIn**: [@rahulsharma-cs](https://linkedin.com/in/rahulsharma-cs)
- **GitHub**: [@rahul-sharma-cs](https://github.com/rahul-sharma-cs)
