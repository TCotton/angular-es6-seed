module.exports = function(config) {
  'use strict';

  config.set({

    basePath: './',

    files: [],

    proxies: {
      '/node_modules': '/base/node_modules',
      '/base/jspm_packages': '/base/src/jspm_packages',
    },

    jspm: {
      serveFiles: [],
      loadFiles: [],
    },

    autoWatch: true,

    frameworks: ['jspm', 'jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-jspm',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit',
    }

  });
};