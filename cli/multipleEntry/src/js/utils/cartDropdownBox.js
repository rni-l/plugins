import tools from './tools.js'
import { requestGet } from './request.js'
// import Toast from './toast.js'
// import { createDecipher } from 'crypto'

const isEn = $('body').attr('isen') === 'en'

// 更新下拉框的购物车列表
const updateCartDom = (data) => {
  const $list = $('.u-header_cartBox .product-list')
  const link_detail = $list.attr('link_detail')
  const quantityTxt = $list.attr('quantityTxt')
  const priceTxt = $list.attr('priceTxt')
  let str = ''
  let price = 0
  data.forEach(v => {
    price += (v.price * v.quantity)
    str += `<div class='product-item'>
      <div class='img'></div>
      <div class='right'>
        <a class='title' href='${link_detail}&id=${v.id}')>${isEn ? v.englishName : v.chineseTraditionalName}</a>
        <div class='line'>
          <span>${quantityTxt}</span>
          <div class='value'>${v.quantity}</div>
        </div>
        <div class='line'>
          <span>${priceTxt}</span>
          <div class='value'>${v.price}</div>
        </div>
      </div>
    </div>`
  })
  $list.html(str)
  if (data.length <= 0) {
    $('.u-header_cart_num').hide()
  } else {
    $('.u-header_cart_num').html(data.length).fadeIn()
  }
  $('.u-header .priceBox .price').html(`$${parseFloat(price, 10).toFixed(2)}`)
}

/**
 * @param {*} observer 观察者对象，用来生成订阅者
 */
const init = (observer) => {
  const sub = observer.createSubscriber()
  updateCartDom(tools.getCartDataForSessionStorage())
  sub.addListener('updateCart', async (id, quantity) => {
    // 请求接口，获取产品的详情
    const { code, data } = await requestGet('/api/commodity/getCommodityDetails', { id })
    if (code === 200) {
      let cartData = tools.getCartDataForSessionStorage()
      const tmp = {
        ...data,
        quantity
      }
      // 查看缓存中，是否有相同的
      const isHadSame = cartData.some((v, i) => {
        if (v.id === id) {
          cartData[i] = {
            ...v,
            quantity: v.quantity + tmp.quantity
          }
          return true
        }
        return false
      })
      if (!isHadSame) {
        cartData.push(tmp)
      }
      updateCartDom(cartData)
      sessionStorage.cartData = JSON.stringify(cartData)
    }
  })
}

export default init
