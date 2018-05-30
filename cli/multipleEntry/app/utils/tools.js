const tools = {
  // 数字转换特定形式
  formatNumberToSpecific(number) {
    let str = ''
    if (number < 1000) {
      return number
    }
    const tmp = ('' + number).split('').reverse()
    const len = tmp.length
    tmp.forEach((v, i) => {
      str += v
      if ((i + 1) % 3 === 0 && i != len - 1) {
        str += ','
      }
    })
    return str.split('').reverse().join('')
  }
}

module.exports = tools
