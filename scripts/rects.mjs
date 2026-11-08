// Prints bounding boxes for selectors, for checking captures against comp coordinates.
// Usage: node scripts/rects.mjs <url> <width> <height> <selector...>
import { chromium } from "playwright";

const [url, width, height, ...selectors] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
for (const sel of selectors) {
  const rects = await page.$$eval(sel, (els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} font=${s.fontSize} bg=${s.backgroundColor} transform=${s.transform}`;
    }),
  );
  console.log(sel, rects.join(" | ") || "(none)");
}
await browser.close();
