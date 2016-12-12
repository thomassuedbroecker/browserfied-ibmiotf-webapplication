'use strict';

module.exports = function() {

  var text = 'Example app for using AngularJS with Browserify - ' +
    'by Bastian Krol. Use at your own risk :P';
  console.log(">>> In service imprint");

  this.getText = function() {
    return text;
  };
};
