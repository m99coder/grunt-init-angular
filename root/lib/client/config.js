
/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
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
