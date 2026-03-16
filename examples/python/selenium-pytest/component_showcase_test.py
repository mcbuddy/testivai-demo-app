import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time


def witness_snapshot(driver, name):
    """Take a TestivAI snapshot using the framework-agnostic approach"""
    driver.execute_script(f"return window.testivaiWitness('{name}')")


class TestComponentShowcase:
    
    @pytest.fixture(autouse=True)
    def setup(self):
        # Setup Chrome with remote debugging
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--remote-debugging-port=9222")
        
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        self.driver.get("http://localhost:3000")
        self.driver.implicitly_wait(10)
        
        yield
        
        self.driver.quit()
    
    def test_display_component_showcase_page(self):
        h1 = self.driver.find_element(By.TAG_NAME, "h1")
        assert "Component Showcase" in h1.text
        
        header_p = self.driver.find_element(By.CSS_SELECTOR, "header p")
        assert "A collection of reusable React components" in header_p.text
    
    def test_display_all_component_sections(self):
        alert_section = self.wait.until(EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Alert Components')]")))
        assert alert_section.is_displayed()
        
        button_section = self.driver.find_element(By.XPATH, "//h2[contains(text(), 'Button Components')]")
        assert button_section.is_displayed()
        
        card_section = self.driver.find_element(By.XPATH, "//h2[contains(text(), 'Card Components')]")
        assert card_section.is_displayed()
    
    def test_display_alert_components(self):
        success_alert = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".alerts-container .alert--success")))
        assert success_alert.is_displayed()
        assert "Your changes have been saved successfully!" in success_alert.text
        
        error_alert = self.driver.find_element(By.CSS_SELECTOR, ".alert--error")
        assert error_alert.is_displayed()
        assert "There was an error processing your request" in error_alert.text
    
    def test_display_button_components(self):
        primary_button = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".button--primary")))
        assert primary_button.is_displayed()
        assert "Primary Button" in primary_button.text
        
        secondary_button = self.driver.find_element(By.CSS_SELECTOR, ".button--secondary")
        assert secondary_button.is_displayed()
        assert "Secondary Button" in secondary_button.text
        
        disabled_button = self.driver.find_element(By.CSS_SELECTOR, "button:disabled")
        assert disabled_button.is_displayed()
        assert "Disabled Button" in disabled_button.text
    
    def test_display_card_components(self):
        cards = self.wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".card")))
        assert len(cards) == 3
        
        first_card = cards[0]
        card_title = first_card.find_element(By.CSS_SELECTOR, ".card__title")
        assert "Beautiful Landscape" in card_title.text
        
        card_text = first_card.find_element(By.CSS_SELECTOR, ".card__text")
        assert "Discover breathtaking views" in card_text.text
        
        card_images = self.driver.find_elements(By.CSS_SELECTOR, ".card__image")
        assert len(card_images) == 3
    
    def test_interactive_buttons(self):
        primary_button = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".button--primary")))
        primary_button.click()
        
        # Handle alert if it appears
        try:
            self.driver.switch_to.alert.accept()
        except:
            pass
    
    def test_visual_regression_full_page(self):
        time.sleep(1)  # Wait for images to load
        witness_snapshot(self.driver, "component-showcase-full-page")
    
    def test_visual_regression_header(self):
        witness_snapshot(self.driver, "component-showcase-header")
    
    def test_visual_regression_alerts(self):
        witness_snapshot(self.driver, "component-showcase-alerts")
    
    def test_visual_regression_buttons(self):
        witness_snapshot(self.driver, "component-showcase-buttons")
    
    def test_visual_regression_cards(self):
        time.sleep(1)  # Wait for images to load
        witness_snapshot(self.driver, "component-showcase-cards")
    
    def test_responsive_mobile(self):
        self.driver.set_window_size(375, 667)
        time.sleep(0.5)
        
        h1 = self.driver.find_element(By.TAG_NAME, "h1")
        assert h1.is_displayed()
        
        witness_snapshot(self.driver, "component-showcase-mobile")
    
    def test_responsive_tablet(self):
        self.driver.set_window_size(768, 1024)
        time.sleep(0.5)
        
        witness_snapshot(self.driver, "component-showcase-tablet")
