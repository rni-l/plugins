import 'es6-promise/auto'
import App from '@/app.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'
// import _ from 'lodash'

// 库、sdk
import api from '@/api/api'
import router from '@/router'
import request from '@/util/request'
import tools from '@/util/tools'
import WechatPlugin from '@/util/wechat'
// vuex
// import store from '@/store/index'
import vueFilter from '@/filter/index'
import vueDirective from '@/directive/index'
import vconsole from 'vconsole'

// css
import 'lib-flexible'
import 'mint-ui/lib/style.css'
import 'nprogress/nprogress.css'
import '@/assets/iconfont/iconfont.css'

// 传入 vuex
Vue.prototype.$request = request

window.$tools = tools

// window._ = _

Vue.prototype.$api = api

/* eslint-disable no-new,new-cap */
new vconsole()

// 阻止页面记住滚动
// 在 iphone 上使用，会出现左滑卡顿问题
// if ('scrollRestoration' in history) {
//   history.scrollRestoration = 'manual'
// }

// 兼容低版本浏览器(caniuse)，需要引入polyfill
// require('es6-promise').polyfill()

// const FastClick = require('fastclick')

// 添加Fastclick移除移动端点击延迟
// FastClick.attach(document.body)

// 微信 sdk
Vue.use(WechatPlugin)
// vue 组件/工具
Vue.use(Mint)
Vue.use(VueRouter)
// 添加 filter
vueFilter.forEach(v => {
  Vue.filter(v.name, v.func)
})
// 添加 directive
vueDirective.forEach(v => {
  Vue.directive(v.name, v.func)
})

Vue.config.productionTip = false

/* eslint-disable */
async function checkLogin() {
  const { code, data } = await request.get('/api/user/checkLogin')
  if (code === 200) {
  } else {
    alert('服务器繁忙，请稍后再试')
  }
}

let init = true

// 导航钩子，每次变动都会检查登录状态
// 开发中暂时去掉登录的验证
router.beforeEach(async (to, from, next) => {
  // // 替换路由
  // // 1. 自动添加问号(?)
  // // 2. 自动把分隔符由#!变成#
  // // 3. 分隔符后面，自动判断是否为斜杠(/)，没有则添加上
  // const { href, protocol, host } = window.location
  // let { search, hash } = window.location
  // const pathname = '/wechat/' // 解决支付路径问题添加的前缀，替换成你的
  // search = search || '?'
  // hash = hash || '#/'
  // const newHref = `${protocol}//${host}${pathname}${search}${hash}`
  // if (newHref !== href) {
  //   return window.location.replace(newHref)
  // }
  // // 错误路由
  // if (to.path.indexOf('/error') !== -1) {
  //   return next()
  // }

  // if (init) {
  //   // 第一次验证登录状态
  //   await checkLogin()
  //   init = null
  // }
  // const loginStatus = store.state.ifLogin
  // // 验证登录状态
  // if (loginStatus) {
  //   if (to.path === '/login') {
  //     return router.replace({ name: '/' })
  //   }
  // } else {
  //   if (to.path !== '/login') {
  //     return router.replace({ name: 'login' })
  //   }
  // }

  document.title = to.meta.title
  next()
})

// function onBridgeReady() {
//   // 禁止分享
//   // window.WeixinJSBridge.call('hideOptionMenu')
// }

// // 导航钩子，每次变动配置微信签名、分享
// router.afterEach(route => {
//   if (typeof window.WeixinJSBridge === 'undefined') {
//     if (document.addEventListener) {
//       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
//     } else if (document.attachEvent) {
//       document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
//       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
//     }
//   } else {
//     onBridgeReady()
//   }
//   window.scrollTo(0, 0)
//   // const config_url = window.location.href.split('#')[0]
//   // console.log(config_url)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
