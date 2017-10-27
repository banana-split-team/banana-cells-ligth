// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-middleware
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
module.exports = function(options) {
  return function customHandler(req, res, next) {
    // use options to control handler's behavior
    console.log("PASO POR ACA!!");
    return next;
  };
};
