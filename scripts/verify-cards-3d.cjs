const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/verification');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verify3DCards() {
  console.log('--- TESTING 3D CARD EFFECTS & HOVER INTERACTIONS ---');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await context.newPage();

  await page.goto('http://localhost:3000/#work', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to section 2
  const workSection = page.locator('#work');
  await workSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // 1. Capture Resting 3D Stage view
  const restingPath = path.join(OUTPUT_DIR, 'section2-cards-3d-resting.png');
  await workSection.screenshot({ path: restingPath });
  console.log('Saved resting cards 3D stage screenshot:', restingPath);

  // 2. Hover over Card 1 (Almalaki Store) at top-right corner to test 3D tilt
  const firstCard = page.locator('a[href*="almalakistore.ps"]');
  const box = await firstCard.boundingBox();
  if (box) {
    // Move to top-right of the card to create pronounced 3D tilt
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.25);
    await page.waitForTimeout(700);

    const tiltPath = path.join(OUTPUT_DIR, 'section2-card1-3d-tilt-hover.png');
    await workSection.screenshot({ path: tiltPath });
    console.log('Saved Card 1 3D tilt hover screenshot:', tiltPath);
  }

  // 3. Hover over Card 2 (Bazaria Council)
  const secondCard = page.locator('a[href*="bazariacouncil.pages.dev"]');
  const box2 = await secondCard.boundingBox();
  if (box2) {
    await page.mouse.move(box2.x + box2.width * 0.2, box2.y + box2.height * 0.7);
    await page.waitForTimeout(700);

    const tiltPath2 = path.join(OUTPUT_DIR, 'section2-card2-3d-tilt-hover.png');
    await workSection.screenshot({ path: tiltPath2 });
    console.log('Saved Card 2 3D tilt hover screenshot:', tiltPath2);
  }

  await browser.close();
  console.log('--- 3D CARD VERIFICATION FINISHED SUCCESSFULLY ---');
}

verify3DCards().catch((err) => {
  console.error('Error verifying 3D cards:', err);
  process.exit(1);
});
