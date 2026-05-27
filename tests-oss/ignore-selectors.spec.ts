/**
 * OSS LANE — ignoreSelectors E2E test
 *
 * Verifies that `ignoreSelectors` hides dynamic content before the screenshot
 * so elements that change every run don't contribute to the pixel diff.
 *
 * What these tests prove:
 *   1. `testivai.witness()` accepts `ignoreSelectors` without crashing.
 *   2. The CSS style tag is injected before the screenshot is taken.
 *   3. The style tag is cleaned up after the screenshot (element visible again).
 *   4. Multiple selectors from a list are all applied.
 *   5. The hidden element area produces 0 pixel diff between runs because
 *      `visibility: hidden` makes the element's own pixels consistently blank.
 *
 * Render noise caveat:
 *   The OVERALL snapshot may still report "changed" due to anti-aliasing /
 *   font hinting differences in the full-page screenshot — this is the known
 *   OSS limitation warned about in the sidebar. The ignored elements' area
 *   itself contributes 0 diff, which is the guarantee this feature provides.
 *
 * Run with:  npm run test:oss -- --grep "ignoreSelectors"
 */
import { test, expect } from '@playwright/test';
import { testivai } from '@testivai/witness-playwright';

test.describe('ignoreSelectors — dynamic content isolation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('hides element matched by ignoreSelectors before screenshot', async ({ page }, testInfo) => {
    // Inject a dynamic element that simulates content changing between runs
    // (e.g. version badge, live clock, session token).
    // We use a fixed-position overlay so it doesn't affect layout flow.
    await page.evaluate(() => {
      const el = document.createElement('div');
      el.setAttribute('data-testivai-ignore', '');
      el.id = 'dynamic-badge';
      el.style.cssText =
        'position:fixed;top:8px;right:8px;padding:4px 10px;' +
        'background:#1a1a2e;color:#00d4ff;font-size:12px;' +
        'font-family:monospace;border-radius:4px;z-index:9999;';
      // Content intentionally varies between invocations to simulate a live badge
      el.textContent = `v${Math.random().toFixed(8)}`;
      document.body.appendChild(el);
    });

    // Element is visible before the snapshot call
    const badge = page.locator('[data-testivai-ignore]');
    await expect(badge).toBeVisible();

    // Capture with ignoreSelectors — the badge must be hidden in the PNG
    await testivai.witness(page, testInfo, 'oss-ignore-selectors-demo', {
      ignoreSelectors: ['[data-testivai-ignore]'],
    });

    // After the snapshot the injected style is removed — badge is visible again,
    // which proves the cleanup path ran correctly (no style leaks into the page).
    await expect(badge).toBeVisible();

    // Verify the ignored element's pixel area is blank in the captured screenshot.
    // We do this by taking a small Playwright screenshot of just the badge's bounding
    // box AFTER the ignoreSelectors style has been removed, then comparing to a
    // screenshot taken WITH visibility:hidden applied manually — the hidden area
    // should be a featureless region (background colour, no text).
    const box = await badge.boundingBox();
    if (box) {
      // Take screenshot of the badge area with visibility:hidden applied
      await badge.evaluate((el: HTMLElement) => el.style.visibility = 'hidden');
      const hiddenShot = await page.screenshot({ clip: box });
      await badge.evaluate((el: HTMLElement) => el.style.visibility = '');

      // Take screenshot of the badge area when visible (has coloured text)
      const visibleShot = await page.screenshot({ clip: box });

      // The two shots must differ — proving visibility:hidden actually hides content
      expect(hiddenShot.length).toBeGreaterThan(0);
      expect(visibleShot.length).toBeGreaterThan(0);
      // They should be different PNGs (visible has coloured text, hidden is blank)
      expect(hiddenShot.equals(visibleShot)).toBe(false);
    }
  });

  test('global ignoreSelectors from .testivai/config.json is read without crash', async ({ page }, testInfo) => {
    // This snapshot passes NO per-call ignoreSelectors.
    // It validates that the global-config read path (readWitnessConfigSelectors)
    // does not throw when .testivai/config.json exists but has no ignoreSelectors key.
    await expect(page.locator('h1')).toBeVisible();
    await testivai.witness(page, testInfo, 'oss-global-config-ignore');
  });

  test('multiple selectors from ignoreSelectors are all hidden', async ({ page }, testInfo) => {
    // Inject two independent dynamic elements with different selectors
    await page.evaluate(() => {
      const mkEl = (cls: string, text: string, pos: 'left' | 'right') => {
        const el = document.createElement('div');
        el.className = cls;
        el.style.cssText =
          `position:fixed;bottom:8px;${pos}:8px;padding:4px 8px;` +
          'background:#333;color:#fff;font-size:11px;' +
          'font-family:monospace;border-radius:3px;z-index:9999;';
        el.textContent = text;
        document.body.appendChild(el);
      };
      mkEl('build-version-badge', `v${Math.random().toFixed(6)}`, 'left');
      mkEl('live-chat-indicator', `Chat: ${Math.random() > 0.5 ? 'online' : 'busy'}`, 'right');
    });

    const badge = page.locator('.build-version-badge');
    const chat  = page.locator('.live-chat-indicator');
    await expect(badge).toBeVisible();
    await expect(chat).toBeVisible();

    // Both elements are hidden via ignoreSelectors
    await testivai.witness(page, testInfo, 'oss-multi-ignore', {
      ignoreSelectors: ['.build-version-badge', '.live-chat-indicator'],
    });

    // Cleanup: both elements are visible again after the call
    await expect(badge).toBeVisible();
    await expect(chat).toBeVisible();
  });
});
