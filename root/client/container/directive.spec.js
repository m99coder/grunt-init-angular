
'use strict';

define([
  'angularMocks',
  './directive'
], function(mock, module) {
  describe('Module "container/directive"', function () {
    beforeEach(mock.module(module.name))

    it('should be defined.', function () {
      expect(module).toBeDefined()
    })

    it('should have a name.', function () {
      expect(typeof module.name).toEqual('string')
      expect(module.name).toBeTruthy()
    })

    it('should render template corectly.', mock.inject(function ($compile, $rootScope) {
      var element = $compile('<container id="{{id}}"/>')($rootScope)
      $rootScope.$apply()
      expect(element.attr('id')).toContain('container')
    }))
  })
})
