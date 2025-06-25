import { test, expect } from '@playwright/test';
import { testivAI, playwrightPlugin } from 'testivai-visual-regression';

test.describe('Component Showcase', () => {
  let vr: testivAI;

  test.beforeAll(async () => {
    // Initialize testivAI with Playwright plugin
    vr = testivAI.init({
      framework: 'playwright',
      baselineDir: './.testivai/visual-regression/baseline',
      compareDir: './.testivai/visual-regression/compare',
      diffThreshold: 0.1
    }).use(playwrightPlugin());
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the component showcase page', async ({ page }) => {
    // Check if the main heading is visible
    await expect(page.locator('h1')).toContainText('Component Showcase');
    
    // Check if the description is visible
    await expect(page.locator('header p')).toContainText('A collection of reusable React components');
  });

  test('should display all component sections', async ({ page }) => {
    // Check Alert Components section
    await expect(page.locator('h2').filter({ hasText: 'Alert Components' })).toBeVisible();
    
    // Check Button Components section
    await expect(page.locator('h2').filter({ hasText: 'Button Components' })).toBeVisible();
    
    // Check Card Components section
    await expect(page.locator('h2').filter({ hasText: 'Card Components' })).toBeVisible();
  });

  test('should display alert components with correct variants', async ({ page }) => {
    // Check success alert
    const successAlert = page.locator('.alert--success');
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText('Your changes have been saved successfully!');
    
    // Check error alert
    const errorAlert = page.locator('.alert--error');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('There was an error processing your request');
  });

  test('should display button components with correct variants', async ({ page }) => {
    // Check primary button
    const primaryButton = page.locator('.button--primary').first();
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toContainText('Primary Button');
    
    // Check secondary button
    const secondaryButton = page.locator('.button--secondary').first();
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton).toContainText('Secondary Button');
    
    // Check disabled button
    const disabledButton = page.locator('button:disabled');
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toContainText('Disabled Button');
  });

  test('should display card components', async ({ page }) => {
    // Check that all three cards are visible
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(3);
    
    // Check first card content
    const firstCard = cards.first();
    await expect(firstCard.locator('.card__title')).toContainText('Beautiful Landscape');
    await expect(firstCard.locator('.card__text')).toContainText('Discover breathtaking views');
    
    // Check that images are loaded
    const cardImages = page.locator('.card__image');
    await expect(cardImages).toHaveCount(3);
    
    // Verify images have loaded by checking their natural width
    for (let i = 0; i < 3; i++) {
      const image = cardImages.nth(i);
      await expect(image).toHaveAttribute('src');
      // Wait for image to load
      await image.waitFor({ state: 'visible' });
    }
  });

  test('should have interactive buttons', async ({ page }) => {
    // Set up dialog handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Primary button clicked!');
      await dialog.accept();
    });
    
    // Click primary button
    const primaryButton = page.locator('.button--primary').first();
    await primaryButton.click();
  });

  test('visual regression - full page screenshot', async ({ page }) => {
    // Wait for all images to load
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot for visual regression
    await vr.capture('component-showcase-full-page', page, {
      fullPage: true
    });
  });

  test('visual regression - header section', async ({ page }) => {
    // Take screenshot of header section
    await vr.capture('component-showcase-header', page, {
      selector: '.app-header'
    });
  });

  test('visual regression - alert components', async ({ page }) => {
    // Take screenshot of alerts section
    await vr.capture('component-showcase-alerts', page, {
      selector: '.alerts-container'
    });
  });

  test('visual regression - button components', async ({ page }) => {
    // Take screenshot of buttons section
    await vr.capture('component-showcase-buttons', page, {
      selector: '.buttons-container'
    });
  });

  test('visual regression - card components', async ({ page }) => {
    // Wait for all card images to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of cards section
    await vr.capture('component-showcase-cards', page, {
      selector: '.cards-container'
    });
  });

  test('responsive design - mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for layout to adjust
    await page.waitForTimeout(500);
    
    // Check that components are still visible and properly arranged
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.alert--success')).toBeVisible();
    await expect(page.locator('.button--primary').first()).toBeVisible();
    await expect(page.locator('.card')).toHaveCount(3);
    
    // Take mobile screenshot for visual regression
    await vr.capture('component-showcase-mobile', page, {
      fullPage: true
    });
  });

  test('responsive design - tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Wait for layout to adjust
    await page.waitForTimeout(500);
    
    // Take tablet screenshot for visual regression
    await vr.capture('component-showcase-tablet', page, {
      fullPage: true
    });
  });
});
