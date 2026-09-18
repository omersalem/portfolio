const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/verification');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verifyInfraCards3D() {
  console.log('--- TESTING 3D INFRASTRUCTURE CARDS & TILT PHYSICS ---');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`[Console Error] ${msg.text()}`);
    }
  });

  await page.goto('http://localhost:3000/#engineering', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const engineeringSection = page.locator('#engineering');
  await engineeringSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  // 1. Capture Resting 3D Engineering Cards
  const restingPath = path.join(OUTPUT_DIR, 'section3-infra-cards-resting.png');
  await engineeringSection.screenshot({ path: restingPath });
  console.log('Saved 3D Infrastructure Cards resting screenshot:', restingPath);

  // 2. Hover over Card 1 (Cisco Core Switches) to test 3D spring tilt & spotlight
  const cards = page.locator('#engineering [role="region"]');
  const cardCount = await cards.count();
  console.log(`Found ${cardCount} 3D Infrastructure cards.`);

  if (cardCount > 0) {
    const card1 = cards.first();
    const box1 = await card1.boundingBox();
    if (box1) {
      // Hover top-right of Card 1
      await page.mouse.move(box1.x + box1.width * 0.85, box1.y + box1.height * 0.2);
      await page.waitForTimeout(800);

      const tiltPath1 = path.join(OUTPUT_DIR, 'section3-card1-3d-tilt-hover.png');
      await engineeringSection.screenshot({ path: tiltPath1 });
      console.log('Saved Card 1 3D tilt hover screenshot:', tiltPath1);
    }

    // 3. Hover over Card 2 (Next-Gen Firewalls)
    if (cardCount > 1) {
      const card2 = cards.nth(1);
      const box2 = await card2.boundingBox();
      if (box2) {
        // Hover bottom-left of Card 2
        await page.mouse.move(box2.x + box2.width * 0.15, box2.y + box2.height * 0.85);
        await page.waitForTimeout(800);

        const tiltPath2 = path.join(OUTPUT_DIR, 'section3-card2-3d-tilt-hover.png');
        await engineeringSection.screenshot({ path: tiltPath2 });
        console.log('Saved Card 2 3D tilt hover screenshot:', tiltPath2);
      }
    }
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found during 3D infra cards verification:');
    errors.forEach((e) => console.error(' ', e));
    process.exit(1);
  }
  console.log('--- 3D INFRA CARDS VERIFICATION FINISHED SUCCESSFULLY (0 ERRORS) ---');
}

verifyInfraCards3D().catch((err) => {
  console.error('Fatal error verifying 3D infra cards:', err);
  process.exit(1);
});
