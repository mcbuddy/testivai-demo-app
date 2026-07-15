"""
OSS lane — Python (playwright-python) visual smoke tests.

Demonstrates the cross-language adapter contract: these captures share the
SAME `.testivai/` baselines, config (tolerances, noiseAutoPass, stabilize),
report, and `/testivai approve` flow as the TS tests in tests-oss/.

Run:
    pip install "testivai[playwright]"
    playwright install chromium
    BASE_URL=http://localhost:5173 pytest tests-py/ -q

The bundled pytest plugin runs `testivai report` automatically at session
end (set TESTIVAI_AUTO_REPORT=0 to skip).
"""

import os

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")


def test_py_full_page(page, testivai_witness):
    page.goto(BASE_URL)
    page.wait_for_selector("text=Component Showcase")
    testivai_witness(page, "py-full-page")


def test_py_buttons(page, testivai_witness):
    page.goto(BASE_URL)
    section = page.locator("section", has=page.get_by_role("heading", name="Button Components"))
    section.wait_for()
    testivai_witness(page, "py-buttons")


def test_py_ignore_selectors(page, testivai_witness):
    """Per-call ignore_selectors: the injected dynamic badge is excluded from
    both the pixels and the DOM signal — content changes every run, snapshot
    stays stable."""
    page.goto(BASE_URL)
    page.wait_for_selector("text=Component Showcase")
    page.evaluate(
        """() => {
            const el = document.createElement('div');
            el.className = 'py-dynamic-badge';
            el.style.cssText = 'position:fixed;top:8px;left:8px;padding:4px 10px;'
              + 'background:#1a1a2e;color:#00d4ff;font-family:monospace;z-index:9999;';
            el.textContent = 'py-v' + Math.random().toFixed(8);
            document.body.appendChild(el);
        }"""
    )
    testivai_witness(page, "py-ignore-demo", ignore_selectors=[".py-dynamic-badge"])
