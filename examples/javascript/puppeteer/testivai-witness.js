/**
 * TestivAI witness helper for Puppeteer
 * Captures a visual snapshot using the CDP SDK
 */
async function witness(page, name) {
  return page.evaluate((n) => window.testivaiWitness(n), name);
}

module.exports = { witness };
