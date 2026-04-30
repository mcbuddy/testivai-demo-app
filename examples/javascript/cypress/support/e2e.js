// Add TestivAI witness command
Cypress.Commands.add('witness', (name) => {
  return cy.window().invoke('testivaiWitness', name);
});

// Add custom commands or global setup here
beforeEach(() => {
  // This runs before each test
});
