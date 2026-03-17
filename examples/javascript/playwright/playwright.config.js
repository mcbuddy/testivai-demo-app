import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright configuration for Testivai demo app
 */
export default defineConfig({
  testDir: './',
  testMatch: '*.spec.js',
  
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
    ['@testivai/witness-playwright/reporter', {
      debug: true, // Set to true for verbose logging
      apiKey: process.env.TESTIVAI_API_KEY, // Explicitly pass API key
      compression: {
        compressUploads: true,
        compressionThreshold: 5 * 1024 * 1024, // 5MB threshold
      }
    }]
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${process.env.TEST_SERVER_PORT || 5173}`,

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
    url: `http://localhost:${process.env.TEST_SERVER_PORT || 5173}`,
    cwd: '../../..',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
