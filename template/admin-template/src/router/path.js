const router = [
  { path: '/', redirect: '/home' },
  { path: '/home', meta: { title: '首页' }, component: resolve => require(['@/module/main/main'], resolve) }
]

export default router
