import unittest
import sys
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testivai_witness import witness


class VisualRegressionTest(unittest.TestCase):
    """TestivAI visual regression tests using Python unittest."""

    driver = None

    @classmethod
    def setUpClass(cls):
        """Set up Chrome driver with remote debugging for TestivAI."""
        chrome_options = Options()
        chrome_options.add_argument("--remote-debugging-port=9222")
        chrome_options.add_argument("--headless")
        
        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        """Clean up driver."""
        if cls.driver:
            cls.driver.quit()

    def test_homepage(self):
        """Test homepage visual appearance."""
        self.driver.get("http://localhost:3000")
        WebDriverWait(self.driver, 10).until(
            EC.title_contains("TestivAI")
        )
        witness(self.driver, "homepage")

    def test_navbar(self):
        """Test navigation bar consistency."""
        self.driver.get("http://localhost:3000")
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "nav"))
        )
        witness(self.driver, "navbar")

    def test_product_cards(self):
        """Test product cards rendering."""
        self.driver.get("http://localhost:3000")
        
        # Scroll to product cards
        product_section = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".product-cards, [data-testid='product-cards']"))
        )
        self.driver.execute_script("arguments[0].scrollIntoView(true);", product_section)
        
        # Wait for any lazy loading
        import time
        time.sleep(0.5)
        
        witness(self.driver, "product-cards")

    def test_checkout_form(self):
        """Test checkout form layout."""
        self.driver.get("http://localhost:3000/checkout")
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "form"))
        )
        witness(self.driver, "checkout-form")

    def test_checkout_validation(self):
        """Test checkout form validation."""
        self.driver.get("http://localhost:3000/checkout")
        
        # Fill partial form to trigger validation
        email_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "#email, [name='email']"))
        )
        email_input.send_keys("test@")
        
        # Submit form
        submit_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit'], [data-testid='submit']")
        submit_button.click()
        
        # Wait for validation messages
        time.sleep(1)
        
        witness(self.driver, "checkout-validation")


if __name__ == "__main__":
    unittest.main()
