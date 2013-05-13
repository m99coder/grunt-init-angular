
'use strict';

describe('Module "application/consts"', function () {
  var consts = require('application/consts')

  it('should be defined.', function () {
    expect(consts).toBeDefined()
  })

  it('should have a NAME.', function () {
    expect(typeof consts.NAME).toEqual('string')
    expect(consts.NAME).toBeTruthy()
  })
})