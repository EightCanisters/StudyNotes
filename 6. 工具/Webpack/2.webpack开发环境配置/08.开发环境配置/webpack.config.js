const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
    })
  ],
  mode: 'development',
  devServer: {
    open: true,
    port: 3000,
    contentBase: resolve(__dirname, 'build'),
    compress: true,
  }
}