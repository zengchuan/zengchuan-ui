// An example configuration file.
exports.config = {
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar', // Make use you check the version in the folder
    //seleniumPort:4455,
    //directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  //specs: ['test/e2e/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
