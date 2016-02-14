// Karma configuration
// Generated on Fri Feb 12 2016 10:13:58 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'public/lib/angular/angular.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-route/angular-route.js',
        'public/lib/apSplatter/apSplatter.js',

        'public/app/IntroApp.js',
        'public/app/**/*.js',
        'public/topics/**/*.js',

        'test/mock/IntroAppMock.js',
        'test/mock/**/*.js',
        'test/controllers/**/*.js',
        'test/directives/**/*.js',
        'test/filters/**/*.js',
        'test/services/**/*.js',
        'test/validators/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher'
    ],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
