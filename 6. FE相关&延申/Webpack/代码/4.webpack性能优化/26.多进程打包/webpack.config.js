const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          /**
           * 多进程打包
           * 1. 使用的laoder: babel-loader
           * 2. 简介：
           *    1）将thread-loader放在其他的loader之前，那么放置在thread-loader之后的loader就会在一个单独的worker池中运行（即多进程打包）
           *    2）在worker池中运行的loader是收到限制的：
           *        - 这些loader不能产生新的文件；
           *        - 不能使用定制的loader API(即插件)；
           *        - 无法获取webpack的选项配置。
           *    3）每个worker都是一个单独的有600ms限制的node.js进程。同时跨进程的数据交换也会被限制。
           * 3. 配置：
           *  {
                loader: 'thread-loader',
                options: {
                  workers: 2 // 进程2个
                }
              }
          */
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      chrome: '60',
                      firefox: '50',
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'development',
};
