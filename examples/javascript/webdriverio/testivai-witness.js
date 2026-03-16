// TestivAI Visual Regression Helper
browser.addCommand('witness', function (name) {
  return this.executeScript('return window.testivaiWitness(arguments[0])', name);
});
