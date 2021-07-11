/**
 * webpack.config.js:
 *    webpack的配置文件；
 *    作用：指示webpack干哪些活（当你使用命令webpack时，会加载这个文件内的配置）；
 *    所有构建工具都是基于nodejs平台运行的；
 *    模块化默认采用的是commonjs;
 */

const { resolve } = require('path');

module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径：
    //    --dirname: nodeJs的变量，代表当前文件的绝对路径
    //    resolve: nodeJs里path模块的方法，用来拼接绝对路径
    path: resolve(__dirname, 'dist')
  },
  // 配置lodader
  module: {
    // 详细的loader配置
    rules: [
      // 不同类型的文件必须配置不同的规则来处理
      {
        test: /\.css$/, // 匹配什么样的文件
        // use数组中loader的执行顺序：从下到上，从右到左（后进先出）
        use: [
          'style-loader', // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'css-loader' // 将css文件转换成commonjs模块加载到js中，css代码被转换成了样式字符串。（类似于用js给元素动态添加样式）
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'  // 1. 将less文件编译成css文件；2. 需要下载 less-loader 和 less
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader', // 1. 将sass文件编译成css文件；2. 需要下载 sass-loader 和 node-sass
        ]
      }
    ]
  },
  plugins: [],
  mode: 'development'
}