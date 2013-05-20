
'use strict';

define([
  'angularMocks',
  './controller'
], function(mock, module) {
  describe('Module "container/controller"', function () {
    beforeEach(mock.module(module.name))

    it('should be defined.', function () {
      expect(module).toBeDefined()
    })

    it('should have a name.', function () {
      expect(typeof module.name).toEqual('string')
      expect(module.name).toBeTruthy()
    })

    it('should initialize the scope correctly.', mock.inject(function ($rootScope, $controller) {
      var scope = $rootScope.$new()
      $controller(module.name + 'Ctrl', { $scope: scope })
      expect(scope.name).toEqual(module.name)
    }))
  })
})
