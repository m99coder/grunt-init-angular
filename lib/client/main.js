
'use strict';

// import

var NAMESPACE = require('namespace').name
  , bootstrap = require('angular').bootstrap
  , ready     = require('jquery')

// bootstrap

ready(function () {
  bootstrap(document, [ NAMESPACE ])
})
