const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/indes.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
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
          },
        ],
      },
      {
        exclude: /\.(css|js|html|png|gif|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  /**
   * devServer
   *    是什么：开发服务器，用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）;
   *    特点：只会在内存中编译打包，不会有任何输出;
   *    如何启动：npx webpack serve(webpack-cli: 4.x), npx webpack-dev-server(webpack-cli 3.x);
   */
  devServer: {
    static: resolve(__dirname, 'build'), // 项目构建后的路径, webpack4是contentBase
    compress: true, // 是否使用gzip压缩
    port: 3000, // 设置端口号
    open: true, // 是否自动打开浏览器
  },
};
