/**
 * OSS Smoke Test
 *
 * Validates that the testivai-demo-app works end-to-end with the open-source
 * TestivAI SDKs in **local mode** (no cloud, no API key).
 *
 * On the first run, baselines are written under `.testivai/baselines/`.
 * On subsequent runs, the @testivai/witness-playwright reporter compares
 * against baselines and writes an HTML report under `visual-report/`.
 */
import { test, expect } from '@playwright/test';
import { testivai } from '@testivai/witness-playwright';

test.describe('OSS Smoke - Component Showcase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage renders and captures full-page snapshot', async ({ page }, testInfo) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Component Showcase');

    // Wait for any images to load
    await page.waitForLoadState('networkidle');
    await testivai.witness(page, testInfo, 'oss-homepage-full');
  });

  test('captures buttons section', async ({ page }, testInfo) => {
    const buttonHeading = page.getByRole('heading', { name: 'Button Components' });
    await expect(buttonHeading).toBeVisible();
    await testivai.witness(page, testInfo, 'oss-buttons-section');
  });
});
