const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');

/**
 * HMR: hot module replacement 热模块替换 / 模块热替换
 * 1）作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），极大提升构建速度
 * 2）配置：（先在devServer中添加：`hot:true`，官网上还加了`new webpack.HotModuleReplacementPlugin()`）
 *  - 样式文件：style-loader内部实现了HMR，无需其他配置；
 *  - html文件：默认不能使用HMR，也确实不用做HMR（因为浏览器一个tab页始终只能打开一个html页面，也可以理解为单页应用）。
 *    - 但是存在一个问题：修改这一个html里的代码，html文件不能更新了（除非手动刷新整个标签页）：
 *        如何解决：修改entry入口，将html文件引入（`entry: ['./src/js/index.js', './src/index.html']`）
 *        效果：自动刷新整个标签页
 *  - js文件：默认不能使用HMR（有修改时刷新了整个标签页）。要使用需要修改js代码（添加支持HMR功能的代码）；
 *      - 注意：HMR功能对js的处理，只能处理非入口js文件的其他文件；
 *      - 代码（在入口js中添加）：
          if (module.hot) {
            // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
            module.hot.accept('./print.js', function() {
              // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
              // 会执行后面的回调函数
              print();
          });
        - 效果：修改print.js，HMR生效；修改index.js，自动刷新整个标签页
}
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
  }
}