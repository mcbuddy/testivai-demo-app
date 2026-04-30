# Selenium Java + JUnit 5 + TestivAI

Visual regression testing with Selenium, JUnit 5, and TestivAI CDP SDK.

## Prerequisites

- Java 17+
- Maven 3.9+
- Chrome browser
- TestivAI API key
- Node.js 18+ (for TestivAI CDP SDK)

## Setup

1. Install dependencies:
   ```bash
   mvn clean install
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
testivai run "mvn test"
```

Or use the run-tests.js script:
```bash
node run-tests.js
```

## How It Works

The TestivAI CDP SDK injects a `window.testivaiWitness()` function into Chrome via the remote debugging protocol (port 9222). The `TestivAIWitness.witness()` helper wraps this call in a Java-friendly format using `JavascriptExecutor`.

## Test Cases

- Homepage visual test
- Navigation bar consistency
- Product cards rendering
- Checkout form layout
- Checkout form validation

## CI/CD Example

```yaml
- name: Run Java JUnit 5 Tests
  run: |
    cd examples/java/selenium-junit5
    mvn clean install
    testivai run "mvn test"
  env:
    TESTIVAI_API_KEY: ${{ secrets.TESTIVAI_API_KEY }}
```
