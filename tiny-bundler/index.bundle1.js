(function() {
  var moduleList = [
    function(require, module, exports) {
      // index.js
      // 如果只有简单的 log 那么只需要包裹然后执行就可以了，不包含导入导出
      console.log("moduleA", moduleA);

      // 如果有 module.exports 的时候, 就需要注入 module 对象
      module.exports = "Hello World";
    }
  ];

  var module = { exports: {} }; // 声明一个 module 对象
  // moduleA(null, module); // 1.1-包裹在函数内需要有个名字， 有没有方法不用名字
  moduleList[0](null, module); // 2.2-
})();
