# Component Showcase Tests

This directory contains Playwright tests for the Component Showcase application, including visual regression testing using the testivAI Visual Regression library.

## Test Structure

### Functional Tests
- **Component Display Tests**: Verify that all components (Button, Card, Alert) are properly displayed
- **Component Variants Tests**: Test different variants of each component (primary/secondary buttons, success/error alerts)
- **Interactive Tests**: Test button click functionality
- **Responsive Design Tests**: Test layout on different viewport sizes

### Visual Regression Tests
- **Full Page Screenshots**: Capture complete page layouts
- **Component Section Screenshots**: Individual screenshots of each component section
- **Responsive Screenshots**: Visual tests for mobile and tablet viewports

## Running Tests

### Prerequisites
Make sure the development server is running or configure the `webServer` in `playwright.config.ts`.

### Test Commands

```bash
# Run all tests
npm test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# Run specific test file
npx playwright test component-showcase.spec.ts

# Run only visual regression tests
npx playwright test --grep "visual regression"

# Run only responsive design tests
npx playwright test --grep "responsive design"

# Visual regression specific commands
npm run compare              # Compare current screenshots with baselines
npm run update-baselines     # Update baseline images with current screenshots
```

## Visual Regression Testing

The tests use the `testivai-visual-regression` library to perform visual regression testing. Screenshots are stored in:

- **Baselines**: `./tests/visual-regression/baselines/` - Reference images
- **Comparisons**: `./tests/visual-regression/comparisons/` - Current test images
- **Diffs**: Generated automatically when differences are detected

### First Run
On the first run, baseline images will be created. Subsequent runs will compare against these baselines.

### Updating Baselines
If visual changes are intentional, you can update the baselines by running tests with the update flag or manually replacing the baseline images.

## Test Configuration

The tests are configured in `playwright.config.ts` with:
- Chromium desktop browser support
- Automatic dev server startup
- HTML reporting
- Trace collection on failures

## Visual Regression Configuration

The testivAI configuration includes:
- **Framework**: Playwright
- **Diff Threshold**: 0.1 (10% difference tolerance)
- **Baseline Directory**: `./tests/visual-regression/baselines`
- **Compare Directory**: `./tests/visual-regression/comparisons`

## GitHub Actions CI/CD

### CI Workflow (`.github/workflows/ci.yml`)
Automatically runs on push and pull requests to `main` and `develop` branches:
- Installs dependencies and Playwright browsers
- Builds the application
- Runs all Playwright tests including visual regression
- Uploads test reports and visual regression artifacts

### Visual Regression Approval Workflow (`.github/workflows/testivai-approve.yml`)
Allows approving/rejecting visual changes directly from PR comments:
- Triggered by PR comments containing `/approve-visuals` or `/reject-visuals`
- Processes approvals and updates baseline images
- Commits changes back to the PR branch
- Posts visual regression reports to PR comments

#### Approval Commands:
```bash
# Approve all visual changes
/approve-visuals

# Approve specific files
/approve-visuals login.png header.png

# Reject specific files
/reject-visuals settings.png
```

## Test Coverage

The test suite covers:
- ✅ Component rendering and content
- ✅ Component variants and states
- ✅ Interactive functionality
- ✅ Responsive design
- ✅ Visual regression across different viewports
- ✅ Cross-browser compatibility
- ✅ Automated CI/CD with GitHub Actions
- ✅ PR-based visual regression approval workflow
