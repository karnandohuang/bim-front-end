// Karma configuration
// Generated on Sun Dec 23 2018 10:55:50 GMT+0700 (Western Indonesia Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'requirejs' ,'chai', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            'test/assets/js/jquery-3.3.1.min.js',
            {
                pattern: 'assets/js/api/**/*.js',
                included: false
            },
            {
                pattern: 'html/*.html',
                included: false
            },
            'test-main.js',
            'test/test.js',
            {
                pattern: 'test/assets/js/**/**/*.js',
                included: false
            },
        ],


        // list of files / patterns to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'spec'],


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
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        plugins: [
            'karma-chai',
            'karma-chai-sinon',
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-requirejs',
            'karma-sinon',
            'karma-spec-reporter'
        ]

    })
};
