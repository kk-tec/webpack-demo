const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: "development",
  // JavaScript 执行入口文件
  entry: path.resolve(__dirname, './src/main.js'),
  devtool: 'source-map', // 输出 source-map 方便直接调试 ES6 源码
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.[hash:8].js', // filename 表示配置输出文件的名字；chunkFilename 表示无入口的 chunk 在输出时的文件名
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'), // 必须是绝对路径，表示输出文件存放在本地的目录。
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        // 使用 PostCSS 处理 CSS 文件
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader，默认是0
            }
          },
          'postcss-loader'
        ],
      },
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss$/,
        exclude: /node_modules/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader，默认是0
            }
          },
          'postcss-loader', 
          'sass-loader'
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      title: "webpack demo",
      template: path.resolve(__dirname, './src/index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist')
  }
};