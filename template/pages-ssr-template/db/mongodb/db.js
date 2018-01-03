const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/canvas', { useMongoClient: true })
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(e){
  console.log('open', e)
})
// 设置默认值
const Schema = mongoose.Schema


module.exports = Schema
