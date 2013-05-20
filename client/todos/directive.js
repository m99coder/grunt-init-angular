
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
    }).
    directive('contenteditable', function() {
      return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
          // view -> model
          elm.bind('blur keyup change', function() {
            scope.$apply(function() {
              ctrl.$setViewValue(elm.html())
            })
          })

          // model -> view
          ctrl.$render = function() {
            elm.html(ctrl.$viewValue)
          }
        }
      }
    })
})
