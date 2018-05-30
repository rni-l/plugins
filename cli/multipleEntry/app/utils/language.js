/**
 * 静态文本，分为英语和繁体
 */

const language = {
  cn: {
    isEn: false,
    welcome: {
      title: '歡迎',
      btnTxt: '官網主頁'
    },
    home: {
      title: '首頁',
      btnTxt: '查看詳情'
    },
    detail: {
      title: '詳情頁',
      disableBtnTxt: '已售空',
      inventoryTxt: '剩餘庫存：',
      btnTxt: '添加到購物車',
      prompTxt: '请选择商品数量',
      addPrompTxt: '正在添加商品中...'
    },
    cart: {
      title: '購物車',
      productTxt: '產品類型',
      btnTxt: '結算',
      disableBtnTxt: '已售空',
      deleteTxt: '刪除',
      totalTxt: '總計 RMB',
      configTxt: '免費配送'
    },
    shippingAddress: {
      title: '收貨地址',
      promptTxt: '我們將通過郵箱與手機短信向您發送訂單相關信息，為了節省您的寶貴時間，請填寫正確信息',
      addressTitleTxt: '收貨地址',
      callTxt: '稱呼：',
      surnamesTxt: '姓氏：',
      nameTxt: '名稱：',
      provinceTxt: '省：',
      cityTxt: '市：',
      areaTxt: '區：',
      addressTxt: '詳細地址：',
      deliveryNotifc: '發貨通知',
      phoneTxt: '手機號碼：',
      emailTxt: '電子郵箱：',
      deliveryPrompt: '訂單發貨後我們將通過郵箱和手機短信的方式通知您，手機號碼和收件手機號相同.',
      btnTxt: '提交訂單',
      submitTxt: '提交訂單',
      callTxtPD: '請選擇',
      publicPD: '請選擇',
      surnamesPD: '請輸入您的姓氏',
      namePD: '請輸入您的名稱',
      provincePD: '省份 / 直轄市',
      areaPD: '縣 / 區',
      addressTxtPD: '請輸入街道、門牌號碼等詳細地址',
      phoneTxtPD: '請輸入您的手機號碼',
      emailTxtPD: '請輸入您的郵箱賬號',
      errorPrompt: {
        call: '請選擇',
        surnames: '請輸入您的姓氏，1 - 20 个字符',
        name: '請輸入您的名稱，1 - 20 个字符',
        province: '請選擇省份 / 直轄市',
        address: '請輸入您的詳細地址，1 - 100 个字符',
        phone: '請輸入正確的手機號碼',
        email: '請輸入正常的郵箱地址'
      },
      sir: '先生',
      lady: '女士',
      confirmTxt: '是否確認提交訂單'
    },
    checkOrder: {
      title: '訂單支付',
      addressTitleTxt: '送貨地址',
      orderNoTxt: '訂單號：',
      recipientTxt: '收件人：',
      recipitAddressTxt: '收件地址：',
      notifcEmailTxt: '通知郵箱：',
      recipientAddressTxt: '收貨地址：',
      goodsTitleTxt: '訂單商品',
      payTypeTxt: '付款方式',
      alipayTxt: '支付寶',
      wechatTxt: '微信支付',
      payPromptTxt: '請您在15分钟內付款以免訂單被取消，如有疑問，請聯系客服（客服熱線 400-8888-8888）；',
      totalTxt: '總計 RMB ',
      totalPromptTxt: '免費配送',
      payBtnTxt: '立即支付',
      qrcodeTxt: '請使用 支付寶 請使用 支付寶 掃壹掃 掃壹掃'
    },
    paySuccess: {
      title: '支付成功',
      resultTitle: '支付成功!',
      resultTitle2: '我们会尽快为您发货！',
      orderTxt: '訂單號：',
      paymentTxt: '支付金額：',
      orderPromptTxt: '发货物流信息我们将以邮件方式通知您。',
      qrcodeTitle: '扫码关注微信公众号',
      qrcodePromptTxt: '查看物流信息、售后服务、享受更多优惠与特权'
    },
    payFail: {
      title: '支付失敗',
      resultTitle: '支付失敗!',
      resultTitle2: '請重新支付訂單',
      orderTxt: '訂單號',
      paymentTxt: '支付金額',
      btnTxt: '重新支付',
      qrcodeTitle: '扫码关注微信公众号',
      qrcodePromptTxt: '查看物流信息、售后服务、享受更多优惠与特权'
    },
    business: {
      title: '商务合作',
      form: {
        name: '您的姓名：',
        email: '您的郵箱：',
        msg: '您的需求 / 合作意向'
      },
      ph: {
        name: '請輸入您的姓名',
        email: '請輸入您的郵箱',
        msg: '請您描述您的需求或者合作意向，我們會盡快聯系您。'
      },
      btnTxt: '確認提交',
      successTxt: '提交成功'
    },
    public: {
      aboutUs: '關於我們',
      product: '品牌介紹',
      cooperation: '商務合作',
      footerDesc: 'Copyright © 2015-2018 sketch.im. All rights reserved',
      asideTitle: '商品列表',
      shoppingCart: {
        title: '购物车',
        totalTxt: '累计',
        btnTxt: '去支付',
        quantityTxt: '数量：',
        priceTxt: '价格：'
      },
      modal: {
        confirmTxt: '确认',
        cancelTxt: '取消',
        deleteTxt: '确认删除该商品？'
      },
      languageBtn: 'EN',
      link_welcome: '/welcome?ln=cn',
      link_home: '/?ln=cn',
      link_detail: '/detail?ln=cn',
      link_cart: '/cart?ln=cn',
      link_address: '/shippingAddress?ln=cn',
      link_pay: '/pay?ln=cn'
    }
  },
  en: {
    isEn: true,
    welcome: {
      title: 'welcome',
      btnTxt: 'SHOWPOW'
    },
    home: {
      title: 'home',
      btnTxt: 'DETAILS'
    },
    detail: {
      title: 'detail',
      disableBtnTxt: 'SOLD OUT',
      inventoryTxt: 'inventory：',
      btnTxt: 'ADD TO CART',
      prompTxt: 'Please select the quantity of goods',
      addPrompTxt: 'The goods is being added...'
    },
    cart: {
      title: 'Shopping cart',
      productTxt: 'Product type：',
      disableBtnTxt: 'SOLD OUT',
      btnTxt: 'SETTLEMENT',
      deleteTxt: 'Delete',
      totalTxt: 'Total RMB',
      configTxt: 'Free delivery'
    },
    shippingAddress: {
      title: 'Detailed address',
      promptTxt: 'We will be sent via email and SMS to your order information, in order to save your precious time, please fill in the correct information.',
      addressTitleTxt: 'Harvest address',
      callTxt: 'Call：',
      surnamesTxt: 'Surnames: ',
      nameTxt: 'Name: ',
      provinceTxt: 'Provinces: ',
      cityTxt: 'City: ',
      areaTxt: 'Area：',
      addressTxt: 'Detailed address: ',
      deliveryNotifc: 'Delivery notifc',
      phoneTxt: 'Mobile phone number: ',
      emailTxt: 'Email: ',
      deliveryPrompt: 'Orders after shipment we will inform you by email and mobile phone short messages, phone number and a mobile phone number is the same..',
      btnTxt: 'SUBMIT ORDERS',
      submitTxt: 'SUBMIT ORDERS',
      callTxtPD: 'Please select',
      publicPD: 'Please select',
      surnamesPD: 'Please enter',
      namePD: 'Please enter',
      provincePD: 'Provinces / municipalities',
      areaPD: 'Country / district',
      addressTxtPD: 'Please enter street, house number and detailed address',
      phoneTxtPD: 'Please enter',
      emailTxtPD: 'Please enter',
      errorPrompt: {
        call: 'Please select',
        surnames: 'Please enter your surnames, 1 - 20 characters',
        name: 'Please enter your name, 1 - 20 characters',
        province: 'Please select province or municipality',
        address: 'Please enter your detailed address, 1 - 100 characters',
        phone: 'Please enter the correct phone number',
        email: 'Please enter the correct email'
      },
      sir: 'sir',
      lady: 'lady',
      confirmTxt: 'Confirm whether to submit the order.'
    },
    checkOrder: {
      title: 'Terms of payment',
      addressTitleTxt: 'Shipping address',
      orderNoTxt: 'Order number：',
      recipientTxt: 'The recipient：',
      recipitAddressTxt: 'Address：',
      notifcEmailTxt: 'Shipping nofitication：',
      recipientAddressTxt: 'Electroinc invoice：',
      goodsTitleTxt: 'Orders for goods：',
      payTypeTxt: 'Terms of payment',
      alipayTxt: 'Pay treasure',
      wechatTxt: 'WeChat pay',
      payPromptTxt: 'Would you please order payment within 1 hour so as not to be cancelled, if there are any questions, please contact customer service (customer service hotline at 400-8888-8888);',
      totalTxt: 'Total RMB ',
      totalPromptTxt: 'Free delivery',
      payBtnTxt: 'PAYMENT',
      qrcodeTxt: 'Please use the pay treasure to scan qrcode to complete the payment'
    },
    paySuccess: {
      title: 'Pay Success',
      resultTitle: 'Pay Success!',
      resultTitle2: 'We will delivery soon as possible!',
      orderTxt: 'Order：',
      paymentTxt: 'Amount：',
      orderPromptTxt: 'Shipping logistics information we will notify you by email.',
      qrcodeTitle: 'Focus on WeChat public',
      qrcodePromptTxt: 'Check the logistics information, after-sales service, to enjoy more discounts and privileges'
    },
    payFail: {
      title: 'Pay Failure',
      resultTitle: 'Pay Failure!',
      resultTitle2: 'Please pay again!',
      orderTxt: 'Order：',
      paymentTxt: 'Amount：',
      btnTxt: 'Pay',
      qrcodeTitle: 'Focus on WeChat public',
      qrcodePromptTxt: 'Check the logistics information, after-sales service, to enjoy more discounts and privileges'
    },
    business: {
      title: 'cooperation',
      form: {
        name: 'Your name：',
        phone: 'Your email',
        msg: 'Your demand / cooperation intentions'
      },
      ph: {
        name: 'Please enter your name',
        phone: 'Please enter your email',
        msg: 'Please briefly tell us what you need or your intent for business collboration. We will contact you as soon as possible.'
      },
      btnTxt: 'CONFIRM SUBMIT',
      successTxt: 'submitted successfully'
    },
    public: {
      aboutUs: 'ABOUT US',
      product: 'JOIN US',
      cooperation: 'JOIN US',
      footerDesc: 'Copyright © 2015-2018 sketch.im. All rights reserved',
      asideTitle: 'List goods',
      languageBtn: '繁',
      shoppingCart: {
        title: 'shopping cart',
        totalTxt: 'A total of',
        btnTxt: 'PAYMENT',
        quantityTxt: 'Quantity：',
        priceTxt: 'Price:'
      },
      modal: {
        confirmTxt: 'confirm',
        cancelTxt: 'cancel',
        deleteTxt: 'Confirm to delete this goods?'
      },
      link_welcome: '/welcome?ln=en',
      link_home: '/?ln=en',
      link_detail: '/detail?ln=en',
      link_cart: '/cart?ln=en',
      link_address: '/shippingAddress?ln=en',
      link_pay: '/pay?ln=en'
    }
  }
}

module.exports = language
