/*
  karma configuration
 */

var path = require('path');

module.exports = function (config) {
  config.set({
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    
    // browsers: ['Chrome','PhantomJS','Firefox'],
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', watched: false},
      { pattern: 'tests.webpack.js', watched: false }
    ],
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    captureTimeout: 60000,
    singleRun: true,
    autoWatch: false,
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'html'],

    htmlReporter: {
      outputFile: 'report/testReport.html',
      // Optional
      pageTitle: 'spanPromise tests',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },

    webpack: {
      cache: true,
      module: {
        loaders: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ],
      },
    },
  });
};