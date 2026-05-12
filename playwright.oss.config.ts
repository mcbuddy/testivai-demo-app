/**
 * OSS lane Playwright config — local visual regression, no API key required.
 *
 * Reads baselines from `.testivai/baselines/` and writes an HTML report to
 * `visual-report/` after each run. Run with:
 *
 *   npm run test:oss
 *
 * To approve new/changed baselines after review:
 *   node -e "const {BaselineStore}=require('@testivai/witness/baselines');
 *            const s=new BaselineStore(process.cwd());
 *            s.listTemp().forEach(n=>s.approve(n))"
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests-oss',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['@testivai/witness-playwright/reporter'],
  ],
  use: {
    baseURL: `http://localhost:${process.env.TEST_SERVER_PORT || '5173'}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.TEST_SERVER_PORT ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
