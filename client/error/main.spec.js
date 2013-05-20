
'use strict';

define([
  './main'
], function(module) {
  describe('Module "error/main"', function () {
    it('should be defined.', function () {
      expect(module).toBeDefined()
    })

    it('should have a name.', function () {
      expect(typeof module.name).toEqual('string')
      expect(module.name).toBeTruthy()
    })
  })
})
