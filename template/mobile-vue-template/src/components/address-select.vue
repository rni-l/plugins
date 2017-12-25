<template>
  <div class="u-address-select-container u-select-container" v-show="addressShow" @touchmove="cancelMove">
    <transition name="fade" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave">
      <div class="pick-model" v-show="show" @touchstart="handleDismiss"></div>
    </transition>
    <transition name="slide-fade">
      <div class="pick-mark" v-show="show">
        <div class="btn-wrap">
          <a class="btn btn-cancel" @click="handleDismiss">取消</a>
          <a class="btn btn-sure" @click="handleSelect">确定</a>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </transition>
  </div>
</template>

<style lang="less">

</style>

<script>
import City from '../../static/city.json'

const PROVINCES = ['不限', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区']

export default {
  name: 'address-select',
  props: ['show', 'city', 'province', 'provinceData'],
  data() {
    return {
      addressShow: false,
      cityArrayJson: City,
      cityArray: [],
      provinceArray: PROVINCES,
      // 初始化此组件的省份城市默认值
      subProvince: this.province,
      subCity: this.city,
      slots: [
        {
          flex: 1,
          values: PROVINCES,
          textAlign: 'center',
          defaultIndex: 0
        }, {
          divider: true,
          content: '-'
        }, {
          flex: 1,
          values: this.cityArray,
          textAlign: 'center',
          defaultIndex: 0
        }
      ]
    }
  },
  created() {
    if (this.provinceData) {
      this.$set(this.slots[0], 'values', this.provinceData)
    }
  },
  mounted() {
    // 如有传入自定义城市值，定位到对应的省份和城市
    if (this.province) {
      const provinceIndex = this.provinceArray.indexOf(this.province)
      this.slots[0].defaultIndex = provinceIndex
      if (this.city) {
        const cityIndex = this.cityArrayJson[this.province].indexOf(this.city)
        this.$set(this.slots[2], 'defaultIndex', cityIndex)
      } else {
        this.$set(this.slots[2], 'defaultIndex', 0)
      }
    } else {
      this.$set(this.slots[0], 'defaultIndex', 0)
    }
  },
  methods: {
    beforeEnter() {
      this.addressShow = true
    },
    afterLeave() {
      this.addressShow = false
    },
    onValuesChange(picker, slot) {
      this.subProvince = slot[0] === '不限' ? '' : slot[0]
      this.subCity = slot[1]
      this.$set(this.slots[2], 'values', this.cityArrayJson[this.subProvince])
    },
    // 选中的省份和城市传递到父组件
    handleSelect() {
      if (!this.subCity) {
        this.subCity = ''
      }
      this.$emit('handleSelect', this.subProvince, this.subCity, false)
    },
    // 触发父组件内的函数更改show的值
    handleDismiss() {
      this.$emit('handleDismiss', false)
    },
    cancelMove(e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>
