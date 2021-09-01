const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * 缓存：
 *  - 含义：
 *    - webpack打包构建时，利用缓存使速度变快（babel缓存）；
 *    - 项目部署运行时，利用浏览器缓存使网页加载更快，同时解决缓存造成的代码不更新的问题（文件资源缓存）
 *  1）babel缓存：
 *    - 配置：修改`babel-loader`的配置，添加`cacheDirectory: true`：
 *      ```js 
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
                    firefox: '50'
                  }
                }
              ]
            ],
            // 开启babel缓存
            // 第二次构建时，会读取之前的缓存
            cacheDirectory: true
          }
        }
 *      ```
 *    - 作用：第二次构建时，会读取之前的缓存，从而使第二次打包构建速度更快。
 *  2）文件资源缓存：
 *    - 配置：在所有可以给输出文件命名的地方加上`[hash/contenthash/chunkhash:10]`（比如：将output.filename修改为`js/built.[hash:10].js`）
 *    - 使用hash/chunkhash/contenthash：
 *      - hash：每次webpack构建时会生成一个唯一的hash值；
 *        - 问题：因为js和css使用的是同一个hash值。使用[hash:10]重新打包后，会导致所有的缓存都失效了（因为js和css的文件名都变了，但可能此时只改动了一个文件）
 *      - chunkhash：根据chunk生成的hash值。如果打包出来的文件来源于一个chunk，那么hash值就一样。
 *        - 问题：同一个chunk，js和css使用的hash值还是同一个。依然可能会导致缓存失效，原因场景同上。
 *      - contenthash：根据文件的内容生成hash值。
 *        - 只要文件内容变化，hash值就会改变（内容不变，hash值也不变）；
 *        - 这样，不同文件的hash值一定不同；
 *        - 完美解决了上边的问题。
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
    filename: 'js/built.[contenthash:10].js',
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
      filename: 'css/built.[contenthash:10].css'
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
  mode: 'production',
  devtool: 'source-map'
}