module.exports = {
  // publicPath: './',
  lintOnSave: 'warning',
  devServer: {
    port: 80,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun'
        return args
      })
    config.resolve.symlinks(false)
  }
}
