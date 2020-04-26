// 想想怎么做？ 如何放到作用域里面去： 放到函数作用域
(function() {
  var moduleList = [
    function(require, module, exports) {
      // index.js
      const moduleA = require("./moduleA");
      console.log("moduleA", moduleA);
    },
    function(require, module, exports) {
      // moduleA.js
      module.exports = new Date().getTime();
    }
    /* template-module-list */
  ];

  // 带有模块的导入导出:
  // 把当前模块的数组下标，进行一个一一的对应， 当遇到 require 参数的时候去哪儿找这个模块。
  // 因为如果像 Webpack 那样运行时进行一个编译打包处理的话，就需要做编译的操作稍微相对复杂，
  // 所以就维护了一个依赖的列表： 通过数组的下标作为模块 id 的标识。
  var moduleDepIdList = [
    // { "./moduleA": 1 },
    // {}
    /* template-module-dep-id-list */
  ];

  // 实现 require 函数: 每个模块都应该带上当前模块的 id, 同时在内部对不同模块进行一个映射。
  function require(id, parentId) {
    // 首先是入口的情况，入口的 id 没有 parentId, 所有这个时候的 id 就是当前模块的 id
    var currentModuleId =
      parentId !== undefined ? moduleDepIdList[parentId][id] : id;

    var module = { exports: {} }; // 注入 module

    var moduleFunc = moduleList[currentModuleId]; // 从 moduleList 读取当前模块 id 的函数

    // 不同的这里注入了一个新的 require 函数: 它接收一个 id, 同时通过闭包的方式传递 currentModuleId，
    // 这样就能让每一个里面的 require 函数都知道是哪个模块进入的。就能去对应的 moduleList 里面拿到这个模块之间依赖的关系。
    // 当 require(0) 的时候, 那么 currentModuleId 也是 0，那么上面的例子 require('module') 的时候去 moduleDepIdList 找到对应的元素
    moduleFunc(id => require(id, currentModuleId), module, module.exports);
    console.log(module.exports);

    return module.exports;
  }

  // var module = { exports: {} };
  // // moduleA(null, module); // 1.1-包裹在函数内需要有个名字， 有没有方法不用名字
  // moduleList[0](null, module); // 2.2-

  require(0);
})();
