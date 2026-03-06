require('dotenv').config();

// Get the server port from environment variable or default to 5174
const serverPort = process.env.TEST_SERVER_PORT || '5174';

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
    './*.test.cjs'
  ],
  maxInstances: 10,
  logLevel: 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  reporters: ['spec'],
  
  // Add hooks to set the base URL
  before: async () => {
    // Set the base URL for all tests
    browser.options.baseUrl = `http://localhost:${serverPort}`;
  }
};
