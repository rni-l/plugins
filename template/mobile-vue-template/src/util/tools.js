// 通用方法
export default {
  regexp: {
    phone: /^1[34578]{1}\d{9}$/,
    email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    integer: /^(0|[1-9][0-9]*)$/,
    floor: /^\d+(\.\d{1,4})?$/,
    number: /^\d*$/,
    qq: /^[1-9][0-9]{4,9}$/gim,
    chinese: /[\u4e00-\u9fa5]/, // 是否中文
    code: /^[1-9]\d{5}$/g, // 邮政编码
    IdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证
    pwd: /^[_a-zA-Z0-9]+$/, // 密码(包含数字字母大小写下划线)
    ip: /(\d+)\.(\d+)\.(\d+)\.(\d+)/ // ip地址
  },
  // 检查微信环境
  checkWechat() {
    const ua = window.navigator.userAgent
    return /MicroMessenger/.test(ua)
  },
  // 检查支付宝环境
  checkAlipay() {
    const ua = window.navigator.userAgent
    return /AlipayDefined/.test(ua)
  },
  // 检查 ios 环境
  checkIos() {
    const ua = window.navigator.userAgent
    return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua)
  },
  // 检查 android 环境
  checkAndroid() {
    const ua = window.navigator.userAgent
    return /Android/i.test(ua)
  },
  /**
   * date * 时间对象
   * options * 配置参数
     * dayDelimiter String, * 年月日分隔符，默认 -
     * timeDelimiter String, * 时分秒分隔符，默认 :
     * ifHaveTime Boolean, * 是否需要时分秒，默认 false
   */
  formatDate(date, options) {
    if (!date || !date.getFullYear()) {
      throw new Error('请传入时间对象')
    }
    options = options || {}
    options.dayDelimiter = options.dayDelimiter || '-'
    options.timeDelimiter = options.timeDelimiter || ':'
    let str = ''
    str = date.getFullYear() + options.dayDelimiter + (date.getMonth() + 1) + options.dayDelimiter + date.getDate()
    if (options.ifHaveTime) {
      str += ' ' + date.getHours() + options.timeDelimiter + date.getMinutes() + options.timeDelimiter + date.getMilliseconds()
    }
    return str
  },
  /**
   * 动态加载 js 文件
   * opts: {} 配置参数
     * obj String, * 加载 js 文件后的 全局对象 必填
     * url String, * 加载 js 的路径，必填
     * callback Function, 加载完毕后的回调函数，如果对象存在，直接触发回调
   */
  loadJS(opts) {
    if (!(opts.obj && opts.obj !== 0)) {
      throw new Error('请传入全局对象名')
    }
    if (!opts.url) {
      throw new Error('请传入js资源地址')
    }
    if (window[opts.obj]) {
      return opts.callback && opts.callback()
    }
    const oScript = document.createElement('script')
    oScript.src = opts.url
    oScript.onload = () => {
      opts.callback && opts.callback()
    }
    document.body.appendChild(oScript)
  }
}
