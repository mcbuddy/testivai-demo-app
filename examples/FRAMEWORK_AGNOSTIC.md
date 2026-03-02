# TestivAI Framework-Agnostic CDP SDK

This document explains how to use the TestivAI CDP SDK with any testing framework using the framework-agnostic approach.

## Overview

The TestivAI CDP SDK works by:
1. Loading the TestivAI script into the browser via `npx testivai run`
2. Using the `window.testivaiWitness()` JavaScript function to capture snapshots
3. Each framework calls this function via `execute_script` or similar methods

## Key Points

- **No SDK dependencies needed** in your test code
- **Universal JavaScript function**: `window.testivaiWitness('snapshot-name')`
- **Run with TestivAI**: Always run your tests with `npx testivai run "your-test-command"`
- **Remote debugging**: Chrome must run with `--remote-debugging-port=9222`

## Framework Examples

### WebdriverIO (JavaScript)

```javascript
// In your test
await browser.executeScript(`return window.testivaiWitness('snapshot-name')`);
```

### Cypress (JavaScript)

```javascript
// In cypress/support/e2e.js
Cypress.Commands.add('witness', (name) => {
  return cy.window().invoke('testivaiWitness', name);
});

// In your test
cy.witness('snapshot-name');
```

### Selenium Python

```python
def witness_snapshot(driver, name):
    driver.execute_script(f"return window.testivaiWitness('{name}')")
```

### RSpec/Capybara (Ruby)

```ruby
# In your test
page.execute_script("return window.testivaiWitness('snapshot-name')")
```

### Selenium Java

```java
protected void witnessSnapshot(String name) {
    if (driver instanceof JavascriptExecutor) {
        ((JavascriptExecutor) driver).executeScript(
            "return window.testivaiWitness('" + name + "')"
        );
    }
}
```

## Running Tests

### 1. Start Your Application
```bash
npm run dev
```

### 2. Set API Key
```bash
export TESTIVAI_API_KEY=tstvai-your-key-here
```

### 3. Run Tests with TestivAI

#### WebdriverIO
```bash
npx testivai run "cd examples/webdriverio && npm test"
```

#### Cypress
```bash
npx testivai run "cd examples/cypress && npm test"
```

#### Selenium Python
```bash
npx testivai run "cd examples/selenium-python && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && pytest"
```

#### RSpec/Capybara
```bash
npx testivai run "cd examples/rspec-capybara && bundle install && bundle exec rspec"
```

#### Selenium Java
```bash
npx testivai run "cd examples/selenium-java && mvn test"
```

#### Cucumber Java
```bash
npx testivai run "cd examples/cucumber-java && mvn test"
```

## Chrome Configuration

All frameworks must configure Chrome with:
- `--remote-debugging-port=9222` (required for CDP connection)
- Standard headless options for CI/CD

## How It Works

1. `npx testivai run`:
   - Launches Chrome with remote debugging
   - Injects the TestivAI script into all pages
   - Connects to the debugging port
   - Runs your test command
   - Collects snapshots after tests complete
   - Uploads to TestivAI dashboard

2. `window.testivaiWitness()`:
   - Captures the current DOM state
   - Takes a screenshot
   - Stores snapshot data for collection
   - Returns a promise that resolves when complete

## Best Practices

1. **Wait for content**: Add delays or waits before snapshots
2. **Descriptive names**: Use clear, unique snapshot names
3. **Consistent viewports**: Set window size before snapshots
4. **Error handling**: Wrap witness calls in try/catch if needed

## Troubleshooting

- "window.testivaiWitness is not defined": Ensure you're running with `npx testivai run`
- Connection refused: Check that remote debugging port is set to 9222
- No snapshots uploaded: Verify API key is set and valid

## Benefits

- **Framework independence**: Works with any browser automation tool
- **No dependencies**: No need to install language-specific SDKs
- **Simple integration**: Just one JavaScript function call
- **Universal**: Same approach works across all languages and frameworks
