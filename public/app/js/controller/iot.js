'use strict';

module.exports = function($scope) {
  console.log(">>> In module iot");
  $scope.payload = {};
  
  // IoT related
  var client = require('ibmiotf');
  var config = require("../../../.ibmiotf.json");
  var deviceType = "YOUR DEVICE TYPE"; // Insert your device type
  console.log(">>> In iot config ", config);
  var appClient = new client.IotfApplication(config);

  appClient.connect();

  appClient.on("connect", function () {
          console.log("Connected");
          appClient.subscribeToDeviceEvents(deviceType);
  });

  appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
      console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
      $scope.payload = payload;
      $scope.$apply();
  });
};
