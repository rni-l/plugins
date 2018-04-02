/* eslint-disable */
import Router from 'vue-router'

export default new Router({
  mode: 'hash',
  base: '/wechat',
  scrollBehavior(to, from, savedPosition) {
    // 对于所有路由导航，简单地让页面滚动到顶部
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: '/home' },
    // 其他页面
    { name: 'home', path: '/home', meta: { title: '首页' }, component: resolve => require(['@/module/home'], resolve) },
    { name: 'login', path: '/login', meta: { title: '登录' }, component: resolve => require(['@/module/sys/login'], resolve) },
    { name: 'sysError', path: '/sysError', meta: { title: '系统繁忙' }, component: resolve => require(['@/module/sys/sysError'], resolve) },
    { name: 'wechatError', path: '/wechatError', meta: { title: '系统繁忙' }, component: resolve => require(['@/module/sys/wechatError'], resolve) }
  ]
})
