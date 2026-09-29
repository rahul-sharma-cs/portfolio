/**
 * Generates the site icons: a near-black Newsreader "R", optically centred.
 *
 *   src/app/favicon.ico     16/32/48 px PNG-in-ICO, transparent ground
 *   src/app/icon.png        192×192, transparent ground
 *   src/app/apple-icon.png  180×180 on the V1 cream (iOS fills transparency black)
 *
 *   node scripts/generate-icons.mjs
 *
 * No npm deps: headless Chrome draws each size on a <canvas> (centred on the
 * glyph's measured ink box, not the em box) and --dump-dom hands back the
 * PNG data URLs; the ICO container is written by hand below.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { newsreaderCss } from "./newsreader.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const APP = join(ROOT, "src", "app");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const INK = "#1F1E1B";
const CREAM = "#FAF9F5";
const WEIGHT = 600; // heavier stems keep the R legible at 16px

// size, ground (null = transparent), share of the square the R's ink height fills
const renders = [
  { id: "ico16", size: 16, ground: null, fill: 0.88 },
  { id: "ico32", size: 32, ground: null, fill: 0.9 },
  { id: "ico48", size: 48, ground: null, fill: 0.88 },
  { id: "icon", size: 192, ground: null, fill: 0.84 },
  { id: "apple", size: 180, ground: CREAM, fill: 0.62 },
];

const fonts = await newsreaderCss([WEIGHT]);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}</style></head><body>
<pre id="out"></pre>
<script>
(async () => {
  await document.fonts.load("${WEIGHT} 100px Newsreader", "R");
  const out = {};
  for (const r of ${JSON.stringify(renders)}) {
    const c = document.createElement("canvas");
    c.width = c.height = r.size;
    const ctx = c.getContext("2d");
    if (r.ground) { ctx.fillStyle = r.ground; ctx.fillRect(0, 0, r.size, r.size); }
    // Measure the ink box at 100px, then scale so its height = fill × size.
    ctx.font = "${WEIGHT} 100px Newsreader";
    const m0 = ctx.measureText("R");
    const inkH0 = m0.actualBoundingBoxAscent + m0.actualBoundingBoxDescent;
    const px = (100 * r.fill * r.size) / inkH0;
    ctx.font = "${WEIGHT} " + px + "px Newsreader";
    const m = ctx.measureText("R");
    const w = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    const x = (r.size - w) / 2 + m.actualBoundingBoxLeft;
    const y = (r.size - h) / 2 + m.actualBoundingBoxAscent;
    ctx.fillStyle = "${INK}";
    ctx.fillText("R", Math.round(x), Math.round(y));
    out[r.id] = c.toDataURL("image/png");
  }
  document.getElementById("out").textContent = JSON.stringify(out);
})();
</script></body></html>`;

const dir = mkdtempSync(join(tmpdir(), "icons-"));
const page = join(dir, "icons.html");
writeFileSync(page, html);
const dom = execFileSync(
  CHROME,
  ["--headless", "--disable-gpu", "--virtual-time-budget=5000", "--dump-dom", `file://${page}`],
  { maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] },
).toString();
const json = dom.match(/<pre id="out">(\{.*?\})<\/pre>/s)?.[1];
if (!json) throw new Error("no icon output in dumped DOM (font load failed?)");
const pngs = Object.fromEntries(
  Object.entries(JSON.parse(json)).map(([id, url]) => [id, Buffer.from(url.split(",")[1], "base64")]),
);

// ICO: 6-byte header, one 16-byte directory entry per image, then the PNG blobs.
const icoImages = [16, 32, 48].map((s) => ({ size: s, data: pngs[`ico${s}`] }));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoImages.length, 4);
let offset = 6 + 16 * icoImages.length;
const entries = icoImages.map(({ size, data }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0); // width
  e.writeUInt8(size, 1); // height
  e.writeUInt8(0, 2); // palette colours
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(data.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += data.length;
  return e;
});
writeFileSync(join(APP, "favicon.ico"), Buffer.concat([header, ...entries, ...icoImages.map((i) => i.data)]));
writeFileSync(join(APP, "icon.png"), pngs.icon);
writeFileSync(join(APP, "apple-icon.png"), pngs.apple);

for (const [id, png] of Object.entries(pngs)) {
  console.log(`${id}: ${png.readUInt32BE(16)}x${png.readUInt32BE(20)}, ${png.length} bytes`);
}
console.log("wrote src/app/favicon.ico, icon.png, apple-icon.png");
