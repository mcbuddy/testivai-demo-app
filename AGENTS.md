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

2. Read `visual-report/results.json` and act on each snapshot. The OSS lane
   runs on three engines, so each capture call appears three times with a
   browser suffix (`oss-buttons__chromium`, `__firefox`, `__webkit`) — a real
   UI change normally shows in all three; a diff in only one engine is
   usually rendering noise specific to that browser.
   - `status: "changed"` with `dom.changed: true` → a real change. Compare
     `dom.summary` (added/removed elements, attribute changes, text changes)
     against what you intended. Unintended → fix your code and re-run.
     Intended → report it to the human with the summary.
   - `status: "changed"` with `dom.noiseHint: true` → likely render noise;
     mention it, don't block. **But** check `dom.styleCheck` first: when
     `styleCheck === "mismatch"` the DOM is identical but computed styles
     changed — this is a real change, not noise; report the elements named
     in `dom.styleChanges.elements`.
   - `regions[]` — each changed snapshot carries clustered regions. Prefer
     reporting `regions[].elements[].selector` (which element changed) over
     raw pixel percentages — it's more actionable.
   - `regions[].classification === "shift"` with `shift: {dx, dy}` → pure
     translation, content unchanged (same size, same style digest, new
     position). Usually intentional layout movement; report as "element X
     shifted by (dx, dy)" rather than a visual regression.
   - `pageShift` → everything below a line moved by the same offset
     (typically an inserted banner or removed heading). Check whether your
     own change added or removed something above that line before treating
     it as a regression.
   - `masks[]` / `maskWarnings[]` → masks applied to the comparison. A
     `maskWarning` means a selector mask could not resolve (stale selector,
     missing element) — the mask was skipped and the warning says why;
     surface it so the exclusion doesn't go unnoticed.
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
