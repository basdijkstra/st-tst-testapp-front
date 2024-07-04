// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'pact'],
    plugins: [
      require('karma-jasmine'),
      require('@pact-foundation/karma-pact'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './test-results'),
      subdir: '.',
      reporters: [
        { type: 'cobertura' },
        { type: 'text-summary' }
      ]
    },
    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'karma-junit-results.xml',
      useBrowserName: false
    },
    reporters: ['progress'],
    browsers: ['Chrome'],
    restartOnFileChange: true,
    pact: [
      {
        cors: true,
        spec: 3,
        port: 1234,
        log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pacts')
      }
    ],
    proxies: {
      '/api': 'http://localhost:1234/api'
    }
  });
};
