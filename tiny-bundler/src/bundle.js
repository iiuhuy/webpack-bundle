const path = require("path");
const fs = require("fs");

// 读取这段样板代码的内容
const boiler = fs.readFileSync(
  path.resolve(__dirname, "index.bundle.boilerplate"),
  "utf-8"
);
// 替换的内容 在 index.js
const target = fs.readFileSync(
  path.resolve(__dirname, "..", "index.js"),
  "utf-8"
);

// 进行替换
const content = boiler.replace("/* template */", target);

// 输出出去
fs.writeFileSync(
  path.resolve(__dirname, "dist/index.bundle.js"),
  content,
  "utf-8"
);
