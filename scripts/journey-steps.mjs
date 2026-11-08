// Captures the Journey chapter at several points through its scroll range.
// Usage: node scripts/journey-steps.mjs <url> <outDir> <width> <height> [--reduce]
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const [url, outDir, width = "1440", height = "900", ...flags] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("usage: node scripts/journey-steps.mjs <url> <outDir> <width> <height> [--reduce]");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ args: ["--disable-lcd-text"] });
const context = await browser.newContext({
  viewport: { width: Number(width), height: Number(height) },
  deviceScaleFactor: 1,
  reducedMotion: flags.includes("--reduce") ? "reduce" : "no-preference",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(err.message));
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);

const range = await page.evaluate(() => {
  const section = document.getElementById("journey");
  const top = section.getBoundingClientRect().top + window.scrollY;
  const header = document.querySelector("header")?.offsetHeight ?? 0;
  return { start: top - header, height: section.offsetHeight, viewport: window.innerHeight };
});

const steps = [0, 0.2, 0.45, 0.7, 0.95];
for (const [i, t] of steps.entries()) {
  const y = range.start + Math.max(0, range.height - range.viewport) * t;
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(1600);
  const out = `${outDir}/step-${i}.png`;
  await page.screenshot({ path: out });
  console.log(`captured ${out} at scroll ${Math.round(y)}`);
}
console.log(JSON.stringify({ range, errors }));
await browser.close();
