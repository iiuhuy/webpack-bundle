// 将 ESModule 的语法进行转换。
// 需要的基本依赖： yarn add webpack webpack-cli @babel/core babel-loader @babel/preset-env
const path = require("path");

module.exports = {
  mode: "none",
  entry: "./index.js",
  output: {
    path: path.resole(__dirname, "dist"),
    filename: "index.bundle.js",
    publicPath: "dist/"
  },
  modele: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          potions: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
