'use strict';

var tests = Object.keys(window['__karma__'].files).filter(function (file) {
  return (/^\/base\/client\/.*spec\.js$/).test(file)
}).map(function (file) {
  return file.replace(/^\/base\/client\//, '').replace(/\.js$/, '')
})

require.config({
  baseUrl: '/base/client',
  callback: window['__karma__'].start,
  deps: tests,
  paths: {
    angular: '../bower_components/angular/angular',
    angularMocks: '../bower_components/angular-mocks/angular-mocks',
    jquery: '../bower_components/jquery/jquery',
    text: '../bower_components/text/text'
  },
  packages: [
    'application'
  ],
  priority: [
    'angular'
  ],
  shim: {
    angular: {
      exports: 'angular'
    },
    angularMocks: {
      deps: [
        'angular'
      ],
      exports: 'angular.mock'
    }
  }
})
