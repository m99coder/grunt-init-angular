
'use strict';

// import

var NAME        = require('./consts').NAME
  , controller  = require('./controller')
  , namespace   = require('namespace')
  , template    = require('text!./template.html')

// export

module.exports = namespace.directive(NAME, function () {
  return {
    controller: controller,
    restrict: 'E',
    scope: true,
    template: template,
    transclude: true
  }
})
