import { test, expect } from '@playwright/test';
import { testivai } from '@testivai/witness-playwright';

// Get the dynamic port from environment variable
const baseUrl = `http://localhost:${process.env.TEST_SERVER_PORT || 5174}`;

test.describe('Component Showcase - Playwright', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should display the component showcase page', async ({ page }, testInfo) => {
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Component Showcase');
    
    const headerP = page.locator('header p');
    await expect(headerP).toContainText('A collection of reusable React components');
  });

  test('should display all component sections', async ({ page }, testInfo) => {
    const alertSection = page.getByRole('heading', { name: 'Alert Components' });
    await expect(alertSection).toBeVisible();
    
    const buttonSection = page.getByRole('heading', { name: 'Button Components' });
    await expect(buttonSection).toBeVisible();
    
    const cardSection = page.getByRole('heading', { name: 'Card Components' });
    await expect(cardSection).toBeVisible();
  });

  test('should display alert components with correct variants', async ({ page }, testInfo) => {
    const successAlert = page.locator('.alerts-container .alert--success');
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText('Your changes have been saved successfully!');
    
    const errorAlert = page.locator('.alert--error');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('There was an error processing your request');
  });

  test('should display button components with correct variants', async ({ page }, testInfo) => {
    const primaryButton = page.locator('.button--primary').first();
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveText('Primary Button');
    
    const secondaryButton = page.locator('.button--secondary').first();
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton).toHaveText('Secondary Button');
    
    const disabledButton = page.locator('button:disabled');
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toHaveText('Disabled Button');
  });

  test('should display card components', async ({ page }, testInfo) => {
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(3);
    
    const firstCard = cards.first();
    const cardTitle = firstCard.locator('.card__title');
    await expect(cardTitle).toHaveText('Beautiful Landscape');
    
    const cardText = firstCard.locator('.card__text');
    await expect(cardText).toContainText('Discover breathtaking views');
    
    const cardImages = firstCard.locator('.card__image');
    await expect(cardImages).toHaveCount(1);
  });

  test('should have interactive buttons', async ({ page }, testInfo) => {
    const primaryButton = page.locator('.button--primary').first();
    
    // Handle the alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Primary button clicked!');
      await dialog.accept();
    });
    
    await primaryButton.click();
  });

  test('visual regression - full page screenshot', async ({ page }, testInfo) => {
    await page.waitForTimeout(1000); // Wait for images to load
    await testivai.witness(page, testInfo, 'component-showcase-full-page');
  });

  test('visual regression - header section', async ({ page }, testInfo) => {
    await testivai.witness(page, testInfo, 'component-showcase-header');
  });

  test('visual regression - alert components', async ({ page }, testInfo) => {
    await testivai.witness(page, testInfo, 'component-showcase-alerts');
  });

  test('visual regression - button components', async ({ page }, testInfo) => {
    await testivai.witness(page, testInfo, 'component-showcase-buttons');
  });

  test('visual regression - card components', async ({ page }, testInfo) => {
    await page.waitForTimeout(1000); // Wait for images to load
    await testivai.witness(page, testInfo, 'component-showcase-cards');
  });

  test('responsive design - mobile viewport', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    await testivai.witness(page, testInfo, 'component-showcase-mobile');
  });

  test('responsive design - tablet viewport', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    await testivai.witness(page, testInfo, 'component-showcase-tablet');
  });
});
