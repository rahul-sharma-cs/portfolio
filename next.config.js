/* eslint-disable-next-line @typescript-eslint/no-require-imports */
const { execSync } = require("node:child_process");

// Vercel/CI build containers have no .git — the platform exposes the SHA via env instead.
let sha = (process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? "").slice(0, 7);
if (!sha) {
  try {
    sha = execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    sha = "dev"; /* no env SHA and no git (e.g. source tarball) */
  }
}

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_PUBLIC_BUILD_SHA: sha,
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  images: { qualities: [75, 95] },
};
