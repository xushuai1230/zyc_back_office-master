var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack');
//获取对应文件路径的函数
//因为该文件是在项目的二级文件build下，所以要加上../这样才能找到像src这样的目录
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    //入口文件是src下的main.js
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    // filename: '[name].js',
    filename: '[name]-[hash:8].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    //自动解析确定的扩展,在引入模块时不带扩展名
  //例如：import somejs from "@/some"
    extensions: ['.js', '.vue', '.json'],
    alias: {
       // 后面的$符号指精确匹配
   // 也就是说只能使用 import vuejs from "vue" 这样的方式导入vue.esm.js文件
      'vue$': 'vue/dist/vue.esm.js',
      // resolve('src') 其实在这里就是项目根目录中的src目录
   // 例如引用src目录下的some.js方法:import somejs from "@/some.js"
   // 用@来代替../src
      '@': resolve('src'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages'),
      'layout': resolve('src/layout'),
      'utils': resolve('src/utils'),
      'assets': resolve('src/assets')
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }

    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
}
