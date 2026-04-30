const puppeteer = require('puppeteer');
const { witness } = require('../testivai-witness');

describe('Visual Regression Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Launch browser with remote debugging port for TestivAI CDP
    browser = await puppeteer.launch({
      args: ['--remote-debugging-port=9222', '--headless']
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('homepage loads and looks correct', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('title');
    await witness(page, 'homepage');
  });

  test('navigation bar is consistent', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav');
    await witness(page, 'navbar');
  });

  test('product cards render correctly', async () => {
    await page.goto('http://localhost:3000');
    
    // Scroll to product cards section
    await page.waitForSelector('.product-cards, [data-testid="product-cards"]');
    await page.evaluate(() => {
      const element = document.querySelector('.product-cards, [data-testid="product-cards"]');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    // Wait for any lazy loading
    await page.waitForTimeout(500);
    await witness(page, 'product-cards');
  });

  test('checkout form layout', async () => {
    await page.goto('http://localhost:3000/checkout');
    await page.waitForSelector('form');
    await witness(page, 'checkout-form');
  });

  test('checkout form with validation', async () => {
    await page.goto('http://localhost:3000/checkout');
    
    // Fill partial form to trigger validation
    await page.waitForSelector('#email, [name="email"]');
    await page.type('#email, [name="email"]', 'test@');
    
    await page.click('button[type="submit"], [data-testid="submit"]');
    
    // Wait for validation messages
    await page.waitForTimeout(1000);
    await witness(page, 'checkout-validation');
  });
});
