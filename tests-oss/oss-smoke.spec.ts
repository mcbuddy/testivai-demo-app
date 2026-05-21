/**
 * OSS LANE — tests-oss/oss-smoke.spec.ts
 *
 * Runs with:  npm run test:oss  (uses playwright.oss.config.ts)
 *
 * No API key or TestivAI account needed — runs fully offline.
 * Baselines live in `.testivai/baselines/` (committed to the repo).
 * Report written to visual-report/index.html after every run.
 *
 * What you get:
 *   • Pixel diff  — detects any visual change
 *   • DOM diff    — "DOM unchanged" = likely render noise, not a real change
 *   • HTML report + CI artifact via mcbuddy/testivai-oss@v1
 *
 * First run  → all snapshots are "new" (baselines written to .testivai/baselines/)
 * Later runs → snapshots compared against baselines; diffs flagged in report
 *
 * Looking for the cloud (REVEAL AI) lane? → tests/component-showcase.spec.ts
 *   Run: export TESTIVAI_API_KEY=<your-key> && npm test
 */
import { test, expect } from '@playwright/test';
import { testivai } from '@testivai/witness-playwright';

test.describe('OSS — Component Showcase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('full-page layout', async ({ page }, testInfo) => {
    await expect(page.locator('h1')).toBeVisible();
    await testivai.witness(page, testInfo, 'oss-full-page');
  });

  test('button components', async ({ page }, testInfo) => {
    const section = page.locator('.component-section', {
      has: page.getByRole('heading', { name: 'Button Components' }),
    });
    await expect(section).toBeVisible();
    await testivai.witness(page, testInfo, 'oss-buttons');
  });

  test('alert components', async ({ page }, testInfo) => {
    const section = page.locator('.component-section', {
      has: page.getByRole('heading', { name: 'Alert Components' }),
    });
    await expect(section).toBeVisible();
    await testivai.witness(page, testInfo, 'oss-alerts');
  });
});
