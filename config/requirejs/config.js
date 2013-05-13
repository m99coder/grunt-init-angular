
/*
 * grunt-init-angular
 * https://github.com/kaheglar/grunt-init-angular
 *
 * Copyright (c) 2013 Stephen Smyth
 * Licensed under the MIT license.
 */

require.config({
  paths: {
    angular: '../../bower_components/angular/angular',
    jquery: '../../bower_components/jquery/jquery',
    underscore: '../../bower_components/underscore/underscore'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
})
