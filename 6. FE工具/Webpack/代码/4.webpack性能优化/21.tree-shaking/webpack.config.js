const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * tree shaking（树摇）：
 *  - 理解：有一棵树，树上有绿色和枯黄的叶子，为了只保留绿色的叶子，有个人就去摇晃这棵树，将枯黄叶片摇落下来。
 *  - 含义：类比上面那棵树，webpack中的tree shaking即**去除没有用过的代码，减小打包后代码体积**。
 *  - 如何使用：
 *    - 1. 写代码时必须使用ES6模块化；
 *    - 2. 开启production模式（或引用一个能够删除为引用代码的压缩工具，比如UglifyJSPlugin）；
 *    - 3. 避免只import却未调用的文件（类似于css、@babel/polyfill这种）被干掉，还需设置package.json的`sideEffects`：
 *      - `"sideEffects": false`：所有代码都没有副作用（都可以被摇掉，可能会干掉css、@babel/polyfill）；
 *      - `"sideEffects": ["*.css", "*.less"]`：相当于排除了"*.css"、 "*.less"两种文件。
 */

process.env.NODE_ENV = 'production'; // 定义nodejs环境变量：决定使用browserslist的哪个环境

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  // 'style-loader', // 直接将css放到style标签里
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'post-css',
        plugins: [ 'postcss-preset-env' ] // 还需要在package.json中配置browserslist
      }
    }
  }
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /**
       * 注意：正常来讲，一个文件只能由一个loader处理。
       * 当一个文件要被多个loader处理，需要指定loader执行的先后顺序。
       * 这里：应先执行eslint-loader，再执行babel-loader
       */
      {
        // 需要在package.json中配置eslintConfig
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [ ...commonCssLoader, 'less-loader' ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
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
                      ie: '9'
                    }
                  }
                ]
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'images',
              esModule: false
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
              esModule: false
            }
          },
          {
            exclude: /\.(js|html|css|less|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  mode: 'production'
}