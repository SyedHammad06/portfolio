// Screenshot helper for design review captures.
// Usage: node scripts/capture.mjs <url> <out.png> <width> <height> [--full] [--motion]
// Motion is off by default so entrance animations are settled in the capture.
import { chromium } from "playwright";

const [url, out, width = "1440", height = "900", ...flags] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: node scripts/capture.mjs <url> <out.png> <width> <height> [--full] [--motion]");
  process.exit(1);
}

const browser = await chromium.launch({ args: ["--disable-lcd-text"] });
const context = await browser.newContext({
  viewport: { width: Number(width), height: Number(height) },
  deviceScaleFactor: 1,
  reducedMotion: flags.includes("--motion") ? "no-preference" : "reduce",
});
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(flags.includes("--motion") ? 3500 : 600);
await page.screenshot({ path: out, fullPage: flags.includes("--full") });
await browser.close();
console.log(`captured ${out} at ${width}x${height}`);
