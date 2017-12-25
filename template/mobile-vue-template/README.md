# 微信模板使用说明

## 库/ vue 组件

* vue-cli 模板: v2.9.2
* vue: v2.5.10（从 v2.2.0 更新）
* vue-router: v3.0.1 
* vuex: v3.0.1
* mint-ui: v2.2.13（从 v2.2.3 更新，主要是修复 bug）
* axios: v0.16.0


### vuex

建议使用 vuex ，进行全局变量的操作，少用 localStorage

使用 vuex ，保存用户的登录状态，每次路由跳转，检查 vuex 的登录状态值，判断是否登录

如果是有权限功能的，同上，在 `router.beforeEach` 钩子函数，进行判断

### mint-ui/rem

库是使用 [mint-ui](http://mint-ui.github.io/docs/#/zh-cn2/quickstart)，因为 mint-ui 是不支持 rem 的，而我们的微信项目，现在都使用 rem 的模式，所以 mint-ui 的组件在使用时，可能要调整样式，转为 rem 单位。

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

```
const getCaptcha = (params) => {
  return request.post('/user/getCaptcha', params)
}

export default {
  getCaptcha
}
```

在入口为文件（ main.js ）里，挂载到 vue 中（不是挂载到 window ）

    this.$api.getCaptcha({ phone: 123123 })

#### 特殊请求，特殊处理

有时候遇到一些特殊的请求，例如获取支付参数，产品需要你做特殊的处理，不再弹出 Toast ，而是弹出 MessageBox 。所以在这里我做了一点调整，可以弹出制定的提示方式

    this.$api.getCaptcha({ phone: 123123 }, { errType: 'notDeal' })

在请求方法，第二个参数中（可选），传入一个对象，里面某个字段是 `errType` ，有两种值：'MessageBox' 和 'notDeal' ，使用 MessageBox 或不做处理

#### 如何在拦截器里，更改  vuex 状态？

```
function checkCode(res, type) {
  if (type !== 'notDeal') {
    // 需要处理
    if (res.code === 506) {
      // Toast('请重新登录')
      // router.replace('login')
      // store.commit(...)
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

上面去某层拦截器的代码，比如我想在 506, 修改登录的状态为 false, `store.commit('updateLogin', false)` 这样就可以了

### _

_ 是 lodash 对象，拥有 lodash 所有方法，默认没导入，需要用到再导入

### tools

tools 是自定义方法集合，可自己添加方法进去

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

## css

`base.less` 放置 `function`, `mixin` 和变量，不存放类

公共类，统一放在 `app.vue` 中

注意：公共组件，不要在 style 标签使用会被 webpack 转成 base64 的图标（图片），因为被转成 base64 后，调用了这个组件的 .vue 文件，最终打包出来，会出现重复出现的问题

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

### 使用 keep-alive

```
// app.vue
<keep-alive :include="['a', 'b', 'c']">
  <router-view></router-view>
</keep-alive>
```

其中 a, b, c 是 `.vue` 文件的 `name` 属性值

这样就会对声明的那几个页面，进行缓存处理

在 `activated` 或 `deactivated` 钩子函数事件中，可以使用 `this.$destroy()` 这个方法进行销毁组件