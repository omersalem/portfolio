const { chromium } = require('playwright');
const path = require('path');

async function captureHero() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const heroSection = page.locator('#hero');
  await heroSection.screenshot({ path: path.resolve(__dirname, '../tmp/verification/current-hero-inspection.png') });
  await browser.close();
  console.log('Hero captured successfully');
}

captureHero().catch(console.error);
