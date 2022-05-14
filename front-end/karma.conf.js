// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'parallel',
      'jasmine',
      '@angular-devkit/build-angular'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-parallel')
    ],
    parallelOptions: {
      executors: (Math.ceil(require('os').cpus().length / 2)),
      shardStrategy: 'round-robin'
    },
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      type : 'cobertura',
      dir : './coverage/'
    },
    remapIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: {
        cobertura: './coverage/cobertura.xml',
      }
    },
    remapCoverageReporter: {
      cobertura: './coverage/cobertura.xml',
     },
    coverageIstanbulReporter: {
      //reports: [ 'html', 'lcovonly' ],
      reports: {
        cobertura: './coverage-tfs/cobertura.xml'
      },
      fixWebpackSourcePaths: true
    },
    customLaunchers: {
      Chrome_with_debugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9222'],
        debug: true
      }
    },

    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'kjhtml', 'coverage-istanbul', 'junit', 'coverage']
      : ['progress', 'kjhtml', 'junit', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false ,
    captureTimeout: 240000,
    browserDisconnectTimeout: 240000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 240000
  });
};
