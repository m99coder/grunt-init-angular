
'use strict';

define([
  'angular',
  'application'
], function (angular, module) {
  angular.element(document).ready(function () {
    angular.bootstrap(document, [ module.name ])
  })
})