'use strict';

module.exports = function($scope, ImprintService) {
  console.log(">>> In module imprint");
  $scope.text = ImprintService.getText();
};
