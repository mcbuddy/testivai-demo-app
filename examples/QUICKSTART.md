# Quick Start Guide - Running TestivAI Framework Examples

## 🚀 Quick Start (Recommended)

### 1. Start the Demo App
```bash
npm run dev
```

### 2. Set Your API Key
```bash
export TESTIVAI_API_KEY=your-api-key-here
```

### 3. Run with Progress Tracking (Interactive Mode)
```bash
cd examples
./run-with-progress.sh
```

This will:
- Run each framework one by one
- Pause between frameworks for you to review
- Track progress automatically
- Show a summary at the end

---

## 📋 Framework Execution Order

The frameworks are organized in this order:

1. **Playwright** (TypeScript/JS) - Already configured
2. **WebdriverIO** (JavaScript)
3. **Selenium Python** (Python)
4. **Cypress** (JavaScript)
5. **RSpec/Capybara** (Ruby)
6. **Selenium Java** (Java)
7. **Cucumber Java** (Java)

---

## 🛠️ Manual Execution

If you prefer to run frameworks manually:

### Playwright
```bash
npm run test:playwright
```

### WebdriverIO
```bash
cd examples/webdriverio && npm install && npm test
```

### Selenium Python
```bash
cd examples/selenium-python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pytest
```

### Cypress
```bash
cd examples/cypress && npm install && npm test
```

### RSpec/Capybara
```bash
cd examples/rspec-capybara && bundle install && bundle exec rspec
```

### Selenium Java
```bash
cd examples/selenium-java && mvn test
```

### Cucumber Java
```bash
cd examples/cucumber-java && mvn test
```

---

## 📊 Progress Tracking Commands

### View Current Progress
```bash
./track-progress.sh show
```

### Mark Framework as Completed
```bash
./track-progress.sh complete playwright
```

### Mark Framework as Failed
```bash
./track-progress.sh fail selenium "Driver issue"
```

### Reset All Progress
```bash
./track-progress.sh reset
```

---

## 🎯 Running Modes

### Interactive Mode (Default)
- Prompts before each framework
- Can skip frameworks
- Can stop on failure

### Auto Mode
```bash
./run-with-progress.sh --auto
```
- Runs all frameworks without prompts
- Continues even if one fails

### Reset and Run
```bash
./run-with-progress.sh --reset
```
- Clears previous progress
- Runs in interactive mode

### Auto Mode with Reset
```bash
./run-with-progress.sh --auto --reset
```
- Clears progress
- Runs all automatically

---

## ✅ Success Checklist

After each framework run, verify:

1. **Tests Pass**: All test cases execute without errors
2. **Screenshots Uploaded**: Check console output for "Successfully uploaded X snapshots"
3. **Dashboard Update**: Log into TestivAI dashboard to see visual regression results

---

## 🐛 Common Issues & Solutions

### Port 3000 in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart the app
npm run dev
```

### API Key Issues
```bash
# Verify API key is set
echo $TESTIVAI_API_KEY
# If empty, set it again
export TESTIVAI_API_KEY=your-api-key-here
```

### Python Virtual Environment
```bash
# If activation fails
cd examples/selenium-python
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Java/Maven Issues
```bash
# Check Java version
java -version
# Check Maven
mvn -version
# Set JAVA_HOME if needed
export JAVA_HOME=/path/to/java
```

### Ruby/Bundler Issues
```bash
# Install bundler if missing
gem install bundler
# Clear gem cache if needed
bundle clean --force
bundle install
```

---

## 📈 Monitoring Progress

The progress tracker creates a `progress.txt` file with the current status. You can view it anytime:

```bash
cat examples/progress.txt
```

Or use the formatted view:
```bash
./track-progress.sh show
```

---

## 🎉 Completion

After running all frameworks:
1. Check the final progress report
2. Log into your TestivAI dashboard
3. Review visual regression results
4. Note any framework-specific issues for future reference

---

## 📞 Need Help?

- Check the full documentation in `examples/README.md`
- Review the detailed checklist in `examples/checklist.md`
- Each framework folder has specific setup instructions
