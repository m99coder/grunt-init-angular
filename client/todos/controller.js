
'use strict';

define([
  './module'
], function (module) {
  return module.
    controller(module.name + 'Ctrl', [
      '$scope',
      '$routeParams',
      function ($scope, $routeParams) {
        // Cache services
        $scope.$routeParams = $routeParams

        // set name & id
        $scope.name = module.name
        $scope.id = module.name

        // description for new todo
        $scope.newTodo = ''

        // list of todos
        $scope.todos = [
          {
            description: 'steve',
            status: 'active'
          },
          {
            description: 'bill',
            status: 'active'
          }
        ]

        // Create a todo
        $scope.addTodo = function () {
          if ($scope.newTodo) {
            $scope.todos.push({
              description: $scope.newTodo,
              status: 'active'
            })
            $scope.newTodo = ''
          }
        }

        // Delete a todo
        $scope.removeTodo = function (todo) {
          $scope.todos.splice($scope.todos.indexOf(todo), 1)
        }

        // Watch for context changes - todoId
        $scope.$watch('$routeParams.todoId', function (value) {
          console.log(value)
        })
      }
    ])
})
