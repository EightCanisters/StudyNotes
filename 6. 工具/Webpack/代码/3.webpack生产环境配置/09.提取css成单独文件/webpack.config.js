const { resolve }  = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 创建style标签，将'css-loader'整合到js中的样式放到style标签中

          // 用这个loader取代style-loader，因为想将css单独输出为一个文件
          MiniCssWebpackPlugin.loader, // 作用：提取js中的css成单独文件

          'css-loader' // 将css文件整合到js中
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssWebpackPlugin({
      // 对输出的css文件重命名
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
}