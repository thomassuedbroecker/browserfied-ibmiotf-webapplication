'use strict';

module.exports = function($scope, TodoService) {
  console.log(">>> In module todo");
  $scope.todo = TodoService.getTodos()[0];
};
