const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * 压缩html：只需配置html-webpack-plugin插件
 */
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true // 移除空格
      }
    })
  ],
  mode: 'production'
}