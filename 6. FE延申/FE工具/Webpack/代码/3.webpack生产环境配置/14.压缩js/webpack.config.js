const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * 压缩JS：只需把mode设置为“production”：
 *  - 原因：“production” mode下，webpack会自动启用TerserWebpackPlugin/UglifyJsPlugin来压缩。
 */
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production'
}