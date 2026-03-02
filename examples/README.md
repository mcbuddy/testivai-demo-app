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
   npx testivai run "cd examples/webdriverio && npm test"
   ```

## 📁 Directory Structure

```
examples/
├── playwright/           # Playwright (TypeScript)
│   ├── component-showcase.spec.ts
│   └── README.md
├── webdriverio/          # WebdriverIO (JavaScript)
│   ├── component-showcase.test.js
│   ├── wdio.conf.js
│   └── package.json
├── selenium-python/      # Selenium (Python)
│   ├── component_showcase_test.py
│   ├── requirements.txt
│   └── pytest.ini
├── cypress/             # Cypress (JavaScript)
│   ├── e2e/component-showcase.cy.js
│   ├── cypress.config.js
│   ├── support/e2e.js
│   └── package.json
├── rspec-capybara/      # RSpec/Capybara (Ruby)
│   ├── spec/component_showcase_spec.rb
│   ├── spec/spec_helper.rb
│   ├── Gemfile
│   └── .rspec
├── selenium-java/       # Selenium Java (TestNG)
│   ├── src/test/java/com/testivai/ComponentShowcaseTest.java
│   ├── src/test/java/com/testivai/BaseTest.java
│   ├── pom.xml
│   └── testng.xml
└── cucumber-java/       # Cucumber Java (BDD)
    ├── src/test/resources/features/component-showcase.feature
    ├── src/test/java/com/testivai/ComponentShowcaseStepDefs.java
    ├── src/test/java/com/testivai/Hooks.java
    ├── src/test/java/com/testivai/TestRunner.java
    └── pom.xml
```

## Prerequisites

1. Install the TestivAI CDP SDK in the root project:
   ```bash
   npm install @testivai/witness-cdp
   ```

2. Set your TestivAI API key as an environment variable:
   ```bash
   export TESTIVAI_API_KEY=your-api-key-here
   ```

3. Make sure the demo app is running:
   ```bash
   npm run dev
   ```

## Playwright Example

### Setup
```bash
# Playwright tests are already configured in the root project
# Dependencies are already installed
```

### Run Tests
```bash
# From root directory
npm run test:playwright

# Or directly with Playwright
npx playwright test examples/playwright

# UI mode
npm run test:ui

# Headed mode
npm run test:headed
```

### Key Features
- Original implementation using TypeScript
- Native TestivAI Playwright SDK integration
- Full visual regression testing suite
- Parallel test execution
- Built-in waiting mechanisms

## WebdriverIO Example

### Setup
```bash
cd examples/webdriverio
npm install
```

### Run Tests
```bash
# Headless mode
npm test

# Headed mode (visible browser)
npm run test:headed
```

### Key Features
- Uses Mocha assertion library with Chai
- Implements all visual regression tests from the original Playwright suite
- Supports responsive testing (mobile and tablet viewports)
- Full page and component-specific screenshots

## Selenium Python Example

### Setup
```bash
cd examples/selenium-python
pip install -r requirements.txt
```

### Run Tests
```bash
pytest
```

### Key Features
- Uses pytest framework
- Implements all visual regression tests
- Automatic Chrome driver management
- Setup and teardown with fixtures
- Window size manipulation for responsive testing

## Cypress Example

### Setup
```bash
cd examples/cypress
npm install
```

### Run Tests
```bash
# Headless mode
npm test

# Interactive mode
npm run test:open

# Headed mode (visible browser)
npm run test:headed
```

### Key Features
- Modern JavaScript testing framework
- Built-in waiting mechanisms
- Time-travel debugging capability
- Automatic retries and flaky test handling
- Visual regression testing with TestivAI CDP integration

## RSpec/Capybara Example

### Setup
```bash
cd examples/rspec-capybara
bundle install
```

### Run Tests
```bash
# Headless mode (default)
bundle exec rspec

# Headed mode
HEADLESS=false bundle exec rspec

# Specific test file
bundle exec rspec spec/component_showcase_spec.rb
```

### Configuration
- `.rspec` - RSpec configuration
- `spec/spec_helper.rb` - Capybara and TestivAI CDP setup
- `Gemfile` - Ruby dependencies

### Key Features
- Ruby testing with RSpec and Capybara
- Built-in matchers for DOM assertions
- Automatic driver management with webdrivers gem
- TestivAI CDP integration for visual regression

## Selenium Java Example

### Setup
```bash
cd examples/selenium-java
mvn clean install
```

### Run Tests
```bash
# Run all tests
mvn test

# Run with headed browser
mvn test -Dheadless=false

# Run specific test
mvn test -Dtest=ComponentShowcaseTest#testDisplayComponentShowcasePage

# Run with TestNG XML
mvn test -DsuiteFile=testng.xml
```

### Configuration
- `pom.xml` - Maven dependencies and plugins
- `testng.xml` - TestNG suite configuration
- `BaseTest.java` - WebDriver and TestivAI CDP setup
- System properties for API key and build name

### Key Features
- Java testing with TestNG framework
- WebDriverManager for automatic driver management
- AssertJ for fluent assertions
- TestivAI CDP Java SDK integration

## Cucumber Java Example

### Setup
```bash
cd examples/cucumber-java
mvn clean install
```

### Run Tests
```bash
# Run all features
mvn test

# Run with headed browser
mvn test -Dheadless=false

# Run specific feature
mvn test -Dcucumber.options="--name 'Display the component showcase page'"
```

### Configuration
- `pom.xml` - Maven dependencies with Cucumber
- `TestRunner.java` - Cucumber TestNG runner
- `Hooks.java` - Setup and teardown methods
- `.feature` files - Gherkin scenarios

### Key Features
- BDD testing with Cucumber and Gherkin
- Step definitions for reusable test logic
- TestNG integration for parallel execution
- Visual regression testing with TestivAI CDP

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

| Feature | Playwright | WebdriverIO | Selenium Python | Cypress | RSpec/Capybara | Selenium Java | Cucumber Java |
|---------|------------|-------------|-----------------|---------|----------------|---------------|---------------|
| Language | TypeScript/JS | JavaScript | Python | JavaScript | Ruby | Java | Java |
| Setup Time | Fast | Medium | Medium | Fast | Medium | Medium | Medium |
| Auto-Waits | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| Parallel Execution | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ |
| Visual Regression | Native | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK | CDP SDK |
| Debugging | Excellent | Good | Good | Excellent | Good | Good | Good |
| BDD Support | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ |

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
    cd examples/webdriverio
    npm install
    npm test
  env:
    TESTIVAI_API_KEY: ${{ secrets.TESTIVAI_API_KEY }}
```

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure the demo app is running on http://localhost:3000
2. **API Key Error**: Verify TESTIVAI_API_KEY is set correctly
3. **Browser Not Found**: Install browser drivers (handled automatically in most cases)
4. **Timeout Errors**: Increase wait timeouts if tests are failing due to slow loading

### Debug Mode

Most frameworks support a headed mode for debugging:
- Playwright: `npm run test:headed` or `npm run test:ui`
- WebdriverIO: `npm run test:headed`
- Cypress: `npm run test:open` or `npm run test:headed`
- Selenium Python: Remove `--headless` option from Chrome options
- RSpec/Capybara: `HEADLESS=false bundle exec rspec`
- Selenium Java: `mvn test -Dheadless=false`
- Cucumber Java: `mvn test -Dheadless=false`

## Next Steps

1. Choose the framework that best fits your stack
2. Customize the tests for your application
3. Configure TestivAI project settings
4. Set up CI/CD integration
5. Review visual regression results in the TestivAI dashboard
