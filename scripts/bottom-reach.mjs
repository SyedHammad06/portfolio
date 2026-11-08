// Compares each Contact reveal's trigger point (top 88%) to the max scroll.
// Usage: node scripts/bottom-reach.mjs <url> [width] [height]
import { chromium } from "playwright";

const [url, width = "1536", height = "730"] = process.argv.slice(2);
const browser = await chromium.launch({ ignoreDefaultArgs: ["--hide-scrollbars"] });
const page = await (
  await browser.newContext({ viewport: { width: Number(width), height: Number(height) }, reducedMotion: "no-preference" })
).newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(5000);
if (process.argv.includes("--shrink")) {
  await page.addStyleTag({ content: ":root { --u: calc(100vw / 1280 * 0.7) !important; }" });
  await page.waitForTimeout(600);
}
for (let i = 0; i < 400; i++) {
  const done = await page.evaluate(() => scrollY + innerHeight >= document.documentElement.scrollHeight - 2);
  if (done) break;
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(40);
}
await page.waitForTimeout(2500);
const back = Number(process.argv[5] ?? 0);
if (back) {
  for (let i = 0; i < back / 100; i++) {
    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(800);
  for (let i = 0; i < back / 100 + 5; i++) {
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(2500);
}
console.log(
  JSON.stringify(
    await page.evaluate(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      return {
        scrollbar: innerWidth - document.documentElement.clientWidth,
        max,
        y: Math.round(scrollY),
        items: [...document.querySelectorAll("#contact [data-reveal]")].map((el) => ({
          triggerAt: Math.round(el.getBoundingClientRect().top + scrollY - innerHeight * 0.88),
          opacity: Number(getComputedStyle(el).opacity).toFixed(2),
          shown: el.offsetParent !== null,
        })),
      };
    }),
  ),
);
await browser.close();
