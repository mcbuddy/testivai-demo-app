# Puppeteer + TestivAI

Visual regression testing with Puppeteer and TestivAI CDP SDK.

## Prerequisites

- Node.js 18+
- Chrome browser
- TestivAI API key

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your API key:
   ```bash
   export TESTIVAI_API_KEY=your-api-key-here
   # or copy .env.example to .env and fill it in
   ```

3. Install TestivAI CDP SDK globally:
   ```bash
   npm install -g @testivai/witness-cdp
   ```

## Run Tests

```bash
npm test
```

This will start the dev server and run the visual regression tests.

## How It Works

The TestivAI CDP SDK injects a `window.testivaiWitness()` function into Chrome via the remote debugging protocol (port 9222). The `witness()` helper in `testivai-witness.js` wraps this call in a Puppeteer-friendly format using `page.evaluate()`.

## Test Cases

- Homepage visual test
- Navigation bar consistency
- Product cards rendering
- Checkout form layout
- Checkout form validation

## CI/CD Example

```yaml
- name: Run Puppeteer Tests
  run: |
    cd examples/javascript/puppeteer
    npm install
    npm test
  env:
    TESTIVAI_API_KEY: ${{ secrets.TESTIVAI_API_KEY }}
```
