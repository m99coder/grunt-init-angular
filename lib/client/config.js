
/*
 * grunt-init-angular
 * https://github.com/kaheglar/grunt-init-angular
 *
 * Copyright (c) 2013 kaheglar
 * Licensed under the MIT license.
 */

require.config({
  paths: {
    angular: '../../bower_components/angular/angular',
    jquery: '../../bower_components/jquery/jquery'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
})
