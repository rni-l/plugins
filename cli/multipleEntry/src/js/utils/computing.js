/**
 * 计算器功能组件
 * @param {*} config 配置参数
 */
const Computing = function(config) {
  this.$reduce = $(config.reduceObj)
  this.$add = $(config.addObj)
  this.$num = $(config.numberObj)
  this.$remainingObj = config.remainingObj ? $(config.remainingObj) : false
  this.number = config.number || 0
  this.remaining = config.max
  this.max = config.max
  this.change = config.change || false
  this.init()
}

Computing.prototype = {
  init() {
    this.updateDom()
    this.$reduce.on('click', this.reduce.bind(this))
    this.$add.on('click', this.add.bind(this))
  },

  reduce() {
    let number = this.number
    number -= 1
    if (number >= 0) {
      this.number -= 1
      this.remaining += 1
      this.updateDom()
    }
  },

  add() {
    let number = this.number
    number += 1
    if (number <= this.max) {
      this.number += 1
      this.remaining -= 1
      this.updateDom()
    }
  },

  updateDom() {
    this.$num.html(this.number)
    this.$remainingObj && this.$remainingObj.html(this.remaining)
    this.change && this.change(this.number)
  }
}

export default Computing
