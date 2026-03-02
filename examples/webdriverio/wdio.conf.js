require('dotenv').config();

exports.config = {
  // Add the service
  services: ['chromedriver'],
  
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      // IMPORTANT: Enable remote debugging on the SAME port
      args: [
        '--remote-debugging-port=9222',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ]
    }
  }],
  
  // Rest of your config...
  runner: 'local',
  specs: [
    './*.test.js'
  ],
  maxInstances: 10,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  reporters: ['spec']
};
