/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  OSS LANE  —  playwright.oss.config.ts                                   │
 * ├──────────────────────────────────────────────────────────────────────────┤
 * │  Tests: tests-oss/                                                       │
 * │  Run:   npm run test:oss                                                 │
 * │                                                                          │
 * │  No API key or TestivAI account needed — runs fully offline.             │
 * │  Baselines live in .testivai/baselines/ (committed to the repo).         │
 * │  Report written to visual-report/index.html after every run.             │
 * │                                                                          │
 * │  What you get with OSS:                                                  │
 * │    • Pixel diff  — detects any visual change                             │
 * │    • DOM diff    — flags render noise when pixels change but DOM is same │
 * │    • HTML report — results.json + index.html, uploadable as CI artifact  │
 * │    • GitHub Action  mcbuddy/testivai-oss@v1 — PR comment + commit status │
 * │                                                                          │
 * │  To approve new/changed baselines after reviewing the report:           │
 * │    node -e "                                                             │
 * │      const {BaselineStore}=require('@testivai/witness/baselines');       │
 * │      const s=new BaselineStore(process.cwd());                           │
 * │      s.listTemp().forEach(n=>s.approve(n));                              │
 * │    "                                                                     │
 * │    Then commit and push the updated .testivai/baselines/ files.          │
 * │                                                                          │
 * │  To switch to the cloud lane instead:                                    │
 * │    export TESTIVAI_API_KEY=<your-key>                                    │
 * │    npm test   →  uses playwright.config.ts                               │
 * └──────────────────────────────────────────────────────────────────────────┘
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
