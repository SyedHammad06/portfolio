// Scrolls the page with motion on and reports any [data-reveal] element left hidden,
// plus console errors. Usage: node scripts/motion-check.mjs <url> [width] [height]
import { chromium } from "playwright";

const [url, width = "1440", height = "900"] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
const errors = [];
page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
page.on("pageerror", (err) => errors.push(err.message));
await page.goto(url, { waitUntil: "networkidle" });

const hiddenBefore = await page.$$eval("[data-reveal]", (els) =>
  els.filter((el) => getComputedStyle(el).opacity === "0").length,
);
const atBottom = () =>
  page.evaluate(() => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2);
for (let i = 0; i < 400 && !(await atBottom()); i++) {
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(120);
}
await page.waitForTimeout(1500);
const stillHidden = await page.$$eval("[data-reveal]", (els) =>
  els.filter((el) => Number(getComputedStyle(el).opacity) < 0.99).map((el) => el.textContent?.slice(0, 40)),
);
console.log(JSON.stringify({ hiddenBefore, stillHidden, errors }, null, 2));
await browser.close();
