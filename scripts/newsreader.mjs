/**
 * Newsreader @font-face CSS with the woff2 files inlined as data URIs, for
 * the generate-og / generate-icons scripts (headless Chrome renders from a
 * file:// page, so fonts must be embedded). Fetched from Google Fonts at run
 * time; nothing is committed. Latin subset only.
 */
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

export async function newsreaderCss(weights = [400, 600]) {
  const axes = weights.map((w) => `6..72,${w}`).join(";");
  const url = `https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@${axes}&display=swap`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Google Fonts CSS ${res.status}`);
  const css = await res.text();
  // Each subset block is preceded by a /* subset */ comment; keep latin only.
  const blocks = css.split(/(?=\/\* )/).filter((b) => b.startsWith("/* latin */"));
  if (!blocks.length) throw new Error("no latin @font-face blocks in Google Fonts CSS");
  const out = [];
  for (const block of blocks) {
    const src = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    if (!src) throw new Error("no woff2 url in @font-face block");
    const font = Buffer.from(await (await fetch(src)).arrayBuffer()).toString("base64");
    out.push(block.replace(src, `data:font/woff2;base64,${font}`));
  }
  return out.join("\n");
}
