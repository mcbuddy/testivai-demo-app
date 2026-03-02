# TestivAI Framework Examples - Execution Checklist

## Prerequisites Checklist ✅

- [ ] Demo app is running: `npm run dev` (http://localhost:3000)
- [ ] TESTIVAI_API_KEY environment variable is set:
  ```bash
  export TESTIVAI_API_KEY=your-api-key-here
  ```
- [ ] Node.js (for JavaScript frameworks)
- [ ] Python 3.8+ (for Selenium Python)
- [ ] Ruby 2.7+ (for RSpec/Capybara)
- [ ] Java 11+ (for Selenium Java and Cucumber Java)
- [ ] Maven 3.6+ (for Java projects)

---

## 1. Playwright (TypeScript/JavaScript) ✅ COMPLETED
### Status: ✅ Working - Already configured in root project
### Tests Run: [Date: ________]
### Result: ________
### Notes: ________

---

## 2. WebdriverIO (JavaScript) 📁 - IN PROGRESS

### Setup:
```bash
cd examples/webdriverio
npm install
```

### Execution Steps:
```bash
# Run without TestivAI (for debugging)
npm test

# Run with TestivAI
npx testivai run "npm test"
```

### Expected Results:
- [ ] 13 test cases should pass
- [ ] Test output shows "Successfully uploaded X snapshots"
- [ ] Visual regression results in TestivAI dashboard

### Progress:
- [ ] Dependencies installed
- [ ] Tests executed successfully
- [ ] All test cases pass
- [ ] Visual regression screenshots uploaded

### Issues Found:
- ________

---

## 3. Selenium Python 📁

### Setup:
```bash
cd examples/selenium-python
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Execution Steps:
```bash
# Run without TestivAI (for debugging)
pytest

# Run with TestivAI
npx testivai run "pytest"
```

### Progress:
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] Tests executed successfully
- [ ] All test cases pass
- [ ] Visual regression screenshots uploaded

---

## 4. Cypress (JavaScript) 📁

### Setup:
```bash
cd examples/cypress
npm install
```

### Execution Steps:
```bash
# Run without TestivAI (for debugging)
npm test

# Run with TestivAI
npx testivai run "npm test"
```

### Progress:
- [ ] Dependencies installed
- [ ] Cypress installed
- [ ] Tests executed successfully
- [ ] All test cases pass
- [ ] Visual regression screenshots uploaded

---

## 5. RSpec/Capybara (Ruby) 📁

### Setup:
```bash
cd examples/rspec-capybara
bundle install
```

### Execution Steps:
```bash
# Run without TestivAI (for debugging)
bundle exec rspec

# Run with TestivAI
npx testivai run "bundle exec rspec"
```

### Progress:
- [ ] Ruby gems installed
- [ ] Tests executed successfully
- [ ] All test cases pass
- [ ] Visual regression screenshots uploaded

---

## 6. Selenium Java (TestNG) 📁

### Setup:
```bash
cd examples/selenium-java
mvn clean install
```

### Execution Steps:
```bash
# Run without TestivAI (for debugging)
mvn test

# Run with TestivAI
npx testivai run "mvn test"
```

### Progress:
- [ ] Maven dependencies installed
- [ ] Tests executed successfully
- [ ] All test cases pass
- [ ] Visual regression screenshots uploaded

---

## 7. Cucumber Java (BDD) 📁

### Setup:
```bash
cd examples/cucumber-java
mvn clean install
```

### Execution Steps:
```bash
# Run without TestivAI (for debugging)
mvn test

# Run with TestivAI
npx testivai run "mvn test"
```

### Progress:
- [ ] Maven dependencies installed
- [ ] Features executed successfully
- [ ] All scenarios pass
- [ ] Visual regression screenshots uploaded

---

## Summary Progress Tracker

| Framework | Language | Status | Date Completed | Notes |
|-----------|----------|--------|---------------|-------|
| Playwright | TypeScript/JS | ✅ | | |
| WebdriverIO | JavaScript | 🔄 | | |
| Selenium Python | Python | ⏳ | | |
| Cypress | JavaScript | ⏳ | | |
| RSpec/Capybara | Ruby | ⏳ | | |
| Selenium Java | Java | ⏳ | | |
| Cucumber Java | Java | ⏳ | | |

---

## Quick Run Commands

```bash
# Playwright
npm run test:playwright

# WebdriverIO
npx testivai run "cd examples/webdriverio && npm test"

# Selenium Python
npx testivai run "cd examples/selenium-python && pytest"

# Cypress
npx testivai run "cd examples/cypress && npm test"

# RSpec/Capybara
npx testivai run "cd examples/rspec-capybara && bundle exec rspec"

# Selenium Java
npx testivai run "cd examples/selenium-java && mvn test"

# Cucumber Java
npx testivai run "cd examples/cucumber-java && mvn test"
```

---

## Framework-Agnostic Implementation

All frameworks (except Playwright) use the framework-agnostic approach:

1. **No SDK dependencies** - Just call `window.testivaiWitness()`
2. **Chrome remote debugging** - Required on port 9222
3. **Run with TestivAI** - Use `npx testivai run "your-command"`

For detailed implementation guide, see [FRAMEWORK_AGNOSTIC.md](FRAMEWORK_AGNOSTIC.md)
