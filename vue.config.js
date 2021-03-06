module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        btn: "@/components/common/button",
        common: "@/components/common",
        userView: "@/views/user/views",
        userHistory: "@/views/user/views/userHistory",
        page: "@/components/common/page",
      },
    },
  },
  devServer: {
    proxy: {
      "/city": {
        target: "https://quhua.ipchaxun.com/api/areas/data",
        changeOrigin: true,
        pathRewrite: {
          "^/city": "",
        },
      },
    },
  },
};
