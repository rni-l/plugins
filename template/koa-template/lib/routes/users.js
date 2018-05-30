import route from 'koa-router'
import { index } from './../controllers'

const router = route()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

export default router
