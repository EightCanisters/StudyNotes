const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 配置node的环境变量
process.env.NODE_ENV = 'development';

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
          MiniCssExtractPlugin.loader,
          'css-loader',
          /**
           * 1. postcss-loader: 生成对应环境的兼容性样式代码；
           * 2. postcss-preset-env: 帮postcss-loader找到pockage.json中browserslist的配置；
           *    1）"browserslist": {
                  // 开发环境，这里对应的是node的环境变量（非webpack.config.js配置的mode）：process.env.NODE_ENV = development
                  "development": [
                    "last 1 chrome version", //chrome最新的一个版本
                    "last 1 firefox version",
                    "last 1 safari version"
                  ],
                  "production": [
                    ">0.2%", // 兼容市面上（使用人数？）最靠前的99.8%的浏览器
                    "not dead", // 兼容非死亡的浏览器
                    "not op_mini all" // 兼容非open mini浏览器
                  ]
                }
           *    2）如果不手动设置node环境变量，默认为"production"
           */
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'post-css',
                plugins: [
                  'postcss-preset-env'
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
}