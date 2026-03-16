const { expect } = require('@wdio/globals');

describe('Component Showcase - WebdriverIO', () => {
  before(async () => {
    // Get the server port from environment variable or use default
    const port = process.env.TEST_SERVER_PORT || '5173';
    await browser.url(`http://localhost:${port}/`);
  });

  it('should display the component showcase page', async () => {
    const h1 = await $('h1');
    await expect(h1).toHaveText('🎨 Component Showcase');
    
    const headerP = await $('header p');
    await expect(headerP).toHaveTextContaining('A collection of reusable React components');
  });

  it('should display all component sections', async () => {
    const alertSection = await $('h2=Alert Components');
    await expect(alertSection).toBeDisplayed();
    
    const buttonSection = await $('h2=Button Components');
    await expect(buttonSection).toBeDisplayed();
    
    const cardSection = await $('h2=Card Components');
    await expect(cardSection).toBeDisplayed();
  });

  it('should display alert components with correct variants', async () => {
    const successAlert = await $('.alerts-container .alert--success');
    await expect(successAlert).toExist();
    await expect(successAlert).toHaveText('Your changes have been saved successfully!');
    
    const errorAlert = await $('.alert--error');
    await expect(errorAlert).toExist();
    await expect(errorAlert).toHaveText('There was an error processing your request. Please try again.');
  });

  it('should display button components with correct variants', async () => {
    const primaryButton = await $('.button--primary');
    await expect(primaryButton).toExist();
    await expect(primaryButton).toHaveText('Primary Button');
    
    const secondaryButton = await $('.button--secondary');
    await expect(secondaryButton).toExist();
    await expect(secondaryButton).toHaveText('Secondary Button');
    
    const disabledButton = await $('button:disabled');
    await expect(disabledButton).toExist();
    await expect(disabledButton).toHaveText('Disabled Button');
  });

  it('should display card components', async () => {
    const cards = await $$('.card');
    await expect(cards).toBeElementsArrayOfSize(3);
    
    const firstCard = cards[0];
    const cardTitle = await firstCard.$('.card__title');
    await expect(cardTitle).toHaveText('Beautiful Landscape');
    
    const cardText = await firstCard.$('.card__text');
    await expect(cardText).toHaveTextContaining('Discover breathtaking views');
    
    const cardImages = await firstCard.$$('.card__image');
    await expect(cardImages).toBeElementsArrayOfSize(1);
  });

  it('should have interactive buttons', async () => {
    const primaryButton = await $('.button--primary');
    await primaryButton.click();
    
    // Handle alert
    await browser.acceptAlert();
  });

  it('visual regression - full page screenshot', async () => {
    await browser.pause(1000); // Wait for images to load
    await browser.witness('component-showcase-full-page');
  });

  it('visual regression - header section', async () => {
    await browser.witness('component-showcase-header');
  });

  it('visual regression - alert components', async () => {
    await browser.witness('component-showcase-alerts');
  });

  it('visual regression - button components', async () => {
    await browser.witness('component-showcase-buttons');
  });

  it('visual regression - card components', async () => {
    await browser.pause(1000); // Wait for images to load
    await browser.witness('component-showcase-cards');
  });

  it('responsive design - mobile viewport', async () => {
    await browser.setWindowSize(375, 667);
    await browser.pause(500);
    
    const h1 = await $('h1');
    await expect(h1).toBeDisplayed();
    
    await browser.witness('component-showcase-mobile');
  });

  it('responsive design - tablet viewport', async () => {
    await browser.setWindowSize(768, 1024);
    await browser.pause(500);
    
    await browser.witness('component-showcase-tablet');
  });
});
