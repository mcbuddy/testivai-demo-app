# Playwright Example - TestivAI Visual Regression Testing

This example demonstrates how to use TestivAI with Playwright for visual regression testing using `@testivai/witness-playwright` v0.3.3.

## Status

✅ **Snapshot Capture**: Working perfectly - all `testivai.witness()` calls successfully capture:
- DOM structure (HTML)
- Computed styles (CSS JSON)
- Screenshots (PNG)
- Layout metadata (JSON)

✅ **Reporter Upload**: Fixed in v0.3.3 - snapshots are now automatically uploaded to TestivAI server when TESTIVAI_API_KEY is configured.

## Prerequisites

- Node.js 18+
- TestivAI API key from [TestivAI Dashboard](https://dashboard.testiv.ai)

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing framework
- `@testivai/witness-playwright` - TestivAI Playwright SDK

### 2. Install Playwright Browsers

```bash
npx playwright install chromium
```

### 3. Configure Environment

Create a `.env` file in this directory with your TestivAI API key:

```env
TESTIVAI_API_KEY=your-api-key-here
TEST_SERVER_PORT=5174
```

Or export it in your shell:

```bash
export TESTIVAI_API_KEY=your-api-key-here
```

## Running Tests

### Run all tests

```bash
npm test
```

All tests pass successfully and snapshots are captured to `.testivai/temp/` directory.

### View Captured Snapshots

After running tests, check the captured snapshots:

```bash
ls -lh .testivai/temp/
```

Each `testivai.witness()` call creates 4 files:
- `{timestamp}_{name}.png` - Screenshot
- `{timestamp}_{name}.html` - DOM structure  
- `{timestamp}_{name}.css.json` - Computed styles
- `{timestamp}_{name}.json` - Metadata

### Run tests in UI mode

```bash
npm run test:ui
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### Debug tests

```bash
npm run test:debug
```

## How It Works

Unlike other frameworks, Playwright uses a **dedicated SDK** (`@testivai/witness-playwright`) and does **not** use the CDP sidecar approach.

### Key Points:

1. **No `testivai run` wrapper needed** - Run tests directly with `npx playwright test`
2. **No CDP configuration** - Playwright integrates directly with its built-in browser control
3. **Use `testivai.witness(page, testInfo, 'name')`** - Capture visual snapshots in your tests

### Example Test

```javascript
import { test } from '@playwright/test';
import { testivai } from '@testivai/witness-playwright';

test('homepage looks correct', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000');
  await testivai.witness(page, testInfo, 'homepage');
});
```

## Configuration

The `playwright.config.js` includes the TestivAI reporter:

```javascript
reporter: [
  ['list'],
  ['@testivai/witness-playwright/reporter']
]
```

## CI/CD and GitHub Integration

The project is already configured for GitHub Actions with TestivAI integration. The CI workflow (`.github/workflows/ci.yml`) will:
- Run Playwright tests with the TestivAI API key
- Upload test results and artifacts
- Post commit statuses and PR comments (when configured)

### GitHub Integration Setup

To enable commit statuses and PR comments on visual test results:

#### 1. Create GitHub Personal Access Token (PAT)

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens?type=beta)
2. Click "Generate new token"
3. Name: `TestivAI Visual Tests`
4. Repository permissions:
   - Commit statuses: Read and write
   - Pull requests: Read and write
5. Generate and copy the token

#### 2. Configure TestivAI Dashboard

1. Go to [dashboard.testiv.ai](https://dashboard.testiv.ai)
2. Navigate to your project
3. Find the GitHub Integration card
4. Enter:
   - Repository: `owner/repo-name`
   - GitHub PAT: paste your token
5. Save and test connection

#### 3. Add GitHub Secret

1. In your GitHub repo, go to Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `TESTIVAI_API_KEY`
4. Value: Your TestivAI project API key

#### Example GitHub Actions Workflow

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium

- name: Run visual tests
  run: npx playwright test
  env:
    TESTIVAI_API_KEY: ${{ secrets.TESTIVAI_API_KEY }}
```

## What Gets Captured

Each `testivai.witness()` call captures a 5-layer snapshot including:
- DOM structure
- Computed styles
- Layout information
- Visual rendering
- Interactive states

## Documentation

For more information, visit: https://testiv.ai/docs/frameworks/playwright
