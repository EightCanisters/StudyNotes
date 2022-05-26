const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/**
 * pwa: 渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。
 *      PWA 可以用来做很多事,其中最重要的是，在离线(offline)时应用程序能够继续运行功能。这是通过使用名为 Service Workers 的网络技术来实现的。
 * - 添加workbox
 *    - workbox --> workbox-webpack-plugin: 名为 Workbox 的 Google 项目来实现pwa离线效果，该项目提供的工具可帮助我们更轻松地配置 web app 的离线支持。
 *    - new WorkboxWebpackPlugin.GenerateSW({clientsClaim: true, skipWaiting: true}) // 这些选项帮助 ServiceWorkers 快速启用,不允许遗留任何“旧的” ServiceWorkers，最终生成一个serviceWorker的配置文件
 * - 在js中注册serviceWorker：
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => {
              console.log('sw注册成功了~');
            })
            .catch(() => {
              console.log('sw注册失败了~');
            });
        });
      }
 * - 注意几个问题：
      - 问题1：eslint默认不认识window, navigator等全局变量
        解决：需要修改package.json中eslintConfig配置
              "env" : {"browser": true // 支持浏览器端全局变量}
      - 问题2：sw代码必须运行在服务器上
        解决：可以用Node.js搭服务器；也可以npm i serve -g，再serve -s build启动服务器，将build目录下所有资源作为静态资源暴露出去
 */
module.exports = {
  // 单入口
  entry: './src/js/index.js',
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
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
    new WorkboxWebpackPlugin.GenerateSW({
      // 1. 帮助serviceWorker快速启动； 2. 删除旧的serviceWorker；
      // 最终生成一个serviceWorker的配置文件。
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'development',
  devServer: {
    static: resolve(__dirname, 'dist'), // webpack4是contentBase
    port: 8899,
    open: true,
  },
};
