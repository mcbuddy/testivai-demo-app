import { defineConfig, devices } from '@playwright/test';

/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  CLOUD LANE  —  playwright.config.ts                                     │
 * ├──────────────────────────────────────────────────────────────────────────┤
 * │  Tests: tests/                                                           │
 * │  Run:   npm test  (or: npx playwright test)                              │
 * │                                                                          │
 * │  Requires a TestivAI account + API key:                                  │
 * │    export TESTIVAI_API_KEY=<your-key>                                    │
 * │                                                                          │
 * │  What you get with cloud:                                                │
 * │    • REVEAL AI — 5-layer comparison (pixel, DOM, CSS, layout, AI)        │
 * │    • Team dashboard, history, smart baselines                            │
 * │    • Baseline approval workflow via testivai.io UI                       │
 * │                                                                          │
 * │  To switch to the OSS (no-account) lane instead:                        │
 * │    npm run test:oss   →  uses playwright.oss.config.ts                   │
 * │                          reads .testivai/baselines/, no API key needed   │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // Keep console output
    ['@testivai/witness-playwright/reporter']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
