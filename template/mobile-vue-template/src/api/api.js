import request from '@/util/request'

function dealOpts(opts, url) {
  return {
    url,
    errType: (opts && opts.errType) || ''
  }
}

const getCaptcha = (params, opts) => {
  return request.get(dealOpts(opts, '/admin/api/adminUser/checkLogin'), params)
}

export default {
  getCaptcha
}
