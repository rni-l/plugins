import request from '@/util/request'

/**
 * 处理参数的方法（为了后面开发可拓展）
 * @params {Object} opts  -- 配置参数
 * @params {String} url  -- 请求域名
 * @returns {Object} { url } -- 请求域名
 * @returns {Object} { errType } -- 错误处理方式
 */

function dealOpts(url, opts) {
  return {
    url,
    errType: (opts && opts.errType) || ''
  }
}

/**
 * 请求方法
 * @params {Object} params  -- 请求所带的参数(可选)
 * @params {Object} opts  -- 配置参数(可选)
 */

const getCaptcha = (params, opts) => {
  return request.get(dealOpts('/admin/api/adminUser/checkLogin', opts), params)
}

export default {
  getCaptcha
}
