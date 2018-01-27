# 微信模板使用说明

## 目录列表

```
.
├── README.md                            --          
├── build                                --      
│   ├── build.js                         --             
│   ├── check-versions.js                --                      
│   ├── utils.js                         --             
│   ├── vue-loader.conf.js               --                       
│   ├── webpack.base.conf.js             --                         
│   ├── webpack.dev.conf.js              --  webpack-dev-server 配置
│   ├── webpack.prod.conf.js             --                         
│   └── webpack.test.conf.js             --                         
├── config                               --       
│   ├── dev.env.js                       --               
│   ├── index.js                         --             
│   ├── prod.env.js                      --                
│   └── test.env.js                      --                
├── document.md                          --  项目文档说明
├── package.json                         --             
├── private-config.js                    --
├── private-config.js.example            --                          
├── src                                  --  开发的代码
│   ├── api                              --        
│   │   └── api.js                       --  请求封装集合
│   ├── app.vue                          --
│   ├── assets                           --  资源图片
│   ├── base.less                        --  基础 css
│   ├── directive                        --  指令
│   ├── filter                           --  过滤器
│   ├── components                       --  组件
│   ├── index.html                       --  html 模板
│   ├── main.js                          --  程序入口文件
│   ├── module                           --  模块页面
│   │   └── home.vue                     --                 
│   ├── router.js                        --  路由
│   ├── store                            --  vuex
│   │   ├── index.js                     --                 
│   │   └── module                       --               
│   │       └── user.js                  --                    
│   └── util                             --  工具库
│       ├── request.js                   --  封装请求方法
│       ├── tools.js                     --  公共类
│       └── wechat.js                    --  封装微信 sdk 安装方法
├── static                               --  静态资源，不会被 webpack 压缩等处理
│   └── city.json                        --              
└── test                                 --  测试
    ├── e2e                              --        
    └── unit                             --  单元测试
        ├── coverage                     --                 
        ├── index.js                     --  测试入口文件
        ├── karma.conf.js                --  测试环境配置文件
        ├── specs                        --  单元测试文件
        │   └── components               --                       
        └── utils.js                     --  测试工具类

```

## 配置文件

private-config.js

```
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
```

dev 对象，是开发时用到的。新增的 ngrokUrl，是为了解决新版本 vue-cli 模板，ngrok 转发的应用，无法热更新问题。详情可以看 webpack.dev.conf.js 文件中的 devServer 配置，里面添加了 disableHostCheck 和 public 的配置

另外一个新添加的 showConsoleLog，默认 false，false 的话，不会显示 console.log 和 debugger。使用这个，大家可以尽情的使用 console.log，不用说要上线了，把 console.log 去掉，毕竟 console.log 的话还是需要一些性能。

在 webpack.prod.conf.js 中，UglifyJsPlugin 的选项中，配置了这个字段

在 config/index.js 中，showEslintErrorsInOverlay 这个字段是控制，是否把 eslint 的错误显示在页面上

## 库/ vue 组件

* vue-cli 模板: v2.9.2
* vue: v2.5.10（从 v2.2.0 更新）
* vue-router: v3.0.1 
* vuex: v3.0.1
* mint-ui: v2.2.13（从 v2.2.3 更新，主要是修复 bug）
* axios: v0.16.0


### vuex

建议使用 vuex ，进行全局变量的管理，少用 localStorage

### mint-ui/rem

移动 ui 库是使用 [mint-ui](http://mint-ui.github.io/docs/#/zh-cn2/quickstart)，因为 mint-ui 是不支持 rem 的，而我们的微信项目，现在都使用 rem 的模式，所以 mint-ui 的组件在使用时，可能要手动调整 mint 组件的样式，转为 rem 单位。

在项目根目录，`/build/utils.js` 文件，可以调整 rem 的转换值

    var px2remLoader = {
      loader: 'px2rem-loader',
      options: {
        remUnit: 75
      }
    }


### vue 组件

* 百度地图组件（vue-baidu-map）
* 弹出框（modal）
* 地区二级联动组件（address-select)
* 选择器（select)
* 图片上传（uploadFile）
* 搜索框（search）
* ....后续补充

## 公共方法

公共方法，都挂载到 vue 上，调用即可

### request

