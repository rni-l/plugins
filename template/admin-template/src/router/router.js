import Router from 'vue-router'
import path from './path'

export default new Router({
  mode: 'hash',
  base: '',
  scrollBehavior(to, from, savedPosition) {
    // 对于所有路由导航，简单地让页面滚动到顶部
    return { x: 0, y: 0 }
  },
  routes: path
})
