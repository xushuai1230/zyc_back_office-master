/**
 * 此文件用于开发环境下的webpack配置
 * 就本项目执行npm run dev 和 npm run start都会用到这个文件的配置
 * 具体可以参考JavaScript中"scripts"的配置
 */

var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//生成html文件
var HtmlWebpackPlugin = require('html-webpack-plugin')
//friendly-errors-webpack-plugin:把webpack的错误和日志搜集起来展现给用户
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
 // devtool是开发工具选项，用来指定如何生成sourcemap文件，cheap-module-eval-source-map此款soucemap文件性价比最高
 // 生产环境：#source-map
 // 开发环境：#cheap-module-eval-source-map 编译消耗小
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
