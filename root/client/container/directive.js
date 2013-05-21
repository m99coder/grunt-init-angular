
'use strict';

define([
  './module',
  'text!./template.html'
], function (module, template) {
  return module.
    directive(module.name, function () {
      return {
        controller: module.name + 'Ctrl',
        restrict: 'E,A',
        scope: true,
        template: template
      }
    })
})
