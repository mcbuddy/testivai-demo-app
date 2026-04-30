# TestivAI Framework Examples

This directory contains example implementations of TestivAI visual regression testing across multiple web automation frameworks.

## 🚀 Quick Start

All examples use the **TestivAI Framework-Agnostic CDP SDK** - no language-specific dependencies required!

1. Start the demo app:
   ```bash
   npm run dev
   ```

2. Set your API key:
   ```bash
   export TESTIVAI_API_KEY=tstvai-your-key-here
   ```

3. Run any framework with TestivAI:
   ```bash
   cd examples/javascript/webdriverio
   ./run_testivai_webdriverio.sh
   ```

## 📁 Directory Structure

```
examples/
├── javascript/           # JavaScript examples
│   ├── cypress/          # Cypress with TestivAI
│   ├── webdriverio/      # WebdriverIO with TestivAI
│   ├── playwright/       # Playwright with TestivAI
│   ├── selenium/         # Selenium JavaScript + Jest
│   └── puppeteer/        # Puppeteer with Jest
├── python/               # Python examples
│   ├── selenium-pytest/  # Selenium + pytest
│   ├── selenium-unittest/ # Selenium + unittest
│   └── robot-framework/  # Robot Framework
├── java/                 # Java examples
│   ├── selenium-junit5/  # Selenium + JUnit 5
│   ├── selenium-testng/  # Selenium + TestNG
│   └── cucumber-java/    # Cucumber Java (BDD)
└── ruby/                 # Ruby examples
    ├── rspec-capybara/   # RSpec + Capybara
    └── cucumber-capybara/ # Cucumber Ruby (BDD)
```

## Prerequisites

1. Install the TestivAI CDP SDK globally:
   ```bash
   npm install -g @testivai/witness-cdp
   ```

2. Set your TestivAI API key as an environment variable:
   ```bash
   export TESTIVAI_API_KEY=your-api-key-here
   ```

3. Make sure the demo app is running:
   ```bash
   npm run dev
   ```

## JavaScript Examples

### Cypress
```bash
cd examples/javascript/cypress
npm install
./run_testivai_cypress.sh
```

### WebdriverIO
```bash
cd examples/javascript/webdriverio
npm install
./run_testivai_webdriverio.sh
# OR use the original: node run-tests.js
```

### Playwright
```bash
cd examples/javascript/playwright
npm install
./run_testivai_playwright.sh
```

### Selenium JavaScript
```bash
cd examples/javascript/selenium
npm install
./run_testivai_selenium_js.sh
```

### Puppeteer
```bash
cd examples/javascript/puppeteer
npm install
./run_testivai_puppeteer.sh
```

## Python Examples

### Selenium + pytest
```bash
cd examples/python/selenium-pytest
pip install -r requirements.txt
./run_testivai_python_pytest.sh
```

### Selenium + unittest
```bash
cd examples/python/selenium-unittest
pip install -r requirements.txt
./run_testivai_python_unittest.sh
```

### Robot Framework
```bash
cd examples/python/robot-framework
pip install -r requirements.txt
./run_testivai_robot_framework.sh
```

## Java Examples

### Selenium + JUnit 5
```bash
cd examples/java/selenium-junit5
mvn clean install
./run_testivai_java_junit5.sh
```

### Selenium + TestNG
```bash
cd examples/java/selenium-testng
mvn clean install
./run_testivai_java_testng.sh
```

### Cucumber Java
```bash
cd examples/java/cucumber-java
mvn clean install
./run_testivai_java_cucumber.sh
```

## Ruby Examples

### RSpec + Capybara
```bash
cd examples/ruby/rspec-capybara
bundle install
./run_testivai_ruby_rspec.sh
```

### Cucumber + Capybara
```bash
cd examples/ruby/cucumber-capybara
bundle install
./run_testivai_ruby_cucumber.sh
```

## Test Coverage

All framework implementations include the following test cases:

1. **Page Display Tests**
   - Verify main heading and description
   - Check all component sections are visible

2. **Component Tests**
   - Alert components (success, error variants)
   - Button components (primary, secondary, disabled)
   - Card components with images

3. **Interaction Tests**
   - Button click handling
   - Alert dialog management

4. **Visual Regression Tests**
   - Full page screenshot
   - Header section
   - Alert components
   - Button components
   - Card components

5. **Responsive Design Tests**
   - Mobile viewport (375x667)
   - Tablet viewport (768x1024)

## Framework Comparison

| Feature | Cypress | WebDriverIO | Playwright | Selenium JS | Puppeteer | Python pytest | Python unittest | Robot | Java JUnit 5 | Java TestNG | Java Cucumber | Ruby RSpec | Ruby Cucumber |
|---------|---------|-------------|------------|-------------|-----------|---------------|-----------------|-------|--------------|-------------|---------------|------------|---------------|
| Language | JavaScript | JavaScript | TypeScript | JavaScript | JavaScript | Python | Python | Python | Java | Java | Java | Ruby | Ruby |
| Setup Time | Fast | Medium | Fast | Medium | Medium | Medium | Medium | Medium | Medium | Medium | Medium | Medium | Medium |
| Auto-Waits | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Parallel Execution | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Visual Regression | CDP SDK | CDP SDK | Native | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK |
| Debugging | Excellent | Good | Excellent | Good | Good | Good | Good | Good | Good | Good | Good | Good | Good |
| BDD Support | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ |

## Running Tests in CI

All examples are designed to work in CI/CD environments. Make sure to:

1. Set the TESTIVAI_API_KEY environment variable
2. Install the required dependencies
3. Start the application before running tests
4. Use headless mode for CI environments

Example GitHub Actions workflow:
```yaml
- name: Run WebdriverIO Tests
  run: |
    cd examples/javascript/webdriverio
    npm install
    ./run_testivai_webdriverio.sh
  env:
    TESTIVAI_API_KEY: ${{ secrets.TESTIVAI_API_KEY }}
```

## How It Works

The TestivAI CDP SDK injects a `window.testivaiWitness()` function into Chrome via the remote debugging protocol (port 9222). Each framework's helper file wraps this call in a framework-idiomatic way:

- **JavaScript frameworks** - executeScript / evaluate wrapper
- **Python** - driver.execute_script() wrapper
- **Java** - JavascriptExecutor wrapper
- **Ruby** - execute_script wrapper
- **Cypress** - native cy.window().invoke() custom command
- **Robot Framework** - Execute Javascript keyword wrapper

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure the demo app is running on http://localhost:3000
2. **API Key Error**: Verify TESTIVAI_API_KEY is set correctly
3. **Browser Not Found**: Install browser drivers (handled automatically in most cases)
4. **Timeout Errors**: Increase wait timeouts if tests are failing due to slow loading

### Debug Mode

Most frameworks support a headed mode for debugging:
- Cypress: `npm run test:open` or `npm run test:headed`
- WebdriverIO: `npm run test:headed`
- Playwright: `npm run test:headed` or `npm run test:ui`
- Selenium JavaScript: Remove `--headless` option from Chrome options
- Puppeteer: Remove `--headless` option from Chrome options
- Python pytest: Remove `--headless` option from Chrome options
- Python unittest: Remove `--headless` option from Chrome options
- Robot Framework: Remove `--headless` option from Chrome options
- Java: Run with `-Dheadless=false`
- Ruby RSpec: `HEADLESS=false bundle exec rspec`
- Ruby Cucumber: `HEADLESS=false bundle exec cucumber`

## Next Steps

1. Choose the framework that best fits your stack
2. Customize the tests for your application
3. Configure TestivAI project settings
4. Set up CI/CD integration
5. Review visual regression results in the TestivAI dashboard
