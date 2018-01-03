// 引入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
// 实例一个db对象
const db = low(adapter)
// 设置默认值
db.defaults({
  banner: [],
  category: [],
  product: [],
  user: [],
  news: []
}).write()

module.exports = db
