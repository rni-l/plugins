import { app } from './utils/getApp'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import log4js from 'log4js'
import http from 'http'
import debug from 'debug'
// routes
import routesIndex from './routes/index'
import routesUsers from './routes/users'

const _debug = debug('demo:server')

// error handler
onerror(app)

log4js.configure({
  appenders: {
    console: { type: 'console' },
    http: {
      type: 'dateFile', //文件输出
      filename: './logs/app.log',
      pattern: ".yyyy-MM-dd",
      backups: 7,
      level: 'info',
      category: 'http'
    },
    error: {
      type: 'dateFile', //文件输出
      filename: './logs/error.log',
      pattern: "-yyyy-MM-dd",
      backups: 7,
      category: 'error'
    },
    '404': {
      type: 'dateFile', //文件输出
      filename: './logs/404.log',
      pattern: "-yyyy-MM-dd",
      backups: 7,
      level: 'WARN',
      category: '404'
    }
  },
  categories: { default: { appenders: ['http', 'console'], level: 'info' } }
})

const httpLogger = log4js.getLogger('http')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  httpLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routesIndex.routes(), routesIndex.allowedMethods())
app.use(routesUsers.routes(), routesUsers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

/* ./bin/www */

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
// app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback())

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  _debug('Listening on ' + bind)
}
