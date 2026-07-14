# TestivAI Demo App

A small React component showcase (Button, Card, Alert) that demonstrates **visual regression testing with [TestivAI](https://testiv.ai) and Playwright** — in both the free open-source lane and the hosted cloud lane.

It runs against the **published** `@testivai/*` npm packages, so it doubles as a living example of how to wire TestivAI into a real project.

> 👀 **[See this project's live visual report →](https://www.budisugianto.com/testivai-demo-app/)** — regenerated from CI on every push to `main`. No install required.

## What this repo demonstrates

TestivAI ships in two lanes that share the same SDK install. This app is configured for **both**, side by side, so you can compare them:

| | OSS lane (free, no account) | Cloud lane (REVEAL AI) |
|---|---|---|
| Run | `npm run test:oss` | `npm test` |
| Playwright config | `playwright.oss.config.ts` | `playwright.config.ts` |
| Tests | `tests-oss/` | `tests/` |
| Settings file | `.testivai/config.json` (`mode: "local"`) | `testivai.config.ts` |
| Baselines | committed in `.testivai/baselines/` | stored in the cloud |
| Comparison | pixel diff + DOM-tree noise hint | 5-layer REVEAL (pixel, DOM, CSS, layout, AI) |
| Output | self-contained `visual-report/index.html` | hosted dashboard at [dashboard.testiv.ai](https://dashboard.testiv.ai) |
| Account / API key | not required (runs fully offline) | requires `TESTIVAI_API_KEY` |

> The OSS lane is the simplest place to start — no signup, everything stays on disk. The cloud lane adds team history, the REVEAL AI counselor, and smart baselines on top of the same captures.

## Quick Start

### Prerequisites

- **Node.js 20+**
- npm

### Install

```bash
git clone https://github.com/mcbuddy/testivai-demo-app.git
cd testivai-demo-app
npm install
npx playwright install chromium
```

### Run the app

```bash
npm run dev        # start the Vite dev server (http://localhost:5173)
npm run build      # production build
npm run preview    # preview the production build
```

## Visual regression — OSS lane (start here)

Fully local. No API key, no account, nothing uploaded.

```bash
npm run test:oss
```

- **First run:** every snapshot is "new" and baselines are written to `.testivai/baselines/`.
- **Later runs:** screenshots are diffed against the committed baselines, and a self-contained report is written to `visual-report/index.html`.
- When pixels change but the DOM is structurally identical, the report flags the diff as **likely render noise** (font hinting, anti-aliasing) instead of a real regression — this is the OSS DOM noise hint.
- This project enables **`noiseAutoPass`** in `.testivai/config.json`, so DOM-identical diffs within 1% auto-pass (labeled `autoPassed` in the report) instead of demanding review. Captures are **stabilized** by default: animations frozen, caret hidden, web fonts awaited.

Baselines live under `.testivai/baselines/<snapshot-name>/` and are committed to the repo — just `git add` them.

### Approving changed baselines

**In CI (on a PR):** the [`playwright-oss.yml`](.github/workflows/playwright-oss.yml) workflow posts a diff report and commit status on every PR. After reviewing the `testivai-visual-report` artifact, a collaborator with write access comments on the PR:

| Comment | Effect |
|---|---|
| `/testivai approve homepage` | Approve one named snapshot |
| `/testivai approve --all` | Approve every changed snapshot at once |

The [`mcbuddy/testivai-oss@v1`](https://github.com/mcbuddy/testivai-oss) action then copies the approved screenshots into `.testivai/baselines/`, commits them back to the PR branch, and CI re-runs — approved snapshots now pass. ✅

**Locally:** after reviewing `visual-report/index.html`, promote the current run's captures to baselines with the CLI:

```bash
npx testivai approve --all        # or: npx testivai approve <snapshot-name>
```

Then commit and push the updated `.testivai/baselines/` files.

## Visual regression — Cloud lane (optional)

Adds the REVEAL AI engine, a hosted dashboard, history, and smart baselines.

1. Sign up at [dashboard.testiv.ai](https://dashboard.testiv.ai) (free) and create a project to get an API key.
2. Export it and run the cloud lane:

```bash
export TESTIVAI_API_KEY=<your-key>
npm test
```

Cloud behavior is tuned in `testivai.config.ts` (layout/AI sensitivity, performance capture). Results appear in the hosted dashboard.

## Project Structure

```
testivai-demo-app/
├── src/
│   └── components/
│       ├── Button/            # Primary / Secondary, normal / disabled
│       ├── Card/              # title, text, image, hover effects
│       └── Alert/             # Success / Error variants
├── tests/                     # CLOUD lane specs (REVEAL AI)
├── tests-oss/                 # OSS lane specs (local pixel + DOM diff)
│   ├── oss-smoke.spec.ts
│   └── ignore-selectors.spec.ts
├── .testivai/
│   ├── config.json            # OSS lane settings (mode: local, threshold)
│   └── baselines/             # committed reference screenshots + DOM
├── playwright.config.ts       # CLOUD lane Playwright config
├── playwright.oss.config.ts   # OSS lane Playwright config
├── testivai.config.ts         # CLOUD lane comparison settings
└── .github/workflows/
    └── playwright-oss.yml      # OSS visual regression + /testivai approve
```

## All scripts

```bash
npm run dev            # start dev server
npm run build          # type-check + production build
npm run preview        # preview production build
npm run lint           # eslint

npm test               # CLOUD lane visual regression (needs TESTIVAI_API_KEY)
npm run test:ui        # cloud lane, Playwright UI mode
npm run test:headed    # cloud lane, headed browser
npm run test:debug     # cloud lane, debug mode

npm run test:oss        # OSS lane visual regression (no account)
npm run test:oss:headed # OSS lane, headed browser
```

## Learn more

- **TestivAI OSS SDKs & docs:** [github.com/mcbuddy/testivai-oss](https://github.com/mcbuddy/testivai-oss)
- **npm package:** [`@testivai/witness-playwright`](https://www.npmjs.com/package/@testivai/witness-playwright)
- **Hosted service:** [testiv.ai](https://testiv.ai)

## Technologies Used

- **React 19** + **TypeScript** + **Vite** — the demo UI
- **Playwright** — browser automation & screenshot capture
- **@testivai/witness-playwright** — visual regression (OSS + cloud)
- **GitHub Actions** — CI + PR-based baseline approvals

## License

MIT.
