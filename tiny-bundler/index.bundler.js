// 想想怎么做？ 如何放到作用域里面去： 放到函数作用域
(function() {
  // 1.将模块包裹在函数内
  // var moduleA = function(require, module, exports) {
  //   console.log("hello bundle");
  //   module.exports = "hello world";
  // };
  // 2.放到数组中，
  var moduleList = [
    function(require, module, exports) {
      console.log("hello bundle");
      module.exports = "hello world -^-^- ";
    }
  ];

  var module = { exports: {} };

  // moduleA(null, module); // 1.1-包裹在函数内需要有个名字， 有没有方法不用名字
  moduleList[0](null, module); // 2.2-
})();
