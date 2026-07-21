// WCAG contrast audit for the Blueprint token pairs. Run: node scripts/check-contrast.mjs
const tokens = {
  light: { sheet: "F7F5F0", ink: "1C1B18", pencil: "5C594F", redline: "B5341B" },
  dark: { sheet: "122A47", ink: "F2EFE4", pencil: "B9C3CF", redline: "FF7A55" },
};
const lum = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
let failed = false;
for (const [theme, t] of Object.entries(tokens)) {
  for (const fg of ["ink", "pencil", "redline"]) {
    const r = ratio(t[fg], t.sheet);
    const ok = r >= 4.5;
    if (!ok) failed = true;
    console.log(`${theme.padEnd(5)} ${fg.padEnd(8)} on sheet: ${r.toFixed(2)}:1 ${ok ? "PASS" : "FAIL"}`);
  }
}
process.exit(failed ? 1 : 0);
