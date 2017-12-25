<template>
  <div class="u-select-container" v-show="ifShow" @touchmove="cancelMove">
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

<script>

export default {
  name: 'uSelect',
  props: ['show', 'slots'],
  data() {
    return {
      ifShow: false,
      data: ''
    }
  },
  mounted() {
  },
  methods: {
    beforeEnter() {
      this.ifShow = true
    },
    afterLeave() {
      this.ifShow = false
    },
    onValuesChange(e, value) {
      this.data = value
    },
    // 触发父组件内的函数更改show的值
    handleDismiss() {
      this.$emit('handleDismiss', false)
    },
    // 返回数据给父组件
    handleSelect() {
      this.$emit('handleSelect', this.data)
    },
    cancelMove(e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>
