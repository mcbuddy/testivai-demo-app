/**
 * OSS Smoke Tests — visual regression with @testivai/witness-playwright
 *
 * These tests run in local mode: no API key needed, no cloud account.
 * Baselines live in `.testivai/baselines/`; reports go to `visual-report/`.
 *
 * First run  → all snapshots are "new" (baselines written)
 * Later runs → snapshots compared against baselines; diffs flagged in report
 *
 * The report also shows a DOM noise hint:
 *   • "DOM unchanged" → pixel diff is likely render noise (font hinting, AA)
 *   • "DOM changed"   → structural change detected; review carefully
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
