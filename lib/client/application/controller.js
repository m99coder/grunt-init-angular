
'use strict';

//import

var NAME      = require('./consts').NAME
  , uniqueId  = require('underscore').uniqueId

// export

module.exports = function ($scope) {
  $scope.name = NAME
  $scope.id = uniqueId(NAME)
}
