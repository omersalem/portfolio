const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/verification');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verifyProfileEnhancements() {
  console.log('--- TESTING ENHANCED PROFILE, CAREER TIMELINE & 3D ELEMENTS ---');
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

  // 1. Capture Hero with new Credential Badges
  const heroSection = page.locator('#hero');
  const heroPath = path.join(OUTPUT_DIR, 'profile-hero-credentials.png');
  await heroSection.screenshot({ path: heroPath });
  console.log('Saved Hero Credentials screenshot:', heroPath);

  // 2. Capture Section 3 (Engineering Core & Stack Badges)
  const engineeringSection = page.locator('#engineering');
  await engineeringSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const engPath = path.join(OUTPUT_DIR, 'profile-engineering-stack.png');
  await engineeringSection.screenshot({ path: engPath });
  console.log('Saved Engineering Stack screenshot:', engPath);

  // 3. Capture Section 4 (Visual CV, Metrics, Timeline, 3D Bridge & AI Showcase)
  const profileSection = page.locator('#profile');
  await profileSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const profilePath = path.join(OUTPUT_DIR, 'profile-timeline-cv.png');
  await profileSection.screenshot({ path: profilePath });
  console.log('Saved Visual CV & Timeline screenshot:', profilePath);

  // 4. Capture Section 5 (3D Laptop with MNE Ramallah Telemetry)
  const contactSection = page.locator('#contact');
  await contactSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500); // Allow telemetry loop to run
  const laptopPath = path.join(OUTPUT_DIR, 'profile-laptop-telemetry.png');
  await contactSection.screenshot({ path: laptopPath });
  console.log('Saved 3D Laptop Telemetry screenshot:', laptopPath);

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found during profile verification:');
    errors.forEach((e) => console.error(' ', e));
    process.exit(1);
  }
  console.log('--- PROFILE & CAREER ENHANCEMENTS VERIFICATION COMPLETED (0 ERRORS) ---');
}

verifyProfileEnhancements().catch((err) => {
  console.error('Fatal error verifying profile enhancements:', err);
  process.exit(1);
});
