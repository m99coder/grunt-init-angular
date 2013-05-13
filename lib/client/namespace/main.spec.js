
'use strict';

describe('Module "namespace"', function () {
  var NAME      = require('namespace/consts').NAME
    , namespace = require('namespace')

  it('should be defined.', function () {
    expect(namespace).toBeDefined()
  })

  it('should have a the correct name.', function () {
    expect(namespace.name).toEqual(NAME)
  })
})