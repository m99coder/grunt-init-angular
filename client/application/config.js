
'use strict';

define([
  './module'
], function (module) {
  return module.
    config([
      '$locationProvider',
      '$routeProvider',
      function ($locationProvider, $routeProvider) {
        // Enable the History API
        $locationProvider.html5Mode(true)

        // Configure routes
        $routeProvider.when('/', {})
      }
    ])
})
