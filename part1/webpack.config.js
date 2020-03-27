const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  // JavaScript 执行入口文件
  entry: path.resolve(__dirname, './main.js'),
  devtool: 'source-map',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.[hash:8].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        // use: ExtractTextPlugin.extract({
        //   // 转换 .css 文件需要使用的 Loader
        //   use: ['css-loader'],
        // }),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   // 从 .js 文件中提取出来的 .css 文件的名称
    //   filename: `[name].css`,
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      title: "webpack demo",
      template: path.resolve(__dirname, './index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};