const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /**
       * JS兼容性处理（基于babel-loader、@babel/core）：
       *  1）基本兼容性处理：只能把ES6+的语法转换成ES5，但不能处理ES6+新增的API。
       *    - npm包：@babel/preset-env;
       *    - 结果：chrome没问题，ie报错；
       *    - 代码(单个loader配置):
              {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                presets: [
                  [
                    '@babel/preset-env'
                  ]
                ]
              }
       *      
       *  2）全部兼容性处理：处理ES6+的语法和新增的API
       *    - npm包：@babel/polyfill；
       *    - 结果：chrome和ie都没问题；
       *    - 缺点：非按需加载；
       *    - 代码：在项目最外层js(js/index.js)中添加：import '@babel/polyfill';
       * 
       *  3）【按需加载】全部兼容性处理：处理ES6+的语法和新增的API
       *    - npm包：@babel/preset-env；
       *    - 结果：chrome和ie都没问题；
       *    - 代码：
                {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  loader: 'babel-loader',
                  options: {
                    // 预设：指示babel做怎么样的兼容性处理
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          useBuiltIns: 'usage', // 按需加载
                          corejs: { version: 3 }, // 指定corejs的版本
                          targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' } // 指定兼容到浏览器哪个版本
                        }
                      ]
                    ]
                  }
                }
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage', // 按需加载
                corejs: { version: 3 }, // 指定corejs的版本
                targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' } // 指定兼容到浏览器哪个版本
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  mode: 'development'
}