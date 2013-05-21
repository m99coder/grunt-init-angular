
'use strict';

define([
  'angularMocks',
  './config'
], function(mock, module) {
  describe('Module "container/config"', function () {
    beforeEach(mock.module(module.name))

    it('should be defined.', function () {
      expect(module).toBeDefined()
    })

    it('should have a name.', function () {
      expect(typeof module.name).toEqual('string')
      expect(module.name).toBeTruthy()
    })
  })
})
