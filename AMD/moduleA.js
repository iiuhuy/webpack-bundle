define(function(require, factory) {
  // 'use strict';
  var m = require("moduleB");
  setTimeout(() => {
    console.log("moduleB", m);
  }, 1000);
});
