import 'es6-promise/auto'
import App from '@/app.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
// import _ from 'lodash'
// 库、sdk
import api from '@/api/api'
import router from '@/router/router'
import request from '@/util/request'
import tools from '@/util/tools'

// vuex
import store from '@/store/index'
import vueFilter from '@/filter/index'
import vueDirective from '@/directive/index'

// css
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
// import '@/assets/iconfont/iconfont.css'

// 传入 vuex
Vue.prototype.$request = request

window.$tools = tools

// window._ = _

Vue.prototype.$api = api

// 阻止页面记住滚动
// 在 iphone 上使用，会出现左滑卡顿问题
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// 兼容低版本浏览器(caniuse)，需要引入polyfill
// require('es6-promise').polyfill()

// const FastClick = require('fastclick')

// 添加Fastclick移除移动端点击延迟
// FastClick.attach(document.body)

// vue 组件/工具
Vue.use(ElementUI)
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
