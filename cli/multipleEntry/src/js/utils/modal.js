import tools from './tools.js'

const Modal = function(config) {
  this.confirm = () => { }
  this.cancel = () => { }
}

Modal.prototype = {
  createDom(className, { title = '提示', confirmTxt = '确认', cancelTxt = '取消' }) {
    return `<div class='u-modal ${className}'>
      <div class='u-modal_cover'>
      <div class='u-modal_wrap'>
        <div class='u-modal_title'>${title}</div>
        <div class='u-modal_btnWrap'>
          <div class='u-modal_confirm u-modal_btn'>${confirmTxt}</div>
          <div class='u-modal_cancel u-modal_btn'>${cancelTxt}</div>
        </div>
      </div>
    </div>`
  },

  show(data = {}) {
    const id = this.createId()
    $('body').append(this.createDom(id, data))
    const obj = $('.' + id)
    console.log(this.confirm)
    obj.find('.u-modal_confirm').on('click', function() {
      obj.remove()
      data.confirm && data.confirm()
    })
    obj.find('.u-modal_cancel').on('click', function() {
      obj.remove()
      data.cancel && data.cancel()
    })
    
  },

  createId() {
    return new Date().getTime() + tools.getRandom(5)
  }
}

export default Modal
