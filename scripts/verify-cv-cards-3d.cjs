const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/verification');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verifyCVCards3D() {
  console.log('--- TESTING SECTION 4 (VISUAL CV) 3D METRIC & DISCIPLINE CARDS ---');
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

  await page.goto('http://localhost:3000/#profile', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const profileSection = page.locator('#profile');
  await profileSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Scroll smoothly through the section to trigger inView animations
  await page.evaluate(() => {
    const el = document.getElementById('profile');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await page.waitForTimeout(800);

  // 1. Capture 3D Metric Cards Row
  const metricCards = profileSection.locator('div[style*="perspective: 1000"]');
  const metricCount = await metricCards.count();
  console.log(`Found ${metricCount} 3D Metric cards.`);

  const metricsRow = profileSection.locator('.grid.grid-cols-2.lg\\:grid-cols-4').first();
  await metricsRow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const metricsRowPath = path.join(OUTPUT_DIR, 'section4-metrics-row.png');
  await metricsRow.screenshot({ path: metricsRowPath });
  console.log('Saved 3D Metrics Row screenshot:', metricsRowPath);

  if (metricCount > 0) {
    const metric1 = metricCards.first(); // "8+ Years"
    const box1 = await metric1.boundingBox();
    if (box1) {
      // Hover top-right of Metric Card 1 to induce 3D tilt
      await page.mouse.move(box1.x + box1.width * 0.82, box1.y + box1.height * 0.22);
      await page.waitForTimeout(700);

      const metricTiltPath = path.join(OUTPUT_DIR, 'section4-metric-card-3d-tilt.png');
      await metric1.screenshot({ path: metricTiltPath });
      console.log('Saved Metric Card 1 3D tilt screenshot:', metricTiltPath);
    }
  }

  // 2. Locate 3D Discipline Cards (perspective: 1200)
  const disciplineCards = profileSection.locator('div[style*="perspective: 1200"]');
  const disciplineCount = await disciplineCards.count();
  console.log(`Found ${disciplineCount} 3D Discipline cards.`);

  const disciplinesGrid = profileSection.locator('.grid.grid-cols-1.sm\\:grid-cols-2').first();
  await disciplinesGrid.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const disciplinesGridPath = path.join(OUTPUT_DIR, 'section4-disciplines-grid.png');
  await disciplinesGrid.screenshot({ path: disciplinesGridPath });
  console.log('Saved 3D Disciplines Grid screenshot:', disciplinesGridPath);

  if (disciplineCount > 0) {
    // Card 1: 01 Website & Application Design
    const card1 = disciplineCards.first();
    const boxDisc1 = await card1.boundingBox();
    if (boxDisc1) {
      // Hover top-right of Discipline Card 1
      await page.mouse.move(boxDisc1.x + boxDisc1.width * 0.85, boxDisc1.y + boxDisc1.height * 0.2);
      await page.waitForTimeout(700);

      const discTiltPath1 = path.join(OUTPUT_DIR, 'section4-discipline-card1-3d-tilt.png');
      await card1.screenshot({ path: discTiltPath1 });
      console.log('Saved Discipline Card 1 3D tilt screenshot:', discTiltPath1);
    }

    // Card 3: 03 AI Systems, Agent Skills, Looping & Context
    if (disciplineCount > 2) {
      const card3 = disciplineCards.nth(2);
      await card3.scrollIntoViewIfNeeded();
      const boxDisc3 = await card3.boundingBox();
      if (boxDisc3) {
        // Hover bottom-left of Discipline Card 3
        await page.mouse.move(boxDisc3.x + boxDisc3.width * 0.18, boxDisc3.y + boxDisc3.height * 0.82);
        await page.waitForTimeout(700);

        const discTiltPath3 = path.join(OUTPUT_DIR, 'section4-discipline-card3-3d-tilt.png');
        await card3.screenshot({ path: discTiltPath3 });
        console.log('Saved Discipline Card 3 3D tilt screenshot:', discTiltPath3);
      }
    }
  }

  // 3. Full section screenshot
  const restingPath = path.join(OUTPUT_DIR, 'section4-cv-cards-resting.png');
  await profileSection.screenshot({ path: restingPath });
  console.log('Saved Section 4 Visual CV resting screenshot:', restingPath);

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors encountered during verification:', errors);
    process.exit(1);
  } else {
    console.log('SUCCESS: Section 4 3D cards verification passed with 0 console errors!');
  }
}

verifyCVCards3D().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
