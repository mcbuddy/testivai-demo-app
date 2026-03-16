# Cucumber + Capybara + TestivAI

Visual regression testing with Cucumber, Capybara, and TestivAI CDP SDK.

## Prerequisites

- Ruby 3.0+
- Chrome browser
- TestivAI API key
- Node.js 18+ (for TestivAI CDP SDK)

## Setup

1. Install Ruby dependencies:
   ```bash
   bundle install
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
testivai run "bundle exec cucumber"
```

Or use the run-tests.js script:
```bash
node run-tests.js
```

## How It Works

The TestivAI CDP SDK injects a `window.testivaiWitness()` function into Chrome via the remote debugging protocol (port 9222). The `witness()` helper in `testivai_witness.rb` wraps this call in a Ruby-friendly format using Capybara's `execute_script` method.

## Test Cases

- Homepage visual test
- Navigation bar consistency
- Product cards rendering
- Checkout form layout
- Checkout form validation

## CI/CD Example

```yaml
- name: Run Ruby Cucumber Tests
  run: |
    cd examples/ruby/cucumber-capybara
    bundle install
    testivai run "bundle exec cucumber"
  env:
    TESTIVAI_API_KEY: ${{ secrets.TESTIVAI_API_KEY }}
```
