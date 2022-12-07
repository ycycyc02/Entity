const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
}
module.exports = {
  devServer: {

      hot: true,//自动保存
    },
}