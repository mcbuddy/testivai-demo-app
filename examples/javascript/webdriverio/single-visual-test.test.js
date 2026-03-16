const { expect } = require('chai');
const { $ } = require('@wdio/globals');

describe('Single Visual Test', () => {
  before(async () => {
    await browser.url('http://localhost:5174/');
  });

  it('should capture one visual snapshot', async () => {
    await browser.pause(1000); // Wait for page to load
    await browser.executeScript('return window.testivaiWitness(arguments[0])', ['single-test-snapshot']);
  });
});
