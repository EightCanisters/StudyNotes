/**
 * loader和plugin使用上的区别：
 *    loader：1）npm i 下载； 2）配置loader
 *    plugin：1）npm i 下载； 2）require引入； 3）配置plugin
 */



const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: []
  },
  plugins: [
    /**
     * html-webpack-plugin
     *    1) 不传参的情况 - new HTMLWebpackPlugin()：会在配置的output文件夹创建一个空的html, 自动引入打包输出的所有资源，包括js, css...
     *    2) 参数template：复制设置的'./src/index.html'文件到配置的output文件夹，并自动引入打包输出的所有资源
     */
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  mode: 'development'
}