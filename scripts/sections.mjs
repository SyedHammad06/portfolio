// Screenshots each top-level section separately for review.
// Usage: node scripts/sections.mjs <url> <outDir> <width> <height>
import { chromium } from "playwright";

const [url, outDir, width = "1440", height = "900"] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--disable-lcd-text"] });
const context = await browser.newContext({
  viewport: { width: Number(width), height: Number(height) },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
for (const id of ["about", "work", "process", "journey", "contact"]) {
  const section = page.locator(`#${id}`);
  await section.screenshot({ path: `${outDir}/section-${id}-${width}.png` });
}
await browser.close();
console.log("done");
