// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // 生产环境
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/claimsfront/',
    // 去掉不想要的 .map 文件
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 测试环境
  buildSit: {
    env: require('./sit.env'),
    index: path.resolve(__dirname, '../test/index.html'),
    assetsRoot: path.resolve(__dirname, '../test'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 去掉不想要的 .map 文件
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8181,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable:{
    //
    // },
    proxyTable: {
      '/api': {  //代理地址
        // target: 'http://60b0584.nat123.cc:29264',  // 需要代理的地址
        target: 'http://arrow.natappvip.cc', // 需要代理的地址
        changeOrigin: true,  //是否跨域
        secure: false,
        onProxyReq: function (proxyReq, req, res) {
          console.log("原路径：" + req.originalUrl, "代理路径：" + req.path)
        },
        // pathRewrite: {
        //   '/api': 'http://arrow.natappvip.cc' //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
        // }

      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
};
