const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 外部拓展externals：
 * 1）简介：
 *  - 防止将某些`import`的包(package)打包到bundle中，而是在运行时(runtime)再去从外部获取这些拓展依赖(external dependencies)
 *  - 设置在externals中的拓展依赖可以在各种模块上下文(module context)中使用（模块上下文指CommonJS, AMD, ES6, 全局变量等）。
 * 2）配置：
 *  ```js
 *    externals: {
 *      // 以key-value的形式设置拓展依赖，如：
 *      jquery: jQuery
 *    }
 *  ```
 *  - key值`jquery`：指`import $ from 'jquery'`语句中的`jquery`。即应该排除`jquery`模块，使用value值`jQuery`来替换；
 *  - value值`jQuery`：会被用来检索一个全局的`jQuery`变量。
 */
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'production',
  externals: {
    // jQuery不会被打包进来
    jquery: 'jQuery',
  },
};
