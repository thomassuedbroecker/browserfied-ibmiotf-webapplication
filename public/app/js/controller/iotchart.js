'use strict';

module.exports = function($scope) {
  console.log(">>> In module iot");
  var count = 0;
  $scope.payload = {};
  // Chart related
  var ctx = document.getElementById('iotChart').getContext('2d');

  // IoT related
  var client = require('ibmiotf');
  var config = require("../../../.ibmiotf.json");
  var deviceType = "YOUR DEVICE TYPE"; // Insert your device type
  console.log(">>> In iot config ", config);
  var appClient = new client.IotfApplication(config);

  console.log(">>> In ctx ", ctx);
  var Chart = require('chart.js');
  console.log(">>> Charts Variable ", Chart);
  var chartCount = 10;
  var dataList = {};
  var optionsNoAnimation = {animation : false};
  var chartData = {
       labels   : ["1","2","3","4","5", "6", "7", "8", "9", "10"],
       datasets : [
           {
               label: "YOUR VALUE", // YOUR VALUE
               fill: false,
               fillColor : "rgba(220,220,220,0.5)",
               strokeColor : "rgba(220,220,220,1)",
               pointColor : "rgba(220,220,220,1)",
               pointStrokeColor : "#fff",
               data : [0,0,0,0,0,0,0,0,0,0]
           },
           {
               label: "YOUR VALUE", // YOUR VALUE
               fill: false,
               fillColor : "rgba(151,187,205,0.5)",
               strokeColor : "rgba(151,187,205,1)",
               pointColor : "rgba(151,187,205,1)",
               pointStrokeColor : "#fff",
               data : [0,0,0,0,0,0,0,0,0,0]
           }
       ]
  };

  var chartOptions = { title: {
                        display: true,
                        text: 'IoT Chart'
                     }};

  var chartType    = 'line';
  var iotChart = Chart.Line(ctx,{data: chartData, options: chartOptions});

  console.log(">>> Charts iotChart : ", iotChart);
  var updateData = function(oldData,dataList){
     console.log(">>> oldData: ", oldData);
     var labels = oldData["labels"];
     console.log(">>> oldData: ", labels);
     var dataSetA = oldData["datasets"][0]["data"];
     var dataSetB = oldData["datasets"][1]["data"];

     labels.shift();
     chartCount++;
     labels.push(chartCount.toString());
     var newDataA = dataList[0].speed; // YOUR PAYLOAD INFORMATION
     var newDataB = dataList[1].speed; // YOUR PAYLOAD INFORMATION

     dataSetA.push(newDataA);
     dataSetB.push(newDataB);
     dataSetA.shift();
     dataSetB.shift();

     // Set new data as old data
     oldData["datasets"][0]["data"] = dataSetA;
     oldData["datasets"][1]["data"] = dataSetB;
     console.log(">>> dataSetA  ", dataSetA );
     console.log(">>> dataSetB  ", dataSetB );
  };


  appClient.connect();

  appClient.on("connect", function () {
      console.log("Connected");
      appClient.subscribeToDeviceEvents(deviceType);
  });

  appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
      //console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
      $scope.payload = payload;       // Getting payload from IoT
      count = count + 1;
      console.log(">>> Event count : ",count );
      var dataList = JSON.parse(payload); // Create json object
      console.log(">>> Datalist  : ", dataList);
      updateData(chartData, dataList); // using updateData to format the data for the chart
      iotChart.update(chartData);      // update the chart
      $scope.$apply();
  });
};
