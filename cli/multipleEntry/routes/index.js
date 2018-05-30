var express = require('express')
var router = express.Router()
const language = require('./../app/utils/language')
const api = require('./api')
const tools = require('./../app/utils/tools')
const config = require('./../config')

let asideGoodsData = []

// 开发模式，不请求接口
const IS_STATIC = config.dev.isNotRequest

console.log(IS_STATIC)

const dealOnStaticTxt = (languageType, moduleName) => {
  const obj = language[languageType || 'cn']
  console.log(asideGoodsData.code)
  return {
    ...obj[moduleName],
    isEn: obj.isEn,
    public: language[languageType || 'cn'].public,
    asideGoodsData: asideGoodsData.code === 200 ? asideGoodsData.data : []
  }
}

const routerModule = ['/', '/welcome', '/detail', '/cart', '/shippingAddress', '/pay', '/paySuccess', '/payFail']

router.use('/', async function(req, res, next) {
  const path = req.path
  console.log('router:', path)
  if (!IS_STATIC) {
    if (routerModule.includes(path)) {
      asideGoodsData = await api.getGoodses()
    }
  } else {
    asideGoodsData = {
      code: 200,
      data: [
        { id: 1, chineseTraditionalName: '电子烟1', englishName: 'lqos 2.4Plus1' },
        { id: 2, chineseTraditionalName: '电子烟2', englishName: 'lqos 2.4Plus2' },
        { id: 3, chineseTraditionalName: '电子烟3', englishName: 'lqos 2.4Plus3' },
        { id: 4, chineseTraditionalName: '电子烟4', englishName: 'lqos 2.4Plus4' }
      ]
    }
  }
  next()
})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { ...dealOnStaticTxt(req.query.ln, 'home') })
})

router.get('/welcome', function(req, res) {
  res.render('module/welcome', { ...dealOnStaticTxt(req.query.ln, 'welcome'), welcomeHeader: true })
})

router.get('/detail', async function(req, res) {
  const id = req.query.id || ''
  let formatData = {}
  const publicData = dealOnStaticTxt(req.query.ln, 'detail')
  const isEn = publicData.isEn
  if (!IS_STATIC && id) {
    const { code, data } = await api.getGoodsDetail(id)
    if (code === 200) {
      // 处理中英文，转换为同一名字
      formatData = {
        ...data,
        name: isEn ? data.englishName : data.chineseTraditionalName,
        introduce: isEn ? data.englishIntroduce : data.chineseTraditionalIntroduce,
        formatPrice: tools.formatNumberToSpecific(data.price || 0)
      }
    }
  } else {
    formatData = {
      price: 1,
      stock: 10,
      name: isEn ? 'lqos 2.4Plus4' : '电子烟',
      introduce: '',
      atlasUrlsJson: ['./img/product.png', './img/product.png', './img/product.png'],
      formatPrice: tools.formatNumberToSpecific(10 || 0)
    }
  }
  res.render('module/detail', { ...publicData, detailData: formatData })
})

router.get('/cart', function(req, res) {
  res.render('module/cart', { ...dealOnStaticTxt(req.query.ln, 'cart') })
})

router.get('/shippingAddress', function(req, res) {
  res.render('module/address', { ...dealOnStaticTxt(req.query.ln, 'shippingAddress') })
})

router.get('/pay', function(req, res) {
  res.render('module/pay', { ...dealOnStaticTxt(req.query.ln, 'checkOrder') })
})

router.get('/paySuccess', function(req, res) {
  res.render('module/payResult', { ...dealOnStaticTxt(req.query.ln, 'paySuccess'), result: true })
})

router.get('/payFail', function (req, res) {
  res.render('module/payResult', { ...dealOnStaticTxt(req.query.ln, 'payFail'), result: false })
})

router.get('/business', function (req, res) {
  res.render('module/business', { ...dealOnStaticTxt(req.query.ln, 'business'), result: false })
})

router.get('/email', function (req, res) {
  res.render('module/email', { ...dealOnStaticTxt(req.query.ln, 'email'), result: false })
})

module.exports = router
