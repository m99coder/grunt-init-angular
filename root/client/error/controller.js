
'use strict';

define([
  './module'
], function (module) {
  return module.
    controller(module.name + 'Ctrl', [
      '$scope',
      '$rootScope',
      function ($scope, $rootScope) {
        // Init $rootScope
        $rootScope.error = {}

        // Set component properties
        $scope.name = module.name
        $scope.id = module.name

        // Set error status on error
        $scope.$on('$routeChangeError', function (event, current, previous, rejection) {
          $scope.status = rejection.status
          $scope.message = rejection.message
          $rootScope.error = $rootScope.error || {}
          $rootScope.error.status = rejection.status
          $rootScope.error.message = rejection.message
        })

        // Clear error status on success
        $scope.$on('$routeChangeSuccess', function () {
          $scope.status = null
          $scope.message = null
          $rootScope.error.status = null
          $rootScope.error.message = null
        })
      }
    ])
})
