import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import router from '@/router'
import store from '@/store/index'
import { Toast, MessageBox } from 'mint-ui'
import config2 from '../../private-config'

// API 服务器地址
const publicPath = config2.publicPath

// axios 默认配置
axios.defaults.timeout = 60000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 请求时的拦截器
axios.interceptors.request.use(config => {
  // 这里可以加一些动作, 比如来个进度条开始动作
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => response, error => {
  // 这里我们把错误信息捕捉, 后面就不需要写 catch 了
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  NProgress.done()
  // 如果 http 状态码正常, 则直接返回数据
  if (response.status === 200 || response.status === 304) {
    // 这里, 如果不需要除 data 外的其他数据, 可以直接 return response.data, 这样可以让后面的代码精简一些
    // return {
    //   code: response.data.status.errCode,
    //   data: response.data.data
    // }
    if (response.data.status.errCode === 200) {
      return {
        code: response.data.status.errCode,
        data: response.data.data
      }
    }
    return {
      code: response.data.status.errCode,
      data: response.data.status.message
    }
  }
  // 异常状态下, 把错误信息返回去
  return {
    code: response.status,
    data: response.statusText
  }
}

// 处理来自后端的错误
function checkCode(res, type) {
  if (type !== 'notDeal') {
    // 需要处理
    if (res.code === 506) {
      Toast('请重新登录')
      store.commit('updateTest', 123)
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

export default {
  post(opts, data) {
    return axios({
      method: 'post',
      url: publicPath + opts.url,
      data: qs.stringify(data)
    }).then(checkStatus).then(res => {
      return checkCode(res, opts.errType)
    })
  },
  get(opts, params) {
    return axios({
      method: 'get',
      url: publicPath + opts.url,
      params
    }).then(checkStatus).then(res => {
      return checkCode(res, opts.errType)
    })
  }
}
