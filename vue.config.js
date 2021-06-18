module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      '/ll': {
        target: 'https://chenzp.ltd/getCP', //接口域名
        changeOrigin: true,       //是否跨域 
        secure: true,          //是否https接口
        pathRewrite: {
          '^/ll': ''//重写接口,后面可以使用重写的新路径，一般不做更改
        }
      },
      '/ls': {
        target: 'https://api.weixin.qq.com/cgi-bin/', //接口域名
        changeOrigin: true,       //是否跨域 
        secure: true,          //是否https接口
        pathRewrite: {
          '^/ls': '/'//重写接口,后面可以使用重写的新路径，一般不做更改
        }
      },
      '/lol': {
        target: 'https://api.weixin.qq.com/tcb/', //接口域名
        changeOrigin: true,       //是否跨域 
        secure: true,          //是否https接口
        pathRewrite: {
          '^/lol': '/'//重写接口,后面可以使用重写的新路径，一般不做更改
        }
      },
      '/cun': {
        target: 'https://cos.ap-shanghai.myqcloud.com/', //接口域名
        changeOrigin: true,       //是否跨域 
        secure: true,          //是否https接口
        pathRewrite: {
          '^/cun': ''//重写接口,后面可以使用重写的新路径，一般不做更改
        }
      }
    }
  }
};