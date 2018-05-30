module.exports = {
  dev: {
    port: 8080, // 开发模式端口号
    target: '', // 开发模式 api 转发地址
    ngrokUrl: '' // ngrok 域名
  },
  publicPath: '', // api 前缀
  showConsoleLog: true,
  productionSourceMap: false // 上线版本是否启用 sourcemap
}
