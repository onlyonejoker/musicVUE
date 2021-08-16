module.exports = {
  devServer: {
    proxy: {
      '/city': {
        target: 'https://quhua.ipchaxun.com/api/areas/data',
        changeOrigin: true,
        pathRewrite: {
          '^/city': ''
        }
      }
    }
  }
}