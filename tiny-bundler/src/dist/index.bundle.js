(function() {
  var moduleList = [
    function(require, module, exports) {
      console.log("helo bundler index.js");
module.exports = "hello world.0.";

    }
  ];

  var module = { exports: {} };
  moduleList[0](null, module);
})();
