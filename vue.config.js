module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        btn: "@/components/common/button",
        common: "@/components/common",
        userView: "@/views/user/views",
        userHistory: "@/views/user/views/userHistory",
        page: "@/components/common/page"
      }
    }
  },
  devServer: {
    proxy: {
      "/robot/send": {
        target: "https://oapi.dingtalk.com",
        changeOrigin: true,
        pathRewrite: {
          "^/robot/send": ""
        }
      }
    }
  }
};
