import mysql from 'mysql'
import { MYSQL_CONFIG } from './../../config.js'

const pool = mysql.createPool(MYSQL_CONFIG)

function handleData({ data, err }) {
  return {
    data: err ? (typeof err === 'string' ? err : err.sqlMessage) : data,
    code: err ? 500 : 200
  }
}

// 封装一个方法，暴露出去
/**
 * @param String 执行的 sql 语句
 * @return Promise
 */

export default (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err)
        return resolve(handleData({ err }))
      }
      connection.query(sql, (err, data) => {
        if (err) {
          console.error(err)
          return resolve(handleData({ err }))
        }
        console.log('data result:', data)
        resolve(handleData({ data }))
      })
    })
  })
}
