/**
 * OSS lane Playwright config.
 *
 * Runs the demo app against the open-source TestivAI SDKs in local mode.
 * Uses tests under ./tests-oss only.
 *
 * Local mode is configured by `.testivai/config.json` at the project root.
 * No API key is required.
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests-oss',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
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
  },
});
