/**
 * Generates public/og.png — the 1200×630 Open Graph card, drawn as a dark
 * (cyanotype) SHT 01 title block. Rerun after a name/role/status change:
 *
 *   node scripts/generate-og.mjs
 *
 * Rasterizes via local headless Chrome (no npm deps); brand fonts are
 * base64-embedded from the installed @fontsource-variable packages, so the
 * card always matches the site's typography. Colors mirror the .dark tokens
 * in globals.css — update both together.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "og.png");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const font = (p) =>
  readFileSync(join(ROOT, "node_modules", "@fontsource-variable", p)).toString("base64");
const archivo = font("archivo/files/archivo-latin-wdth-normal.woff2");
const martian = font("martian-mono/files/martian-mono-latin-wght-normal.woff2");

// Cyanotype tokens (globals.css .dark): sheet 122A47 · ink F2EFE4 · pencil B9C3CF · rule 3C557A · redline FF7A55
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Archivo V"; src: url(data:font/woff2;base64,${archivo}) format("woff2-variations"); font-weight: 100 900; font-stretch: 62.5% 125%; }
@font-face { font-family: "Martian V"; src: url(data:font/woff2;base64,${martian}) format("woff2-variations"); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px; overflow: hidden; position: relative;
  background-color: #122A47;
  background-image:
    linear-gradient(rgba(242,239,228,0.11) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242,239,228,0.11) 1px, transparent 1px),
    linear-gradient(rgba(242,239,228,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242,239,228,0.06) 1px, transparent 1px);
  background-size: 96px 96px, 96px 96px, 24px 24px, 24px 24px;
  -webkit-font-smoothing: antialiased;
}
.mono { font-family: "Martian V"; font-weight: 500; text-transform: uppercase; }
.frame { position: absolute; inset: 28px; border: 1px solid #3C557A; }
.crop { position: absolute; width: 22px; height: 22px; border: 0 solid #FF7A55; }
.crop.tl { left: 20px; top: 20px; border-left-width: 2px; border-top-width: 2px; }
.crop.tr { right: 20px; top: 20px; border-right-width: 2px; border-top-width: 2px; }
.crop.bl { left: 20px; bottom: 20px; border-left-width: 2px; border-bottom-width: 2px; }
.crop.br { right: 20px; bottom: 20px; border-right-width: 2px; border-bottom-width: 2px; }
.eyebrow { position: absolute; left: 64px; top: 62px; font-size: 19px; letter-spacing: 0.16em; color: #B9C3CF; }
.name {
  position: absolute; left: 58px; top: 138px;
  font-family: "Archivo V"; font-variation-settings: "wght" 780, "wdth" 120;
  font-size: 168px; line-height: 0.95; letter-spacing: -0.02em;
  text-transform: uppercase; color: #F2EFE4;
}
.dim { position: absolute; left: 0; right: 0; top: 492px; display: flex; align-items: center; color: #FF7A55; }
.dim .tick { width: 2px; height: 14px; background: #FF7A55; }
.dim .line { flex: 1; height: 2px; background: #FF7A55; }
.dim .label { font-size: 18px; letter-spacing: 0.12em; padding: 0 16px; }
.meta { position: absolute; left: 64px; bottom: 52px; font-size: 17px; letter-spacing: 0.14em; color: #B9C3CF; line-height: 2.1; }
.meta b { color: #F2EFE4; font-weight: 500; }
.stamp {
  position: absolute; right: 64px; bottom: 60px; transform: rotate(-2deg);
  border: 3px solid #FF7A55; color: #FF7A55; padding: 11px 18px;
  font-size: 18px; font-weight: 600; letter-spacing: 0.14em; white-space: nowrap;
}
</style></head><body>
  <div class="frame"></div>
  <span class="crop tl"></span><span class="crop tr"></span><span class="crop bl"></span><span class="crop br"></span>
  <p class="eyebrow mono">SHEET 01/06 — TITLE BLOCK — GENERAL ARRANGEMENT</p>
  <h1 class="name">Rahul<br>Sharma</h1>
  <div class="dim mono" aria-hidden="true">
    <span class="tick"></span><span class="line"></span>
    <span class="label">&#8592; 1200 PX &#8594;</span>
    <span class="line"></span><span class="tick"></span>
  </div>
  <p class="meta mono"><b>TITLE: SOFTWARE ENGINEER</b><br>SCALE 1:1 &#183; WWW.RAHULSHARMA-CS.SITE</p>
  <p class="stamp mono">SEEKING FULL-TIME — DEC 2026</p>
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
