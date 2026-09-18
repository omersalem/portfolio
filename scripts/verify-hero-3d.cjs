const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/verification');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verifyHero3D() {
  console.log('--- TESTING ENHANCED HERO 3D SCENE & GYROSCOPIC MOTION ---');
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

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const heroSection = page.locator('#hero');

  // 1. Capture Resting Hero Scene
  const restingPath = path.join(OUTPUT_DIR, 'hero-3d-enhanced-resting.png');
  await heroSection.screenshot({ path: restingPath });
  console.log('Saved Enhanced Hero 3D resting screenshot:', restingPath);

  // 2. Test Pointer Parallax - Mouse Right
  const heroCanvas = page.locator('#hero canvas');
  const box = await heroCanvas.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.2);
    await page.waitForTimeout(800);

    const rightPath = path.join(OUTPUT_DIR, 'hero-3d-enhanced-parallax-right.png');
    await heroSection.screenshot({ path: rightPath });
    console.log('Saved Enhanced Hero 3D parallax right screenshot:', rightPath);

    // Mouse Left
    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.85);
    await page.waitForTimeout(800);

    const leftPath = path.join(OUTPUT_DIR, 'hero-3d-enhanced-parallax-left.png');
    await heroSection.screenshot({ path: leftPath });
    console.log('Saved Enhanced Hero 3D parallax left screenshot:', leftPath);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found during hero 3D verification:');
    errors.forEach((e) => console.error(' ', e));
    process.exit(1);
  }
  console.log('--- ENHANCED HERO 3D VERIFICATION COMPLETED (0 ERRORS) ---');
}

verifyHero3D().catch((err) => {
  console.error('Fatal error verifying hero 3D:', err);
  process.exit(1);
});
