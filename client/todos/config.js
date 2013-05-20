
'use strict';

define([
  './module'
], function (module) {
  return module.
    config([
      '$routeProvider',
      function ($routeProvider) {
        // Configure routes
        $routeProvider.
          when('/todo', {}).
          when('/todo/:todoId', {})
      }
    ])
})
