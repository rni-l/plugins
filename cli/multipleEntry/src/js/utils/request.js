/* eslint-disable */
import config2 from '../../../config.js'
import axios from 'axios'
import qs from 'qs'

// API 服务器地址
const publicPath = config2.publicPath

// axios 默认配置
axios.defaults.timeout = 6000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 请求时的拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  console.error('请求出错：', error)
  console.dir(error)
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => response, error => {
  // 这里我们把错误信息捕捉, 后面就不需要写 catch 了
  console.error('请求响应出错：', error)
  console.dir(error)
  return Promise.resolve(error.response || error)
})

/**
 * 根据请求返回的 response，判断是否出错了，如果返回的不是 Object 类型的就进行处理
 * @param {*} response 请求返回的 response 或者 Error
 */
const handleResponseError = function (response) {
  const paramType = Object.prototype.toString.call(response)
  // 返回的数据不是返回 object 类型的
  if (paramType !== '[object Object]') {
    let code = 50000
    let data = '系统繁忙'
    if (paramType === '[object String]') {
      code = 50001
      data = response
    } else if (paramType === '[object Error]') {
      if (response.code === 'ECONNABORTED') {
        code = 50003
        data = '请求超时'
      } else {
        code = 50002
        data = response.message
      }
    }
    return { code, data }
  }
  return false
}

/**
 * 处理请求返回的 response，然后返回一个固定的数据结构
 * @param {*} response 请求返回的 response 或者 Error
 * @return {Object} {}
 * @return {Number} code 状态码
 * @return {Object | String} 返回 Object 通常代表成功，返回了一段数据；返回 String 通常代表错误信息；
 */
function checkStatus(response) {
  const errorData = handleResponseError(response)
  if (errorData) return errorData
  const { status, data, statusText } = response
  // 如果 http 状态码正常, 则直接返回数据
  if (status === 200 || status === 304) {
    if (data.status.errCode === 200) {
      return {
        code: data.status.errCode,
        data: data.data
      }
    }
    return {
      code: data.status.errCode,
      data: data.status.message
    }
  }
  // 异常状态下, 把错误信息返回去
  return {
    code: status,
    data: statusText
  }
}

/**
 * 检验 code，处理业务逻辑。可以根据 type 要设置错误提示的方式
 * @param {Object} res 经过 checkStatus 处理的 response
 * @param {String} type 错误方式的处理类型
 * @return {Promise}
 */
function checkCode(res, type) {
  if (type !== 'noProcssing') {
    if (res.code !== 200) {
      // 默认 toast 显示错误信息
      const err = `${res.data}. `
      alert(err)
    }
  }
  return res
}

/**
 * 封装好的 post 和 get 方法
 * @param {Object} opts  -- 配置参数
 * @param {String} opts.url -- 请求路径
 * @param {String} opts.errType -- 处理错误方式
 * @param {Object} data  -- 请求所带的参数
 * @return {Promise} -- 返回一个 promose 对象
 */

export const requestPost = (url, params, opts = {}) => {
  return axios({
    method: 'post',
    url: publicPath + url,
    data: qs.stringify(params)
  }).then(checkStatus).then(res => {
    return checkCode(res, opts.errType)
  })
}

export const requestGet = (url, params, opts = {}) => {
  return axios({
    method: 'get',
    url: publicPath + url,
    params
  }).then(checkStatus).then(res => {
    return checkCode(res, opts.errType || '')
  })
}