ajax 请求封装，包含 get 和 post 两个方法

    request.get('/api/admin/getPages', { page: 1 })

最后返回一个 promise 对象

### api

api，集合了整个项目所有的请求方法，所有的请求方法统一放在 api/api.js 文件里

```javascript
import request from '@/util/request'

/**
 * 处理参数的方法（为了后面开发可拓展）
 * @params {Object} opts  -- 配置参数
 * @params {String} url  -- 请求域名
 * @returns {Object} { url } -- 请求域名
 * @returns {Object} { errType } -- 错误处理方式
 */

function dealOpts(url, opts) {
  return {
    url,
    errType: (opts && opts.errType) || ''
  }
}

/**
 * 请求方法
 * @params {Object} params  -- 请求所带的参数(可选)
 * @params {Object} opts  -- 配置参数(可选)
 */

const getCaptcha = (params, opts) => {
  return request.get(dealOpts('/admin/api/adminUser/checkLogin', opts), params)
}

export default {
  getCaptcha
}
```


```javascript
// 使用
this.$api.getCaptcha({ phone: 123123 })
```

#### 特殊要求，特殊处理

有时候遇到一些特殊的请求，例如获取支付参数，产品需要你做特殊的处理，不再弹出 Toast ，而是弹出 MessageBox 。所以在这里我做了一点调整，可以选择弹出的提示方式

```javascript
this.$api.getCaptcha({ phone: 123123 }, { errType: 'notDeal' })
```

在请求方法，第二个参数中（可选），传入一个对象，里面某个字段是 `errType` ，有两种值：'MessageBox' 和 'noProcssing' ，使用 MessageBox 或不做处理

#### 如何在拦截器里，更改  vuex 状态？

比如，后端返回 506 code 的时候，要重新登录，如果这时候你使用 vuex 管理登录状态，就可以在 request.js 引入 store，在指定的条件里，修改登录状态

```javascript
function checkCode(res, type) {
  if (type !== 'noProcssing') {
    // 需要处理
    if (res.code === 506) {
      Toast('请重新登录')
      // store.commit('updateTest', 123)
      router.replace({ name: 'login' })
    } else if (res.code !== 200) {
      // 默认 toast 显示错误信息
      const err = `${res.data}. `
      if (type === 'MessageBox') {
        MessageBox.alert(err)
      } else {
        Toast(err)
      }
    }
  }
  return res
}
```

在上面某层拦截器的代码，比如我想在 506时, 修改登录的状态为 false, `store.commit()` 这样就可以了

### loadsh

_ 是 lodash 对象，拥有 lodash 所有方法，默认没导入，需要用到再导入即可

### tools

tools 是自定义方法集合，可自己添加方法进去， tools 方法是挂载到 window 上，方便其他方法可以调用

```
// tools 方法集合
{
  // 正则
  regexp: {
    phone: /^1[134578]{1}\d{9}$/,
    // ....
  },
  checkIfWechat, // 返回是否微信环境
  formatDate, // 返回一个格式化后的时间字符串
}
```

## 指令/过滤器

在 src 文件夹里面，多了 directive 和 filter 两个文件夹，提供使用

## css

`base.less` 放置 `function`, `mixin` 和变量，不存放类

公共类，统一放在 `app.vue` 中

注意：公共组件，不要在 style 标签使用会被 webpack 转成 base64 的图标（图片），因为被转成 base64 后，调用了这个组件的 .vue 文件，最终打包出来，会出现重复出现的问题

## 单元测试

后续补充。。。

## 建议优化点

### vue-router 使用 name 属性

使用别名，就算路径改变，其他地方也不用替换

### 使用 externals（已默认使用）

在 `webpack.base.conf.js` 里，添加了一行代码

```
externals: {
  'vue': 'Vue',
  'mint-ui': 'MINT'
}
```

最终打包出来的 vendor.js 文件，不会包含在 externals 声明的依赖文件，这些文件会在 index.html 引入

```
<script src="//cdn.bootcss.com/vue/2.2.2/vue.min.js"></script>
<script src='//cdn.bootcss.com/mint-ui/2.2.3/index.js'></script>
```

如果有比较大的依赖文件，可以尝试这样使用


后续大家有看到觉得不好的地方可以提 PR 出来~~