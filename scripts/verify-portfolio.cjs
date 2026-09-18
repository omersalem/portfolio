const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../tmp/verification');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TARGET_VIEWPORTS = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];

const EXPECTED_PROJECTS = [
  { name: 'Almalaki Store', url: 'https://almalakistore.ps/' },
  { name: 'Bazaria Council', url: 'https://bazariacouncil.pages.dev/' },
  { name: 'handmade.ps', url: 'https://handmade.ps/' },
  { name: 'Pistachio', url: 'https://postachio.pages.dev/' },
  { name: 'Lama Home', url: 'https://lamastorev2.pages.dev/' },
];

async function runVerification() {
  console.log('--- STARTING COMPREHENSIVE PORTFOLIO VERIFICATION ---');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });

  const errors = [];
  const results = {};

  for (const vp of TARGET_VIEWPORTS) {
    console.log(`\nVerifying Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Listen to console errors and network failures
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`[Console Error at ${vp.name}] ${msg.text()}`);
      }
    });
    page.on('response', (response) => {
      if (!response.ok() && response.status() !== 304) {
        errors.push(`[HTTP ${response.status()} at ${vp.name}] ${response.url()}`);
      }
    });

    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Check Horizontal Overflow
    const overflow = await page.evaluate(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
        htmlScrollWidth: document.documentElement.scrollWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    console.log(`  Horizontal overflow check:`, overflow.hasHorizontalOverflow ? 'FAILED' : 'PASSED');
    if (overflow.hasHorizontalOverflow) {
      errors.push(`Horizontal overflow detected at ${vp.width}px: scrollWidth=${overflow.htmlScrollWidth} > innerWidth=${overflow.windowInnerWidth}`);
    }

    // 2. Capture Screenshot
    const screenshotPath = path.join(OUTPUT_DIR, `viewport-${vp.width}x${vp.height}-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot saved: ${screenshotPath}`);

    // 3. Test Mobile Menu on Mobile/Tablet
    if (vp.width < 1024) {
      console.log(`  Testing mobile menu interaction on ${vp.name}...`);
      const menuBtn = page.locator('button[aria-controls="mobile-navigation-drawer"]');
      const isVisible = await menuBtn.isVisible();
      if (!isVisible) {
        errors.push(`Menu button not visible at ${vp.width}px`);
      } else {
        await menuBtn.click();
        await page.waitForTimeout(300);

        // Check drawer open
        const isDrawerOpen = await page.locator('#mobile-navigation-drawer').isVisible();
        const ariaExpanded = await menuBtn.getAttribute('aria-expanded');
        console.log(`  Menu drawer opened: ${isDrawerOpen}, aria-expanded=${ariaExpanded}`);
        if (!isDrawerOpen || ariaExpanded !== 'true') {
          errors.push(`Drawer failed to open properly at ${vp.width}px`);
        }

        // Capture drawer screenshot on mobile
        if (vp.name === 'mobile') {
          await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile-menu-open.png') });
        }

        // Press Escape to close
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        const isDrawerClosed = !(await page.locator('#mobile-navigation-drawer').isVisible());
        const ariaExpandedAfter = await menuBtn.getAttribute('aria-expanded');
        console.log(`  Menu closed via Escape: ${isDrawerClosed}, aria-expanded=${ariaExpandedAfter}`);
        if (!isDrawerClosed || ariaExpandedAfter !== 'false') {
          errors.push(`Menu failed to close on Escape at ${vp.width}px`);
        }
      }
    } else {
      // Desktop: check full navigation links
      const navLinks = await page.locator('nav[aria-label="Primary Navigation"] a').allTextContents();
      console.log(`  Desktop navigation links:`, navLinks.join(' / '));
      const expectedNav = ['WORK', 'ENGINEERING', 'PROFILE', 'CONTACT'];
      if (JSON.stringify(navLinks) !== JSON.stringify(expectedNav)) {
        errors.push(`Desktop navigation text mismatch: got [${navLinks}], expected [${expectedNav}]`);
      }
    }

    // 4. Verify Project Links
    console.log(`  Checking 5 client project links...`);
    for (const proj of EXPECTED_PROJECTS) {
      const link = page.locator(`a[href="${proj.url}"]`);
      const count = await link.count();
      if (count === 0) {
        errors.push(`Missing project link for ${proj.name} (${proj.url}) at ${vp.name}`);
      }
    }

    // Check WhatsApp and Email active links
    const whatsappLink = page.locator('a[href*="wa.me/970599228979"]');
    if ((await whatsappLink.count()) === 0) {
      errors.push(`Missing active WhatsApp link at ${vp.name}`);
    }
    const emailLink = page.locator('a[href*="mailto:omersalem@mne.gov.ps"]');
    if ((await emailLink.count()) === 0) {
      errors.push(`Missing active Email link at ${vp.name}`);
    }

    await context.close();
  }

  // 5. Test Reduced Effects / Static Fallback Toggle
  console.log('\nTesting "Reduced Effects" toggle & static fallback mode...');
  const effectContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const effectPage = await effectContext.newPage();
  await effectPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  const toggleBtn = effectPage.locator('button[title*="3D"]');
  await toggleBtn.click();
  await effectPage.waitForTimeout(600);

  // Check that picture fallback is rendered
  const pictureCount = await effectPage.locator('picture img[src*="portfolio-hero-with-portrait.png"], picture img[src*="01-hero-chrome.png"]').count();
  console.log(`  Static fallback image rendered count: ${pictureCount}`);
  if (pictureCount === 0) {
    errors.push('Static fallback picture not found when reduced effects enabled');
  }

  await effectPage.screenshot({
    path: path.join(OUTPUT_DIR, 'reduced-effects-active.png'),
    fullPage: false,
  });
  await effectContext.close();

  // 6. Test prefers-reduced-motion
  console.log('\nTesting prefers-reduced-motion: reduce emulation...');
  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const motionPage = await motionContext.newPage();
  await motionPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await motionPage.waitForTimeout(500);

  const reducedMotionActive = await motionPage.evaluate(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  console.log(`  prefers-reduced-motion active in browser: ${reducedMotionActive}`);
  await motionContext.close();

  await browser.close();

  console.log('\n--- VERIFICATION SUMMARY ---');
  if (errors.length === 0) {
    console.log('SUCCESS: All automated checks passed with 0 errors!');
  } else {
    console.error(`FAILURE: Found ${errors.length} issues:`);
    errors.forEach((e) => console.error(`  - ${e}`));
  }
}

runVerification().catch((err) => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
