import route from 'koa-router'
import { index } from './../controllers'

const router = route()

router.get('/', async (ctx, next) => {
  const data = await index()
  await ctx.render('index', {
    title: data[0].name
  })
})

export default router
