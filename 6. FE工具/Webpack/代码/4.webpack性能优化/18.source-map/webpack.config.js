const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');

/*
  source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）
    0）开启source-map: 添加wbpack配置`devtool: 'eval-source-map'`
    1）类型：
      [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
      内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

      source-map：外部
        作用：错误代码准确信息 和 源代码的错误位置（精确到行和列）
      inline-source-map：内联
        作用：错误代码准确信息 和 源代码的错误位置（精确到行和列）
        内联：只生成一个内联source-map（在built.js文件最底部，source-map与代码分成了两块）
      hidden-source-map：外部
        作用：错误代码错误原因，只提示源代码的错误位置，但不能点进源代码看详细信息（不能追踪源代码错误，只能提示到构建后代码的错误位置）
      eval-source-map：内联
        作用：错误代码准确信息 和 源代码的错误位置（精确到行和列）
        内联：每一个文件都生成对应的source-map，都在eval函数中（与代码紧挨着）
      nosources-source-map：外部
        作用：错误代码准确信息, 但是没有任何源代码信息
      cheap-source-map：外部
        作用：错误代码准确信息 和 源代码的错误位置（但只能精确到行）
      cheap-module-source-map：外部
        作用：错误代码准确信息 和 源代码的错误位置（但只能精确到行）
        特点：module会将loader的source map加入（所以调试更友好）

  2）特点：
    开发环境：构建速度快，调试更友好
      构建速度快(eval>inline>cheap>...)：
        eval-cheap-souce-map（最快）
        eval-source-map（第二快）
      调试更友好：
        souce-map（最友好）
        cheap-module-souce-map（第二友好）
        cheap-souce-map（第三友好）

      -->小结： 开发环境最优选：eval-source-map（兼顾构建速度和调试，但偏调试） / eval-cheap-module-souce-map（兼顾构建速度和调试，但偏构建） 

    生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联

      隐藏源代码：
        nosources-source-map 全部隐藏
        hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      调试友好：
        source-map
        cheap-module-souce-map
*/
module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          }, 
          {
            loader: 'css-loader',
          }
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /.(gif|png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:8].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false,
        }
      },
      {
        exclude: /\.(html|css|less|gif|png|jpg|js)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'icon',
          name: '[hash:8].[ext]',
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    // new webpack.HotModuleReplacementPlugin() // 官网上还加了这句
  ],
  mode: 'development',
  devServer: {
    open: true,
    port: 3000,
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重启webpack服务
    hot: true
  },
  // 开启source-map
  devtool: 'nosources-source-map'
}
