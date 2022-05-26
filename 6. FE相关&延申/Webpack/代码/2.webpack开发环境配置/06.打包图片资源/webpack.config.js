
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        /**
         * url-loader:
         *    1）处理css中的图片资源，注意：不能处理html中的img标签
         *    2）url-loader基于file-loader运行，所以需下载url-loader和file-loader
         *    3）options：loader的其他配置
         *        limit: 图片大小小于8Kb，就会被处理成base64；
         *        esModule：url-loader默认使用es6解析。设置为false：关闭它的es6模块化，使用commonjs解析;
         *        name: 给图片进行重命名。[hash:10] - 取图片的hash的前10位；[ext] - 取文件原来的拓展名。
         */
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]'
        }
      },
      {
        /**
         * html-loader:
         *    处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
         */
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}