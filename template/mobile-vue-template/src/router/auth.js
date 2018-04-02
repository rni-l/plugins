import router from '@/router'
import store from '@/store/index'
import tools from '@/util/tools'
import api from '@/api/api'
import CONFIG from './../../private-config'

let environment = '' // 判断当前是什么环境
let authUrl = '' // 要去授权的 url
let ifLogin = false // 是否已经登录
let init = true // 是否已经初始化

// 不需要验证的路由
const errorRouters = ['sysError']
const { origin } = window.location

// 判断用户环境
if (tools.checkWechat()) {
  // 授权
  environment = 'wechat'
  authUrl = origin + '/wechat/xxx'
}

// 缓存当前环境状态
store.commit('updateEnvironment', environment)

function replaceUrlToWechat(publicPath) {
  // 替换路由
  // 1. 自动添加问号(?)
  // 2. 自动把分隔符由#!变成#
  // 3. 分隔符后面，自动判断是否为斜杠(/)，没有则添加上
  const { href, protocol, host } = window.location
  let { search, hash } = window.location
  const pathname = `${publicPath ? publicPath + '/' : '/'}wechat/` // 解决支付路径问题添加的前缀，替换成你的
  search = search || '?'
  hash = hash || '#/'
  const newHref = `${protocol}//${host}${pathname}${search}${hash}`
  return {
    newHref, href
  }
}

async function checkLogin(nxt) {
  // 检验登录状态
  const { code, data } = await api.userCheckLogin()
  if (code === 200) {
    ifLogin = data.hasLogin
    console.log('url:', window.location.href)
    // 未登录 && 未授权 && 有授权链接
    if (!ifLogin && !data.hasOauth && authUrl) {
      console.log('要授权:', authUrl)
      window.location.href = authUrl
    } else {
      // 缓存用户登录状态
      console.log('不需要授权')
      store.commit('updateLogin', ifLogin)
    }
    return false
  } else {
    // errcode !== 200 的情况，统一转到错误页面
    store.commit('updateRequestError', true)
    return true
  }
}

export default () => {
  // 导航钩子，每次变动都会检查登录状态
  router.beforeEach(async (to, from, next) => {
    const PATHNAME = to.name
    console.log('PATHNAME:', PATHNAME)
    // notValidated 方便开发时，可定义是否要走验证流程
    if (!CONFIG.dev.notValidated) {
      // 如果不在微信或支付宝，弹窗提示
      if (!environment) {
        if (PATHNAME === 'wechatError') {
          return next()
        }
        return next({ name: 'wechatError', replace: true })
      } else if (environment === 'wechat') {
        // 微信环境，替换 url
        const { newHref, href } = replaceUrlToWechat(CONFIG.publicPath)
        if (newHref !== href) {
          return window.location.replace(newHref)
        }
      }
      // 首次路由，进行 checkLogin
      if (init) {
        // 如果值为空，就存储第一次进来的位置
        if (!localStorage.firstPath) {
          localStorage.firstPath = PATHNAME || ''
        }
        init = null
        // 第一次验证登录状态
        const isError = await checkLogin(next)
        if (isError) {
          return next({ name: 'sysError', replace: true })
        }
      }
      const loginStatus = store.state.isLogin
      // 未登录，请求报错（超时、404等），是错误路由
      if (!loginStatus && store.state.isRequestError && errorRouters.includes(PATHNAME)) {
        store.commit('updateRequestError', false)
        // 直接显示页面
        return next()
      }

      if (loginStatus) {
        // 如果存在缓存的路由信息，跳转到缓存路由页面
        let name = localStorage.firstToPath
        localStorage.firstToPath = ''
        if (errorRouters.includes(name)) {
          name = 'home'
        }
        if (name && name !== PATHNAME) {
          return next({ name, replace: true })
        } else if (PATHNAME === 'login' || errorRouters.includes(PATHNAME)) {
          return next({ name: 'home', replace: true })
        }
      } else {
        // 非登录状态，如果不是登录页面
        if (PATHNAME !== 'login') {
          return next({ name: 'login', replace: true })
        }
      }
    }
    console.log('next:', PATHNAME)
    document.title = to.meta.title
    next()
  })
}
