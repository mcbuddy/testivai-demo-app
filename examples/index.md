# TestivAI CDP SDK Examples

This directory contains framework-specific examples for using the TestivAI CDP SDK with various testing frameworks.

## Quick Start

1. **Choose your framework:**
   - [Playwright (TypeScript)](./playwright/) - Original implementation
   - [WebdriverIO (JavaScript)](./webdriverio/)
   - [Selenium (Python)](./selenium-python/)
   - [Cypress (JavaScript)](./cypress/)
   - [RSpec/Capybara (Ruby)](./rspec-capybara/)
   - [Selenium Java (TestNG)](./selenium-java/)
   - [Cucumber Java (BDD)](./cucumber-java/)

2. **Install dependencies** in your chosen framework directory

3. **Set your API key:**
   ```bash
   export TESTIVAI_API_KEY=your-api-key-here
   ```

4. **Run the tests** (make sure the demo app is running with `npm run dev`)

## Framework Comparison

| Framework | Language | Setup Complexity | Performance | Ecosystem |
|-----------|----------|------------------|-------------|-----------|
| Playwright | TypeScript/JS | Easy | Fast | Excellent |
| WebdriverIO | JavaScript | Medium | Fast | Excellent |
| Selenium | Python | Medium | Medium | Excellent |
| Cypress | JavaScript | Easy | Fast | Excellent |
| RSpec/Capybara | Ruby | Medium | Medium | Good |
| Selenium Java | Java | Medium | Medium | Excellent |
| Cucumber Java | Java | Medium | Medium | Excellent |

## Test Coverage

All examples test the same component showcase page with:
- ✅ Component visibility tests
- ✅ Interaction tests
- ✅ Visual regression tests (full page & components)
- ✅ Responsive design tests (mobile & tablet)
- ✅ Multiple screenshot scenarios

## Need Help?

Check the [README.md](./README.md) for detailed setup instructions and troubleshooting tips.
