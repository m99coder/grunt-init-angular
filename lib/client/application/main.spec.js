
'use strict';

describe('Module "application"', function () {
  var application = require('application')

  it('should be defined.', function () {
    expect(application).toBeDefined()
  })

  it('should have a name.', function () {
    expect(typeof application.name).toEqual('string')
    expect(application.name).toBeTruthy()
  })
})