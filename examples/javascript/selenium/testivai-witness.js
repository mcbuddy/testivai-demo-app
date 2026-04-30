/**
 * TestivAI witness helper for Selenium JavaScript
 * Captures a visual snapshot using the CDP SDK
 */
async function witness(driver, name) {
  return driver.executeScript(`return window.testivaiWitness('${name}')`);
}

module.exports = { witness };
