const { name } = require('../package.json')

module.exports = {
  publicPath: '/subapp/micro-demo/',
  transpileDependencies: ['common'],
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import \'@/style/index.scss\';'
      }
    }
  }
}
