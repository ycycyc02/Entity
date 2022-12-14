const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  assetsDir: 'static',
  publicPath: './',
}
module.exports = {
  devServer: {

      hot: true,//自动保存
    },
}