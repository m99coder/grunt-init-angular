
'use strict';

define([
  './module'
], function(module) {
  describe('Module "todos/module"', function () {
    it('should be defined.', function () {
      expect(module).toBeDefined()
    })

    it('should have a name.', function () {
      expect(module.name).toEqual('todos')
    })
  })
})
