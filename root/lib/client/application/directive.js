
'use strict';

// import

var NAME        = require('./consts').NAME
  , controller  = require('./controller')
  , namespace   = require('namespace')
  , template    = require('text!./template.html')

// define directive

namespace.directive(NAME, function () {
  return {
    controller: controller,
    restrict: 'E,A',
    scope: true,
    template: template
  }
})

// export

module.exports = namespace
