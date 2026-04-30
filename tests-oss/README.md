# OSS Lane — testivai-demo-app

This directory contains a dedicated test lane that validates the **open-source TestivAI SDKs** end-to-end against this real consumer app.

It runs in **local mode**: no API key required, no cloud upload, all artifacts on disk.

## Source of Packages

The `@testivai/witness-playwright` and `@testivai/witness` packages used here come from [`testivai-oss`](https://github.com/testivai/testivai-oss).

## Running Locally (with linked workspace)

```bash
# 1. Build the OSS packages in testivai-oss
cd ../testivai-oss
pnpm install && pnpm build

# 2. Link them into the demo app
cd ../testivai-demo-app
npm link ../testivai-oss/packages/witness
npm link ../testivai-oss/packages/playwright

# 3. Run the OSS lane
npm run test:oss
```

## Running Against Published Packages (post-release)

```bash
npm install -D @testivai/witness-playwright@latest
npm run test:oss
```

## What Gets Produced

- `.testivai/baselines/<name>/` — committed baseline screenshots
- `.testivai/temp/<name>/` — gitignored temp screenshots from the latest run
- `visual-report/index.html` — self-contained HTML report
- `visual-report/results.json` — machine-readable results

## Configuration

Local mode is configured by `.testivai/config.json` (root of this repo). Threshold, report directory, and auto-open behavior live there.

## Why a Separate Lane?

The default `tests/` directory (currently empty) and `examples/javascript/playwright/` are reserved for the existing demo workflows. This lane is **OSS-only** and serves as the canonical real-world consumer test for the public packages.
