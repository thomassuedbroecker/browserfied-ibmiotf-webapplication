/*eslint-env node*/

//------------------------------------------------------------------------------
// Based on the node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// A library for developing device and application clients for IBM Internet of Things Foundation
// Fore more https://www.npmjs.com/package/ibmiotf
var IoTClient = require('ibmiotf');
// https://github.com/substack/node-browserify#usage
// Used to build a IBM IoTF for loading into a browser
// The iotf-client-bundle.js  was created be using: example: browserify main.js > bundle.js

// CORS is a node.js package for providing a Connect/Express
// middleware that can be used to enable CORS with various options.
// For more see https://www.npmjs.com/package/cors
var cors = require('cors');

// To use the HTTP server and client one must require('http').
// For more see https://nodejs.org/api/http.html#http_http
var http = require('http');
var https = require('https');

// This does not handle multipart bodies,
// due to their complex and typically large nature.
// For multipart bodies, you may be interested in the following modules:
// - busboy and connect-busboy
// - multiparty and connect-multiparty
// - formidable
// - multer
// For more see https://www.npmjs.com/package/body-parser-json
var bodyParser = require('body-parser');

// This middleware is only intended to be used in a development environment,
// as the full error stack traces and internal details of any object passed
// to this module will be sent back to the client when an error occurs.
// For more see: https://github.com/expressjs/errorhandler
var errorHandler = require('errorhandler');

// HTTP request logger middleware for node.js.#
// Create a new morgan logger middleware function using the given format
// and options. The format argument may be a string of a predefined name
// (see below for the names), a string of a format string, or a function that
// will produce a log entry.
// For more see https://www.npmjs.com/package/morgan#morganformat-options
var morgan = require('morgan');             // log requests to the console (express4)


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
// serve the files out of /public/libs/bower_components as our lib files
// app.use(express.static(__dirname + '/public/lib/bower_components'));
// Simple app that will log all request in the Apache combined format to STDOUT
app.use(morgan('combined'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json
app.use(bodyParser.json());

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log(">>> server starting on " + appEnv.url);
});

// provide the index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});
