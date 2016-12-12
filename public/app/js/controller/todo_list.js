'use strict';

module.exports = function($scope, TodoService) {
  console.log(">>> In module todo-list");
  $scope.getTodos = TodoService.getTodos.bind(TodoService);

  $scope.select = function(todo) {
    $scope.$parent.todo = todo;
  };

  $scope.getCssClass = function(todo) {
    if (todo === $scope.$parent.todo) {
      return ['sidebar-item-active'];
    } else {
      return ['sidebar-item-inactive'];
    }
  };

};
