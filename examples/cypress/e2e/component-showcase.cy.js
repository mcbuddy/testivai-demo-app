describe('Component Showcase - Cypress', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the component showcase page', () => {
    cy.get('h1').should('contain.text', 'Component Showcase');
    cy.get('header p').should('contain.text', 'A collection of reusable React components');
  });

  it('should display all component sections', () => {
    cy.get('h2').contains('Alert Components').should('be.visible');
    cy.get('h2').contains('Button Components').should('be.visible');
    cy.get('h2').contains('Card Components').should('be.visible');
  });

  it('should display alert components with correct variants', () => {
    cy.get('.alerts-container .alert--success')
      .should('be.visible')
      .and('contain.text', 'Your changes have been saved successfully!');
    
    cy.get('.alert--error')
      .should('be.visible')
      .and('contain.text', 'There was an error processing your request');
  });

  it('should display button components with correct variants', () => {
    cy.get('.button--primary')
      .first()
      .should('be.visible')
      .and('contain.text', 'Primary Button');
    
    cy.get('.button--secondary')
      .first()
      .should('be.visible')
      .and('contain.text', 'Secondary Button');
    
    cy.get('button:disabled')
      .should('be.visible')
      .and('contain.text', 'Disabled Button');
  });

  it('should display card components', () => {
    cy.get('.card').should('have.length', 3);
    
    cy.get('.card').first().within(() => {
      cy.get('.card__title').should('contain.text', 'Beautiful Landscape');
      cy.get('.card__text').should('contain.text', 'Discover breathtaking views');
      cy.get('.card__image').should('be.visible');
    });
  });

  it('should have interactive buttons', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Button clicked!');
    });
    
    cy.get('.button--primary').click();
  });

  it('visual regression - full page screenshot', () => {
    cy.wait(1000); // Wait for images to load
    cy.witness('component-showcase-full-page');
  });

  it('visual regression - header section', () => {
    cy.witness('component-showcase-header');
  });

  it('visual regression - alert components', () => {
    cy.witness('component-showcase-alerts');
  });

  it('visual regression - button components', () => {
    cy.witness('component-showcase-buttons');
  });

  it('visual regression - card components', () => {
    cy.wait(1000); // Wait for images to load
    cy.witness('component-showcase-cards');
  });

  it('responsive design - mobile viewport', () => {
    cy.viewport(375, 667);
    cy.wait(500);
    
    cy.get('h1').should('be.visible');
    cy.witness('component-showcase-mobile');
  });

  it('responsive design - tablet viewport', () => {
    cy.viewport(768, 1024);
    cy.wait(500);
    
    cy.witness('component-showcase-tablet');
  });
});
