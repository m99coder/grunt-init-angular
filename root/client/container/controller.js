
'use strict';

define([
  './module'
], function (module) {
  return module.
    controller(module.name + 'Ctrl', [
      '$scope',
      function ($scope) {
        // Set component properties
        $scope.name = module.name
        $scope.id = module.name
      }
    ])
})
