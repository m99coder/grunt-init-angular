
'use strict';

define([
  './module'
], function (module) {
  return module.
    config([
      '$routeProvider',
      function ($routeProvider) {
        // Configure routes
        $routeProvider.otherwise({
          resolve: {
            status: [
              '$q',
              function($q) {
                var error = $q.defer()
                error.reject({
                  status: 404,
                  message: 'Page not found!'
                })
                return error.promise
              }
            ]
          }
        })
      }
    ])
})
