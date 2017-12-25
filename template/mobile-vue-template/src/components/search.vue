<template>
  <div class="u-search" :class='searchStatus === "focus" ? "u-search-active" : ""'>
    <div class='u-search-icon' @click='search'></div>
    <input class='u-search-input' 
           :style="{width: width}"
           v-model='kw' type="text"
           :class='searchStatus === "focus" ? "u-search-active" : ""'
           @focus='searchFocus'
           @blur='searchBlur'>
    <div class="u-search-close" @click='closeSearch' v-show='kw !== defaultKeyword && kw !== "" '></div>
  </div>
</template>

<script>
export default {

  name: 'uSearch',
  props: {
    keyword: {
      type: String,
      default: ''
    },
    defaultKeyword: {
      type: String,
      default: '请输入搜索内容'
    },
    searchCallback: {
      type: Function
    },
    closeCallback: {
      type: Function
    }
  },
  data() {
    return {
      kw: '',
      searchStatus: 'blur',
      width: 'auto'
    }
  },
  created() {
    this.kw = this.defaultKeyword
    this.width = ((this.defaultKeyword.length * (0.346667 * window.rem)) + 5) + 'px'
  },
  methods: {
    // 搜索
    search() {
      let keyword = this.kw
      if (keyword === this.defaultKeyword) {
        keyword = ''
      }
      this.searchCallback(keyword)
    },
    // 清除搜索结果
    closeSearch() {
      this.closeCallback()
      this.kw = this.defaultKeyword
      this.searchStatus = 'blur'
    },
    searchFocus() {
      this.searchStatus = 'focus'
      if (this.kw === this.defaultKeyword) {
        this.kw = ''
      }
    },
    searchBlur() {
      if (this.kw === '') {
        this.searchStatus = 'blur'
        this.kw = this.defaultKeyword
      }
    }
  }
}
</script>

<style lang="less">
.u-search{
  height: 60px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  &-icon{
    width: 24px;
    height: 23px;
    margin: 0 10px 0 35px;
    .x-backgroundCover("../assets/icon/search-grey.png");
  }
  &-input{
    display: block;
    height: 100%;
    font-size: 26px;
    color: #A0A1A2;
    width: auto;
    text-align: center;
  }
  &-close{
    width: 52px;
    height: 52px;
    .x-backgroundCover("../assets/icon/search-close.png");
  }
  &-active{
    flex: 1;
    text-align: left;
  }
}

</style>
