/**
 * Generates public/og.png — the 1200×630 Open Graph card, drawn in the
 * plain V1 style (cream ground, Newsreader, one blue link). Rerun after a
 * name/role change, then bump the ?v= query on the og image in
 * src/lib/metadata.ts so WhatsApp/Facebook rescrape it:
 *
 *   node scripts/generate-og.mjs
 *
 * Rasterizes via local headless Chrome (no npm deps); Newsreader is fetched
 * from Google Fonts and base64-embedded at run time. Colors mirror
 * src/app/(plain)/plain.css — update both together.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { newsreaderCss } from "./newsreader.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "og.png");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const fonts = await newsreaderCss([400, 600]);

// V1 tokens: ground FAF9F5 · ink 1F1E1B · muted 6B6860 · rule E7E6E1 · link 0000EE
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
* { margin: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px; overflow: hidden;
  background: #FAF9F5; color: #1F1E1B;
  font-family: "Newsreader", serif; font-optical-sizing: auto;
  display: flex; flex-direction: column; justify-content: center;
  padding: 0 120px;
  -webkit-font-smoothing: antialiased;
}
.name { font-size: 124px; font-weight: 400; line-height: 1; letter-spacing: -0.015em; }
.role { margin-top: 22px; font-size: 54px; font-weight: 400; line-height: 1.1; color: #6B6860; }
.rule { margin: 56px 0 34px; width: 420px; height: 2px; background: #E7E6E1; }
.url { font-size: 36px; color: #0000EE; }
</style></head><body>
  <h1 class="name">Rahul Sharma</h1>
  <p class="role">Software Engineer</p>
  <div class="rule"></div>
  <p class="url">rahulsharma-cs.site</p>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), "og-"));
const page = join(dir, "og.html");
writeFileSync(page, html);
execFileSync(CHROME, [
  "--headless",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  `--screenshot=${OUT}`,
  "--virtual-time-budget=5000",
  `file://${page}`,
]);

// PNG IHDR sanity: width/height are big-endian uint32 at bytes 16/20.
const png = readFileSync(OUT);
const w = png.readUInt32BE(16);
const h = png.readUInt32BE(20);
if (w !== 1200 || h !== 630) throw new Error(`og.png is ${w}x${h}, expected 1200x630`);
console.log(`public/og.png written — ${w}x${h}, ${(png.length / 1024).toFixed(0)}KB`);
