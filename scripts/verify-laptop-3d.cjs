const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/verification');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verify3DLaptop() {
  console.log('--- TESTING 3D LAPTOP CANVAS & MOVEMENTS ---');
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

  await page.goto('http://localhost:3000/#contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const contactSection = page.locator('#contact');
  await contactSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  // 1. Capture Resting 3D Laptop
  const restingPath = path.join(OUTPUT_DIR, 'section5-laptop-3d-resting.png');
  await contactSection.screenshot({ path: restingPath });
  console.log('Saved 3D Laptop resting screenshot:', restingPath);

  // 2. Test Pointer Parallax on the laptop canvas
  const canvas = page.locator('#contact canvas');
  const box = await canvas.boundingBox();
  if (box) {
    // Move mouse to top-right of canvas to tilt the laptop
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.2);
    await page.waitForTimeout(900);

    const tiltPath1 = path.join(OUTPUT_DIR, 'section5-laptop-3d-tilt-right.png');
    await contactSection.screenshot({ path: tiltPath1 });
    console.log('Saved 3D Laptop tilted right screenshot:', tiltPath1);

    // Move mouse to bottom-left of canvas
    await page.mouse.move(box.x + box.width * 0.15, box.y + box.height * 0.85);
    await page.waitForTimeout(900);

    const tiltPath2 = path.join(OUTPUT_DIR, 'section5-laptop-3d-tilt-left.png');
    await contactSection.screenshot({ path: tiltPath2 });
    console.log('Saved 3D Laptop tilted left screenshot:', tiltPath2);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found during 3D laptop verification:');
    errors.forEach((e) => console.error(' ', e));
    process.exit(1);
  }
  console.log('--- 3D LAPTOP VERIFICATION FINISHED SUCCESSFULLY (0 ERRORS) ---');
}

verify3DLaptop().catch((err) => {
  console.error('Fatal error verifying 3D laptop:', err);
  process.exit(1);
});
