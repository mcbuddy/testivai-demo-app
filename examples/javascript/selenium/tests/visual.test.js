const { Builder, By, until } = require('selenium-webdriver');
const { witness } = require('../testivai-witness');

describe('Visual Regression Tests', () => {
  let driver;

  beforeAll(async () => {
    // Configure Chrome with remote debugging port for TestivAI CDP
    const chromeOptions = {
      'goog:chromeOptions': {
        args: ['--remote-debugging-port=9222', '--headless']
      }
    };
    
    driver = await new Builder()
      .forBrowser('chrome')
      .withCapabilities(chromeOptions)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('homepage loads and looks correct', async () => {
    await driver.get('http://localhost:3000');
    await driver.wait(until.titleContains('TestivAI'), 5000);
    await witness(driver, 'homepage');
  });

  test('navigation bar is consistent', async () => {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.css('nav')), 5000);
    await witness(driver, 'navbar');
  });

  test('product cards render correctly', async () => {
    await driver.get('http://localhost:3000');
    // Scroll to product cards section
    const productSection = await driver.wait(
      until.elementLocated(By.css('.product-cards, [data-testid="product-cards"]')),
      5000
    );
    await driver.executeScript('arguments[0].scrollIntoView(true);', productSection);
    await driver.sleep(500); // Wait for any lazy loading
    await witness(driver, 'product-cards');
  });

  test('checkout form layout', async () => {
    await driver.get('http://localhost:3000/checkout');
    await driver.wait(until.elementLocated(By.css('form')), 5000);
    await witness(driver, 'checkout-form');
  });

  test('checkout form with validation', async () => {
    await driver.get('http://localhost:3000/checkout');
    
    // Fill partial form to trigger validation
    const emailInput = await driver.wait(until.elementLocated(By.css('#email, [name="email"]')), 5000);
    await emailInput.sendKeys('test@');
    
    const submitButton = await driver.findElement(By.css('button[type="submit"], [data-testid="submit"]'));
    await submitButton.click();
    
    // Wait for validation messages
    await driver.sleep(1000);
    await witness(driver, 'checkout-validation');
  });
});
