// Checks that the pinned Journey tower fits its viewport at several sizes.
// Usage: node scripts/journey-fit.mjs <url>
import { chromium } from "playwright";

const sizes = [
  [1024, 640],
  [1366, 650],
  [1366, 768],
  [1440, 900],
  [1536, 730],
  [1536, 864],
  [1920, 1080],
];
const browser = await chromium.launch();
for (const [width, height] of sizes) {
  const page = await (await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" })).newPage();
  await page.goto(process.argv[2], { waitUntil: "networkidle" });
  const result = await page.evaluate(() => {
    const frame = document.querySelector("[data-journey-frame]");
    const header = document.querySelector("header").offsetHeight;
    return {
      fits: frame.offsetHeight <= innerHeight - header + 2,
      frame: frame.offsetHeight,
      avail: innerHeight - header,
      row: document.querySelector("[data-journey-block]").offsetHeight,
    };
  });
  console.log(`${width}x${height}`, JSON.stringify(result));
  await page.close();
}
await browser.close();
