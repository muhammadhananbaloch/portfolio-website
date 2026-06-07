const puppeteer = require("puppeteer");
const path = require("path");

const SHOTS = [
  { name: "v4-0-landing", scroll: 0, wait: 1500 },
  { name: "v4-1-graph-build", scroll: 800, wait: 800 },
  { name: "v4-2-headline", scroll: 1400, wait: 800 },
  { name: "v4-3-stats", scroll: 2600, wait: 800 },
  { name: "v4-4-proj1", scroll: 5000, wait: 1200 },
  { name: "v4-5-proj2", scroll: 7800, wait: 1200 },
  { name: "v4-6-proj3", scroll: 10600, wait: 1200 },
  { name: "v4-7-proj4", scroll: 13400, wait: 1200 },
  { name: "v4-8-proj5", scroll: 15800, wait: 1200 },
  { name: "v4-9-proj6", scroll: 18200, wait: 1200 },
  { name: "v4-10-philosophy", scroll: 20500, wait: 1200 },
  { name: "v4-11-stack", scroll: 23000, wait: 1200 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:4231", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  for (const shot of SHOTS) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), shot.scroll);
    await new Promise((r) => setTimeout(r, shot.wait));
    await page.screenshot({ path: path.join(__dirname, "screenshots", `${shot.name}.png`) });
    console.log(`captured ${shot.name}`);
  }

  await browser.close();
  console.log("done");
})();
