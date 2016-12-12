'use strict';

require('es5-shim');
require('es5-sham');

require('jquery');
var angular = require('angular');
require('angular-route');

var app = angular.module('todoApp', [ 'ngRoute' ]);

app.constant('VERSION', require('../../package.json').version);

require('./service');
require('./controller');

app.config(function($routeProvider) {

  $routeProvider.when('/todos', {
    templateUrl: 'app/views/todos.html',
    controller: 'TodoCtrl',
  })
  .when('/imprint', {
    templateUrl: 'app/views/imprint.html',
    controller: 'ImprintCtrl',
  })
  // new
  .when('/iot', {
    templateUrl: 'app/views/iot.html',
    controller: 'IotCtrl',
  })
  .when('/iotchart', {
    templateUrl: 'app/views/iotchart.html',
    controller: 'IotchartCtrl',
  })
  .otherwise({
    redirectTo: '/todos',
  });
});
