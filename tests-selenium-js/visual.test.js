/**
 * OSS lane — Selenium (JavaScript, selenium-webdriver) visual smoke tests.
 *
 * Demonstrates @testivai/witness-selenium: same `.testivai/` baselines dir,
 * config, report, and `/testivai approve` flow as every other lane. Plain
 * Node script — the adapter needs no test framework, just the driver.
 *
 * Run:
 *   npm run test:selenium:js
 *
 * (builds nothing itself — expects the app served at BASE_URL, and runs
 * `testivai report` afterwards via the npm script.)
 */

import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { testivai } from '@testivai/witness-selenium';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

async function waitForText(driver, text, timeoutMs = 10_000) {
  await driver.wait(async () => {
    const body = await driver.executeScript('return document.body.innerText;');
    return typeof body === 'string' && body.includes(text);
  }, timeoutMs);
}

async function main() {
  const options = new chrome.Options()
    .addArguments('--headless=new', '--window-size=1280,800', '--force-device-scale-factor=1');
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get(BASE_URL);
    await waitForText(driver, 'Component Showcase');
    await testivai.witness(driver, 'seljs-full-page');

    // Per-call ignoreSelectors: the injected dynamic badge is excluded from
    // both the pixels and the DOM signal — content changes every run,
    // snapshot stays stable.
    await driver.executeScript(
      "var el = document.createElement('div');" +
        "el.className = 'seljs-dynamic-badge';" +
        "el.style.cssText = 'position:fixed;top:8px;left:8px;padding:4px 10px;" +
        "background:#1a1a2e;color:#00d4ff;font-family:monospace;z-index:9999;';" +
        "el.textContent = 'seljs-v' + Math.random().toFixed(8);" +
        'document.body.appendChild(el);',
    );
    await testivai.witness(driver, 'seljs-ignore-demo', {
      ignoreSelectors: ['.seljs-dynamic-badge'],
    });

    console.log('✓ 2 Selenium (JS) snapshots captured');
  } finally {
    await driver.quit();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
