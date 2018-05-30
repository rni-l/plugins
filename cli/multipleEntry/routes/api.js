const rp = require('request-promise')
const config = require('./../config')
const publicPath = config.serverUrl

// 配置
const baseOptions = {
  headers: {}
}

const getRequest = (url, params = {}) => {
  return {
    ...baseOptions,
    method: 'GET',
    qs: params,
    json: true,
    uri: `${publicPath}${url}`
  }
}

const postRequest = (url) => {
  return {
    ...baseOptions,
    method: 'POST',
    json: true,
    uri: `${publicPath}${url}`
  }
}

const handleResponseError = function (response, isError) {
  if (isError) {
    return {
      data: response.message,
      code: 49999
    }
  }
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

const handleReponse = (response, isError) => {
  const errorData = handleResponseError(response, isError)
  if (errorData) return errorData
  const { status, data, statusText } = response
  // 如果 http 状态码正常, 则直接返回数据
  if (status.errCode === 200) {
    return {
      code: status.errCode,
      data
    }
  }
  return {
    code: status.errCode,
    data: status.message
  }
}

const getGoodses = async () => {
  return rp(getRequest('/api/commodity/getAllCommodities'))
    .then(res => {
      console.log('request:', res)
      return handleReponse(res)
    })
    .catch(error => {
      console.log('request error:', error)
      return handleReponse(error, true)
    })
}

const getGoodsDetail = async (id) => {
  return rp(getRequest('/api/commodity/getCommodityDetails', { id }))
    .then(res => {
      return handleReponse(res)
    })
    .catch(error => {
      console.log('request error:', error)
      return handleReponse(error, true)
    })
}

module.exports = {
  getGoodses,
  getGoodsDetail
}
