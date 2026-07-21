/**
 * OSS lane — masking demo (@testivai/witness 1.4+).
 *
 * Masks exclude areas from the pixel diff at COMPARISON time and stay
 * auditable: the masked region is hatched in the diff image and listed in
 * the report with its source. Unlike ignoreSelectors (capture-time
 * hiding), the content still renders — it just can't fail the diff.
 *
 * Docs: https://github.com/mcbuddy/testivai-oss/blob/main/docs/comparison.md
 */

import { test } from '@playwright/test';
import { testivai } from '@testivai/witness-playwright';

test.describe('Masking demo', () => {
  test('dynamic badge masked by selector + top strip masked by edge', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForSelector('text=Component Showcase');

    // Inject a randomized badge — the classic dynamic-content diff source.
    await page.evaluate(() => {
      const el = document.createElement('div');
      el.className = 'mask-demo-badge';
      el.style.cssText =
        'position:fixed;top:60px;right:8px;padding:4px 10px;' +
        'background:#1a1a2e;color:#00d4ff;font-family:monospace;z-index:9999;';
      el.textContent = 'build-' + Math.random().toFixed(8);
      document.body.appendChild(el);
    });

    await testivai.witness(page, testInfo, 'oss-mask-demo', {
      mask: [
        '.mask-demo-badge', // selector mask — geometry captured at capture time
        { top: 12 },        // edge mask — a full-width 12px strip
      ],
    });
  });
});
