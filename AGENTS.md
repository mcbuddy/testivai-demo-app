# Agent instructions — testivai-demo-app

This app demonstrates TestivAI visual regression testing. If you (an AI
agent) change any UI code here, verify your work visually before reporting
done.

## Visual verification

After changing any UI code (`src/**`, `index.html`, styles):

1. Run the OSS-lane visual tests:

   ```bash
   npm run test:oss
   ```

2. Read `visual-report/results.json` and act on each snapshot:
   - `status: "changed"` with `dom.changed: true` → a real change. Compare
     `dom.summary` (added/removed elements, attribute changes, text changes)
     against what you intended. Unintended → fix your code and re-run.
     Intended → report it to the human with the summary.
   - `status: "changed"` with `dom.noiseHint: true` → likely render noise;
     mention it, don't block.
   - `status: "new"` → tell the human new baselines need approving.

3. **Never run `testivai approve` yourself** — baseline approval is a human
   decision. Suggest `npx testivai approve <name>` locally or a
   `/testivai approve` comment on the PR.

If the `@testivai/mcp` server is connected, prefer its tools:
`get_visual_results` for verdicts and `get_snapshot_diff <name>` to *see*
the baseline/current/diff images before judging your own change.

Dynamic content that should never count as a diff belongs in
`ignoreSelectors` in `.testivai/config.json` — it is excluded from both the
pixel diff and the DOM/text signal.

Full guide: https://github.com/mcbuddy/testivai-oss/blob/main/docs/guides/ai-agents.md
