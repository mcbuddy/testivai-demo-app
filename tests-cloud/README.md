# Component Showcase Tests

Playwright tests for the Component Showcase app, including visual regression
testing with [TestivAI](https://testiv.ai).

Visual regression runs in **two lanes**. The **OSS lane is the default** — it
needs no account and runs fully offline. The **cloud lane is an optional
upgrade** that adds AI-powered comparison and a team dashboard. Everything you
need for day-to-day visual testing works in the OSS lane alone.

| | OSS lane (default) | Cloud lane (upgrade) |
|---|---|---|
| Command | `npm test` / `npm run test:oss` | `npm run test:cloud` |
| Config | `playwright.oss.config.ts` | `playwright.config.ts` |
| Tests | `tests-oss/` (TS), `tests-py/` (Python) | `tests-cloud/` |
| Account / API key | None | `TESTIVAI_API_KEY` required |
| Pixel diff | ✅ | ✅ |
| DOM diff (render-noise detection) | ✅ | ✅ |
| Report | `visual-report/index.html` | dashboard.testiv.ai |
| Baselines | committed in `.testivai/baselines/` | smart / remote baselines |
| Approval | local store + `/testivai approve` on PR | dashboard.testiv.ai UI |
| REVEAL AI — CSS/layout/semantic 5-layer diff | — | ⭐ |
| Team dashboard, history | — | ⭐ |

---

## OSS lane (default)

No API key or TestivAI account needed — runs fully offline. Baselines live in
`.testivai/baselines/` and are committed to the repo. A report is written to
`visual-report/index.html` after every run.

```bash
npm run test:oss            # run the OSS visual regression suite
npm run test:oss:headed     # same, with a visible browser
```

What you get:

- **Pixel diff** — detects any visual change.
- **DOM diff** — flags render noise when pixels change but the DOM is the same.
- **HTML report** — `visual-report/index.html` (+ `results.json`), uploadable as
  a CI artifact.
- **GitHub Action** `mcbuddy/testivai-oss@v1` — posts a PR diff comment and sets
  a commit status.

### Approving baselines

After reviewing the report, approve new/changed baselines locally:

```bash
node -e "
  const { BaselineStore } = require('@testivai/witness/baselines');
  const s = new BaselineStore(process.cwd());
  s.listTemp().forEach(n => s.approve(n));
"
```

Then commit and push the updated `.testivai/baselines/` files.

On a pull request you can approve straight from a comment — comment
`/testivai approve` and the **OSS Visual Regression** workflow copies the
approved screenshots into `.testivai/baselines/`, commits them to the PR branch,
and re-runs CI. See `.github/workflows/playwright-oss.yml`.

### OSS configuration (`.testivai/config.json`)

```json
{
  "mode": "local",
  "threshold": 0.1,
  "reportDir": "visual-report",
  "autoOpen": false
}
```

- `mode: local` — no cloud calls.
- `threshold: 0.1` — 10% per-pixel difference tolerance.
- Global `ignoreSelectors` (for masking dynamic content) are also read from this
  file — see `tests-oss/ignore-selectors.spec.ts`.

---

## Cloud lane (optional upgrade)

The cloud lane is for teams that want more than pixel + DOM diffing. It requires
a TestivAI account and an API key:

```bash
export TESTIVAI_API_KEY=<your-key>
npm test                    # run the cloud suite (tests/)
npm run test:ui             # interactive UI mode
npm run test:headed         # visible browser
npm run test:debug          # step-through debugging
```

What the cloud adds on top of OSS:

- **REVEAL AI** — 5-layer comparison (pixel, DOM, CSS, layout, and AI), which
  catches CSS/layout/semantic regressions a pixel diff alone cannot.
- **Team dashboard, history, and smart baselines** at dashboard.testiv.ai.
- **Baseline approval workflow** via the dashboard.testiv.ai UI.

Cloud comparison is tuned in `testivai.config.ts` (layout/AI sensitivity,
confidence, performance timings). That file is read by the cloud lane only — the
OSS lane ignores it and uses `.testivai/config.json` instead.

---

## Functional tests

Both lanes also exercise standard Playwright assertions:

- **Component display** — Button, Card, and Alert render correctly.
- **Component variants** — primary/secondary buttons, success/error alerts.
- **Interactive behavior** — button click handling.
- **Responsive design** — layout across viewport sizes.

```bash
npx playwright test component-showcase.spec.ts   # a specific file
npx playwright test --grep "responsive design"   # by title
```

Each lane starts the Vite dev server automatically via Playwright's `webServer`,
so you don't need to run `npm run dev` first.

---

## CI / GitHub Actions

### `ci.yml` — functional tests
Runs on push/PR to `main` and `develop`: installs deps + browsers, builds the
app, runs `npm test`, and uploads the Playwright report.

### `playwright-oss.yml` — OSS visual regression
The live visual-regression workflow:

- **On every PR push** — builds the app, runs `npm run test:oss`, uploads the
  report, and posts a PR comment with the diff summary + commit status.
- **On `/testivai approve` comment** — copies approved screenshots into
  `.testivai/baselines/`, commits them to the PR branch, and re-runs CI.

---

## Test coverage

- ✅ Component rendering and content
- ✅ Component variants and states
- ✅ Interactive functionality
- ✅ Responsive design
- ✅ Visual regression (pixel + DOM) across viewports — OSS lane
- ✅ AI / CSS / layout comparison (REVEAL) — cloud lane
- ✅ Automated CI with GitHub Actions
- ✅ PR-based baseline approval via `/testivai approve`
