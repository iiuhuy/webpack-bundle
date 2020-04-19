# Webpack 原理实践

这篇主要是为了学习 Webpack 的打包原理。并尝试实现一下简单的打包工具。

当然首先得知道模块化规范。之前在学 Node.js 的时候写过一篇模块相关的：[Node.js 模块](https://github.com/AlvinMi/yuhui.dev/issues/51)

## ESModule

借助 babel 这个工具， 是可以将 ESModule 规范翻译成 CommonJS 规范的： [参考例子](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAcgHQHoQQCYFcA2BTAQQQChi8APSWODPAMwENd4A7PAdzgBEGY8AKAJQBuIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.9.0&externalPlugins=)

但是都知道浏览器是不能直接使用 CommonJS 的规范，那么就需要解决这种模块化通用的问题。怎么样可以将 ESModule 使用到各个地方， 在各个地方使用 AMD 这样的模块化规范。

需要的一个步骤就是打包， 如何去实现这样的一个工具？ 主要有什么功能？

实现一个类似 Webpack 的东西：

- 1.能处理一个模块化的规范，怎样把 CommonJS 运行在浏览器中。

### Node.js 是如何处理 CommonJS 模块化规范的呢？

- 1.确定某个模块之后，会使用文件系统 `fs` 去读取进来， 以为字符串的形式； 然后将文件进行包裹， 成为一个字符串函数。
- 2.字符串在 JS 里面如何变成可以执行的文件呢？ 如 `eval()`、`new Function`、数组等等。但是 Node.js 是直接调用 `vm` 这个模块来处理的, 作用就是把字符串变成一个可执行的函数。

所以就能通过这种方法：

```js
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
```

使得我们的 module 能在 node 和浏览器都执行。node 执行 `index.js`， 浏览器中查看 `index.html` 都会有打印。

这个时候会发现，实际上发生改变的其实只有我们的模块代码会变化,即中间模块部分：

```js
console.log("hello bundle");
module.exports = "hello world -^-^- ";
```

那么对于打包工具来说，是不是可以将模块拿到后，将中间变化的部分进行替换掉。然后其他代码也可以执行。

如何替换？

方法有很多，这里使用简单的方法，使用脚本进行替换：

```js
```
