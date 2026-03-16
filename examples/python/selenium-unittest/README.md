# Selenium Python + unittest + TestivAI

Visual regression testing with Selenium, Python unittest, and TestivAI CDP SDK.

## Prerequisites

- Python 3.9+
- Chrome browser
- TestivAI API key
- Node.js 18+ (for TestivAI CDP SDK)

## Setup

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
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
testivai run "python -m unittest discover tests/ -v"
```

Or use the run-tests.js script:
```bash
node run-tests.js
```

## How It Works

The TestivAI CDP SDK injects a `window.testivaiWitness()` function into Chrome via the remote debugging protocol (port 9222). The `witness()` helper in `testivai_witness.py` wraps this call in a Selenium-friendly format using `driver.execute_script()`.

## Test Cases

- Homepage visual test
- Navigation bar consistency
- Product cards rendering
- Checkout form layout
- Checkout form validation

## CI/CD Example

```yaml
- name: Run Python unittest Tests
  run: |
    cd examples/python/selenium-unittest
    pip install -r requirements.txt
    testivai run "python -m unittest discover tests/ -v"
  env:
    TESTIVAI_API_KEY: ${{ secrets.TESTIVAI_API_KEY }}
```
