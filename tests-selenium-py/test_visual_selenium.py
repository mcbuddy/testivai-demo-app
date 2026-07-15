"""
OSS lane — Selenium (Python bindings) visual smoke tests.

Demonstrates the native Selenium adapter: same `.testivai/` baselines dir,
config (tolerances, stabilize, ignoreSelectors), report, and `/testivai
approve` flow as the Playwright lanes — the adapter contract only cares
about the driver object.

Run:
    pip install "testivai[selenium]"
    BASE_URL=http://localhost:5173 pytest tests-selenium-py/ -q

Selenium Manager fetches the right chromedriver automatically (Selenium
4.6+). The bundled pytest plugin runs `testivai report` at session end.
Full-page capture on Chrome goes through CDP (captureBeyondViewport).
"""

import os

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

from testivai.selenium import witness

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")


@pytest.fixture(scope="module")
def driver():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1280,800")
    options.add_argument("--force-device-scale-factor=1")
    drv = webdriver.Chrome(options=options)
    yield drv
    drv.quit()


def wait_for_text(driver, text, timeout=10):
    WebDriverWait(driver, timeout).until(
        lambda d: text in d.find_element(By.TAG_NAME, "body").text
    )


def test_selenium_py_full_page(driver):
    driver.get(BASE_URL)
    wait_for_text(driver, "Component Showcase")
    witness(driver, "selpy-full-page")


def test_selenium_py_ignore_selectors(driver):
    """Per-call ignore_selectors: the injected dynamic badge is excluded
    from both the pixels and the DOM signal — content changes every run,
    snapshot stays stable."""
    driver.get(BASE_URL)
    wait_for_text(driver, "Component Showcase")
    driver.execute_script(
        "var el = document.createElement('div');"
        "el.className = 'selpy-dynamic-badge';"
        "el.style.cssText = 'position:fixed;top:8px;left:8px;padding:4px 10px;'"
        "  + 'background:#1a1a2e;color:#00d4ff;font-family:monospace;z-index:9999;';"
        "el.textContent = 'selpy-v' + Math.random().toFixed(8);"
        "document.body.appendChild(el);"
    )
    witness(driver, "selpy-ignore-demo", ignore_selectors=[".selpy-dynamic-badge"])
