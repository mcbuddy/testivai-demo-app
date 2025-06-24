# TestivAI Demo App

A React component showcase application demonstrating visual regression testing with TestivAI and Playwright.

## Overview

This project showcases a collection of reusable React components (Button, Card, Alert) with comprehensive testing including visual regression testing using the TestivAI Visual Regression library.

## Features

- **React Components**: Button, Card, and Alert components with multiple variants
- **Component Showcase**: Interactive demo page displaying all components
- **Visual Regression Testing**: Automated visual testing with TestivAI
- **Playwright Testing**: Comprehensive functional and visual tests
- **CI/CD Integration**: GitHub Actions workflows for automated testing
- **PR-based Approvals**: Visual regression approval workflow via PR comments

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd testivai-demo-app

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# Visual regression commands
npm run compare              # Compare screenshots with baselines
npm run update-baselines     # Update baseline images
```

## Project Structure

```
testivai-demo-app/
├── src/
│   ├── components/
│   │   ├── Button/          # Button component
│   │   ├── Card/            # Card component
│   │   └── Alert/           # Alert component
│   ├── App.tsx              # Main application
│   └── App.css              # Application styles
├── tests/
│   ├── component-showcase.spec.ts  # Test suite
│   └── README.md            # Testing documentation
├── .github/
│   └── workflows/
│       ├── ci.yml           # CI workflow
│       └── testivai-approve.yml  # Visual approval workflow
├── playwright.config.ts     # Playwright configuration
└── package.json
```

## Components

### Button Component
- **Variants**: Primary, Secondary
- **States**: Normal, Disabled
- **Props**: `children`, `variant`, `onClick`, and all standard button props

### Card Component
- **Props**: `title`, `text`, `image`, `imageAlt`
- **Features**: Responsive design, hover effects

### Alert Component
- **Variants**: Success, Error
- **Props**: `children`, `status`
- **Features**: Icons, accessible design

## Testing Strategy

### Functional Tests
- Component rendering and content verification
- Component variants and states testing
- Interactive functionality testing
- Responsive design validation

### Visual Regression Tests
- Full page screenshots
- Component section screenshots
- Responsive viewport testing (mobile, tablet, desktop)
- Cross-browser compatibility (Chromium)

## CI/CD Workflows

### Continuous Integration (`.github/workflows/ci.yml`)
Automatically runs on push and pull requests:
- Installs dependencies and browsers
- Builds the application
- Runs all tests including visual regression
- Uploads test artifacts

### Visual Regression Approval (`.github/workflows/testivai-approve.yml`)
Enables PR-based visual regression approvals:
- Triggered by PR comments with approval commands
- Processes visual changes and updates baselines
- Commits approved changes back to PR branch
- Posts visual regression reports

#### Approval Commands:
```bash
# Approve all visual changes
/approve-visuals

# Approve specific files
/approve-visuals component-showcase-header.png

# Reject specific files
/reject-visuals component-showcase-cards.png
```

## Visual Regression Testing

This project uses the [TestivAI Visual Regression](https://github.com/mcbuddy/testivai-visual-regression) library for automated visual testing:

- **Framework**: Playwright integration
- **Baseline Management**: Automated baseline creation and updates
- **Diff Detection**: Pixel-perfect comparison with configurable thresholds
- **Reporting**: Comprehensive visual regression reports
- **CI Integration**: Seamless GitHub Actions integration

### Configuration

Visual regression testing is configured with:
- **Diff Threshold**: 0.1 (10% tolerance)
- **Baseline Directory**: `./tests/visual-regression/baselines`
- **Compare Directory**: `./tests/visual-regression/comparisons`
- **Browser**: Chromium desktop

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

### Visual Changes

When making visual changes:
1. Run tests to generate new screenshots
2. Review visual differences in the test report
3. Use PR approval commands to approve/reject changes
4. The CI will automatically update baselines for approved changes

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Playwright** - End-to-end testing
- **TestivAI Visual Regression** - Visual regression testing
- **GitHub Actions** - CI/CD automation

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [testing documentation](./tests/README.md)
- Review GitHub Actions logs for CI failures
- Open an issue for bugs or feature requests
