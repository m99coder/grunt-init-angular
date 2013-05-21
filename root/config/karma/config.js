
/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

basePath = '../../'

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  { pattern: 'bower_components/**/*.js', included: false },
  { pattern: 'client/*/*', included: false },
  'client/main-test.js'
]

// list of files to exclude
exclude = []

// test results reporter to use
// possible values: dots || progress
reporter = 'progress'

// web server port
port = 8080

// cli runner port
runnerPort = 9100

// enable / disable colors in the output (reporters and logs)
colors = true

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ['PhantomJS']

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false

reporters = ['dots']
