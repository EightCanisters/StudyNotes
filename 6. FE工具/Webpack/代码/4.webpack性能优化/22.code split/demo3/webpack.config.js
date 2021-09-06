const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 单入口 + 配置splitChunks + import：
 *  - 一个入口被打包输出；
 *  - 动态import()的文件被单独打包输出；
 *  - node_modules被单独打包输出；
 *  - 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk。
 */
module.exports = {
  // 单入口
  entry: './src/js/index.js',
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production'
};
