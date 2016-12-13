# Using the AngularJS + Browserify Project Template to implement a IBM IoTF WebApplication

**Content Overview**

[1. Objective](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication#1-objective-using-browserify)

[2. Used frameworks and runtimes](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication#2-used-frameworks-and-runtimes)

[3. How to setup the sample?](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication#3-how-to-setup-this-sample)

   [3.1 Create a IBM watson service in bluemix and configure the code for a IoT Chart](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication#31-create-a-ibm-watson-service-in-bluemix-and-configure-the-code-ibm-iotfchartjs)

   [3.2 Create a the browserfied app.js file](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication#32-create-browserified-appjs-file)

   [3.3 Run the nodejs application local and on bluemix](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication#33-run-the-webapplication-using-nodejs-local-or-in-nodejs-on-bluemix)

   [3.4 Check the WebApplication](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication#34-check-the-webapplication)

---

## 1. Objective using Browserify

This sample will show how to use the IBMIoTF in Angluar Application running on a Node.JS Server. The WebApplication shows the device information in a chart and the basic payload by the given devices.
Best in using **browserify** is you can **use npm for managing our libraries** also for the web application and **use the require statement** in your _angularjs_ code.

All this is done by using [Browserify](http://browserify.org).

**Here the sample WebApplication in action**
0. Local URL
1. Payload of the IoT devices
2. Chart for the IoT devices

![Running WebApplication](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/running-application-on-local-node-js.png)
---

## 2. Used frameworks and runtimes

1. **Runtime** [As runtime the Node.JS server is used. This sample runs local or on a Bluemix Node.JS Application.](https://console.ng.bluemix.net/catalog/starters/sdk-for-nodejs/?taxonomyNavigation=apps)

2. **IoT Service** [As the IoT Service the IBM Watson IoT in Bluemix is used.](https://console.ng.bluemix.net/catalog/services/internet-of-things-platform/?taxonomyNavigation=apps)

3. **IBM IoT API** [A library for developing device and application clients for IBM Watson IoT Platform](https://www.npmjs.com/package/ibmiotf)

4. **Using browserify to reuse IBMIoTF** [Browserify lets you require('modules') in the browser by bundling up all of your dependencies.](http://browserify.org)

5. **WebApplication Framework** [AngularJS is used as the Framework for the WebApplication.](https://angularjs.org)

6. **Chart Framework** [Chart.js is used as the chart framework in the Application.](http://www.chartjs.org/docs/)

7. **Command line interfaces** Cloud foundry command line interface available [here ](https://github.com/cloudfoundry/cli/releases) and **node and npm** you can find [here ](https://docs.npmjs.com/getting-started/installing-node).

8. **Reuse** This project reused code from following git samples. One Sample is the accompanying blog post can be found at <https://blog.codecentric.de/en/2014/08/angularjs-browserify/> and the source can be found here:
[![Build Status](https://travis-ci.org/basti1302/angular-browserify.png?branch=master)](https://travis-ci.org/angular-browserify/traverson). The other sample is the usage of the IBMIoTF usage in the iotreceiver sample of **Rene Meyer** in the git project which can be found here [iotreceiver](https://github.com/cloud-dach/iotreceiver). For my IoT Device information I use the [Build a connected-car IoT app with Geospatial Analytics](http://www.ibm.com/developerworks/library/mo-connectedcar-app/index.html) sample.

---
## 3. How to setup this sample?

You can download the code from github. Here is a overview of the basic folder structure of the project.

1. **docs** folder does contain images for the readme.md file, bash utilities files and other documentations. **git-commit.sh** does commit to git and you only have to insert your comment. **git-create-version.sh** creates a version in git based on your tag. You will be asked for the version and your comment. **git-setup-rebase.sh** does all needed commands to do a setup and rebase for you. You will be asked for the input **git url **. **init-bash-scripts.sh** does the chmod command for all bash files in the docs folder, to make them executable. **push-and-log.sh**,  **restage-and-log.sh** and **start-sample.sh** here you will be asked for your Bluemix password. You can configure the bash files with:
```sh
    user="YOUR BLUEMIX ID"
    bluemix_api="https://api.YOUR BLUEMIX API"
    organization_name="YOUR BLUEMIX ORGANIZATION"
    space_name="YOUR BLUEMIX SPACE"
    application_name="YOUR BLUEMIX APPLICATION NAME"
```
2. **node_models** This folder contains the npm installation for the Node.JS server, based on the _package.json_ in the project root folder.

3. **public** This folder includes the WebApplication which is running on the Noder.js server.

4. **public/app** contains the angularjs web application files.

5. **public/bin** contains bash utilities files and the ***MOST IMPORTANT*** is the **browserify.sh** file.

6. **public/node_modules** This folder contains the npm installation for the AngluarJS Web Application, based on the _package.json_ in the project **root/public** folder. _NOTE:_ This can be used because of the usage of **browserify**.

_Note:_ **Before you begin.** The steps do only contain the information for a  MAC-OS System. Please install the cloud foundry command line interface available [here ](https://github.com/cloudfoundry/cli/releases) and install **node and npm** the information you can find [here ](https://docs.npmjs.com/getting-started/installing-node).
---
### 3.1 Create a IBM Watson Service in Bluemix and configure the code IBM IoTF/Chart.js

**Create Service and configure service**

[Follow the steps creating IBM Watson IoT in Bluemix](https://console.ng.bluemix.net/catalog/services/internet-of-things-platform/?taxonomyNavigation=apps)

To Configure the service you can follow the steps written in my other sample [3.1.2 Configure the Internet of Things Foundation Service]( https://github.com/thomassuedbroecker/iOSMQTT-Bluemix-IoT-NodeRED#312-configure-the-internet-of-things-foundation-service)

only following the **3.1.2 chapter**.

---
**Configure code**

_Code in 'rootfolder/public/.ibmiotf.json'_

Based on your configuration you have to configure the **rootfolder/public/.ibmiotf.json**.
This file contains all login information which is used by the IBMIoTF library.

```javascript
      {
          "org": "YOUR ORG",
          "id": "YOUR_WEB_APPLICATION_ID", // you can define by yourself here
          "auth-key": "YOUR_KEY_USER_ID",
          "auth-token": "YOUR_TOKEN_USER_PASSWORD",
          "type" : "shared" // do not change
      }
```
---
_Code in rootfolder/public/app/js/controller/iot.js and rootfolder/public/app/js/controller/iotchart.js_

In the WebApplication modules ***rootfolder/public/app/js/controller/iot.js*** and ***rootfolder/public/app/js/controller/iotchart.js*** you have to configure to apply your device type information.
```javascript
     var client = require('ibmiotf');
     var config = require("../../../.ibmiotf.json");
     var deviceType = "YOUR DEVICE TYPE"; // Insert your device type
     console.log(">>> In iot config ", config);
     var appClient = new client.IotfApplication(config);
```
---
In the ***rootfolder/public/app/js/controller/iotchart.js*** you can change the labels to apply to your IoT Information in the chart.
```javascript
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
```

---
In the ***rootfolder/public/app/js/controller/iotchart.js*** fyou can change to apply to your needs, to show the values you want to display, as your IoT Information in the chart. In my case the payload of my device looks like this.

```javascript
    [ {"id":"ABC123-1",
       "name":"Car ABC123-1",
       "lng":"-97.7376805298438",
       "lat":"30.263527112285622",
       "heading":286.4198472192794,
       "speed":30,
       "state":"normal",
       "description":
       "I am a connected car.",
       "type":"car",
       "customProps":{"turnSignal":"OFF"}},
      {"id":"ABC123-2",
        "name":"Car ABC123-2",
        "lng":"-97.73178446575342",
        "lat":"30.279140684931505",
        "heading":242.7800912957763,
        "speed":30,
        "state":"normal",
        "description":"I am a connected car.",
        "type":"car",
        "customProps":{"turnSignal":"OFF"}},
       {"id":"ABC123-3",
        "name":"Car ABC123-3",
        "lng":"-97.73664504675975",
        "lat":"30.266318598139552",
        "heading":-71.94139279914094,
        "speed":30,
        "state":"normal",
        "description":"I am a connected car.",
        "type":"car",
        "customProps":{"turnSignal":"OFF"}
    }]
```
---
I configure the output for the chart in the ***rootfolder/public/app/js/controller/iotchart.js*** file, inside the variable **var updateData = function(oldData,dataList)**
This is defined based on my payload the values, in the chart you can see the value of the 'car **speed**.'

```javascript
      var newDataA = dataList[0].speed; // YOUR PAYLOAD INFORMATION
      var newDataB = dataList[1].speed; // YOUR PAYLOAD INFORMATION
```

---
Getting payload and create json object.
Using **updateData** to format the data for the chart and update with **iotChart.update**.

```javascript
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
```
---

**Simplified 'component dependencies' view of the webapplication**

The image shows a simplified view of the webapplication which is using the _browserified app.js_ file and the content of the _browserified app.js_.
![simplified-overview-of-the-dependencies](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/simplified-overview-of-the-dependencies.png)

---
**Simplified 'sequence get iot data' view of the webapplication**

In the diagram below you see a very simplified view: What happens inside the browserified app.js file?
The blue objects inside are the _iofchart.html_ file and the _iofchart.js_ javascript module. The brown objects do represent the usage of the library **IBMIoTF** and **Chart.js**.

The most **IoT relevant events** are the blue messages. These messages do representing the waiting for the **event connect** and **device event**. Inside these events we register to the devices to a specific type, we defined before and we using to payload of the devices events to show in our html page as simple message or in the chart.

![very-simplified-get-iot-data-sequence](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/very-simplified-get-iot-data-sequence.png)

---
### 3.2 Create Browserified 'app.js' file

To create the browserified **'app.js'** file for the usage in the WebApplication, run the bash file in **rootfolder/public/app/bin/browserify.sh**.
```sh
    rootfolder/public/app/bin$ ./browserify.sh
```
The this bash creates a **not minimized browserifed** in **public/app/dist/app.js**.
You can **debug** the running webapplication like a _normal_ WebApplication, for example in
your chrome browser. See the following picture:

![Debug WebApplication](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/debug-browserifed-application.png)

---
### 3.3 Run the WebApplication using Node.JS local or in Node.JS on Bluemix

If you have done all needed configurations you run the WebApplication,
also by using the bash file **start-sample.sh** the file does all needed tasks:

1. Install the needed **npm installation** for the WebApplication
2. Create the **browserifed app.js** file
3. Push the **node.js application** with the webapplication to bluemix

Here are the

_npm the installations for the nodejs server and the webapplication_

In the **rootfolder/** run the npm installation.
To install all needed npm packages.

```sh
    rootfolder/$ sudo npm install
    Password: *******
```

In the **rootfolder/public** run the npm installation.
To install all needed npm packages.

```sh
    rootfolder/public$ sudo npm install
    Password: *******
```
---

_run the node js server with the WebApplication_
To run the web application local you can start:
```sh
    project rootfolder$ node app.js
    server starting on http://localhost:6001
```
To create the Bluemix appliction you can just run:
```sh
    rootfolder/docs$ ./push-and-log.sh
```

---
Make sure you have configured both following files:

a) The **rootfolder/docs/push-and-log.sh** file.
```sh
    user="YOUR BLUEMIX ID"
    bluemix_api="https://YOUR BLUEMIX API"
    organization_name="YOUR BLUEMIX ORGANIZATION"
    space_name="YOUR BLUEMIX SPACE"
    application_name="YOUR BLUEMIX APPLICATION NAME"
```

b) The **rootfolder/manifest.yml** file.
```sh
    applications:
    - path:
      memory: 256M
      instances: 1
      domain: eu-gb.mybluemix.net
      name: [YOUR APPLICATION NAME]
      host: [YOUR APPLICATION HOST]
      disk_quota: 1024M
```
This will create a the Cloud Foundry application.
![Bluemix nodejs application ](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/bluemix-nodejs-application.png)

_Note:_ Do not forget to run set 3.2 before running the application.

---
### 3.4 Check the WebApplication

You can run following links:
1. Shows the ToDo List sample: https://[YOUR HOST]/ ![Running WebApplication ToDo Sample ](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/todo-sample.png)
2. Shows the Payload of your devices: https://[YOUR HOST]/#!/iot ![Running WebApplication Payload of the Devices](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/device-sample.png)
2. Shows the Payload and the configured chart for your devices: https://[YOUR HOST]/#!/iotchart ![Running WebApplication Payload and Chart of the devices](https://github.com/thomassuedbroecker/browserfied-ibmiotf-webapplication/blob/master/docs/running-application-on-local-node-js.png)
