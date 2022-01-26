const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * oneOf
 *  - 含义：配置后，一个文件在构建时，只会匹配oneOf数组里头某一个loader（不配置的话，一个文件会挨个去匹配loader），用于优化生产环境打包构建速度；
 *  - 注意：oneOf数组里不能有两个loader配置处理同一类型的文件。如果一个类型有多个loader，可在oneOf中保留一个，将其余的提到外层。
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
              ]
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