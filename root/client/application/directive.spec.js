
'use strict';

define([
  'angularMocks',
  './directive',
  'text!./template.html'
], function(mock, module, template) {
  describe('Module "application/directive"', function () {
    beforeEach(mock.module(module.name))

    it('should be defined.', function () {
      expect(module).toBeDefined()
    })

    it('should have a name.', function () {
      expect(typeof module.name).toEqual('string')
      expect(module.name).toBeTruthy()
    })

    it('should insert template content correctly.', mock.inject(function ($compile, $rootScope) {
      var element = $compile('<application/>')($rootScope)
      expect(element.html()).toEqual(template)
    }))

    it('should render template corectly.', mock.inject(function ($compile, $rootScope) {
      var element = $compile('<application/>')($rootScope)
      $rootScope.$apply()
      expect(element.html()).toContain('id="application"')
    }))
  })
})
