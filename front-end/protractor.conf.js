// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

var basePath = __dirname + '/e2e/';

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',

     // allows different specs to run in parallel.
    // If this is set to be true, specs will be sharded by file
    // (i.e. all files to be run by this set of capabilities will run in parallel).
    // Default is false.
    shardTestFiles: false,

      // Maximum number of browser instances that can run in parallel for this
    // set of capabilities. This is only needed if shardTestFiles is true.
    // Default is 1.
    maxInstances: 3
  },
  directConnect: true,
  baseUrl: 'http://127.0.0.1:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 2500000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: basePath + 'tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
