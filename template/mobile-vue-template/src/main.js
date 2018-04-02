import 'es6-promise/auto'
import App from '@/app.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'
// import _ from 'lodash'

// 库、sdk
import api from '@/api/api'
import router from '@/router/index'
import request from '@/util/request'
import tools from '@/util/tools'
import WechatPlugin from '@/util/wechat'
// vuex
// import store from '@/store/index'
import vueFilter from '@/filter/index'
import vueDirective from '@/directive/index'
import vconsole from 'vconsole'
import init from '@/router/auth'

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

init()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
