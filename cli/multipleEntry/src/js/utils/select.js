/* eslint-disable */
const Select = function(config) {
  this.isShow = false
  this.oList = config.obj.find('.form-select_list')
  this.oIcon = config.obj.find('.form-select_icon')
  this.oValue = config.obj.find('.value')
  this.oSelect = config.obj
  this.change = config.change || false
  this.selectIndex = -1
  this.documentHandle = null
  this.prevValue = ''
  this.init()
}

Select.prototype = {
  init() {
    this.setPhValue()
    this.documentHandle = this.hide.bind(this)
    this.oSelect.on('click', (e) => {
      e.stopPropagation()
      this.oList.toggleClass('show')
      this.oIcon.toggleClass('show')
      this.isShow = !this.isShow
      if (this.isShow) {
        document.addEventListener('click', this.documentHandle, false)
      }
    })
    this.oList.on('click', this.selectItem.bind(this))
  },

  selectItem(e) {
    if (!this.isShow) return false
    e.stopPropagation()
    e.preventDefault()
    const target = e.target
    const index = target.getAttribute('data-index') || -1
    if (index > -1) {
      this.selectIndex = index
      this.oList.find('.on').removeClass('on')
      const obj = this.oList.find(`.form-select_item:eq(${index})`)
      const id = obj.attr('data-id')
      if (this.prevValue === id) return false
      this.prevValue = id
      obj.addClass('on')
      this.updateValue(id, obj.html())
      this.hide()
    }
  },

  updateValue(id, value) {
    this.oValue[this.selectIndex >= 0 ? 'removeClass' : 'addClass']('isSelect').html(value)
    this.change && this.change(id, this.selectIndex, value)
  },

  hide() {
    this.oList.removeClass('show')
    this.oIcon.removeClass('show')
    this.isShow = false
    document.removeEventListener('click', this.documentHandle, false)
  },

  setPhValue() {
    this.oValue.addClass('isSelect').html(this.oSelect.attr('placeholder'))
  }
}

export default Select
