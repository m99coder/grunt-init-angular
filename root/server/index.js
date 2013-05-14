
/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

// import

var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000

// configure

app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express['static'](__dirname + '/../www'))

// catch-all

app.all('*', function(req, res) {
  res.sendfile('www/index.html')
})

// bind

app.listen(port)

console.log('{%= name %} listening on port ' + port + '.');
