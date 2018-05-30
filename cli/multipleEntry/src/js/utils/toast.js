import tools from './tools.js'
/**
 * Toast 组件
 * @param {*} config 配置参数
 */
const Toast = function(config = {}) {
  this.time = config.time || 2000
}

Toast.prototype = {
  createDom(className, value) {
    return `<div class='u-toast ${className}'>${value}</div>`
  },

  show(value) {
    const id = this.createId()
    $('body').append(this.createDom(id, value))
    const obj = $('.' + id)
    setTimeout(() => {
      obj.addClass('show')
    }, 0)
    setTimeout(() => {
      obj.addClass('hide')
      setTimeout(() => {
        obj.remove()
      }, 1000)
    }, this.time)
  },

  createId() {
    return new Date().getTime() + tools.getRandom(5)
  }
}

export default Toast
