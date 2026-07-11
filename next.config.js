/* eslint-disable-next-line @typescript-eslint/no-require-imports */
const { execSync } = require("node:child_process");

let sha = "dev";
try {
  sha = execSync("git rev-parse --short HEAD").toString().trim();
} catch {
  /* git unavailable (e.g. CI tarball) — keep "dev" */
}

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_PUBLIC_BUILD_SHA: sha,
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  images: { qualities: [75, 95] },
};
