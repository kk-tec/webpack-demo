const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 注意这里的大括号
// const StyleLintPlugin = require('stylelint-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: "development",
  // JavaScript 执行入口文件
  entry: path.resolve(__dirname, './src/main.js'),
  devtool: devMode ? 'source-map' : false, // 输出 source-map 方便直接调试 ES6 源码
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name].[hash:8].js', // filename 表示配置输出文件的名字；chunkFilename 表示无入口的 chunk 在输出时的文件名
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'), // 必须是绝对路径，表示输出文件存放在本地的目录。
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          // 如果你导入一个 node_modules 内的 Vue 单文件组件，它的 <script> 部分在转译时将会被排除在外。
          // 为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件，你需要通过使用一个排除函数将它们加入白名单
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
            devMode
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [
            devMode
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    // new StyleLintPlugin({
    //   files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    // }),
    new HtmlWebpackPlugin({
      title: "webpack demo",
      template: path.resolve(__dirname, './src/index.html')
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist')
  }
}
