
'use strict';

describe('Module "application/controller"', function () {
  var NAME        = require('application/consts').NAME
    , NAMEPACE    = require('namespace/consts').NAME
    , controller  = require('application/controller')
    , inject      = require('angular').mock.inject
    , module      = require('angular').mock.module

  beforeEach(module(NAMEPACE))

  it('should be defined.', function () {
    expect(controller).toBeDefined()
  })

  it('should be a function.', function () {
    expect(typeof controller).toEqual('function')
  })

  it('should initialize the scope correctly.', inject(function ($rootScope, $controller) {
    var scope = $rootScope.$new()

    $controller(controller, { $scope: scope })

    expect(scope.name).toEqual(NAME)
    expect(scope.id).toContain(NAME)
  }))
})