<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="less">
  @rem: 1;
  /* 
   *************************************  样式重置 *******************************************
   */
  html, body {
    height: 100%;
    width: 100%;
    font-family: PingFangSC-Regular,"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    // 去除iOS点击DOM元素出现的半透明色块
    -webkit-tap-highlight-color: transparent;
    // 触摸顺滑
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  body {
    font-size: 12px;
    background: @t-background;
    // 优化字体渲染
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  * {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  img, input, button, textarea {
    border: none;
  }
  input, button {
    outline: none;
    &:focus {
      outline: none;
    }
  }
  textarea {
    resize: none;
  }
  // h1, h2, h3, h4, h5, h6
  h1, h2, h3, h4, h5, h6, a, input, select, button, option, textarea {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    line-height: inherit;
    color: inherit;
    outline: none;
  }

  /*取消部分浏览器`input[type='number']`的默认样式*/
  input[type='number'] {
      -moz-appearance: textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
      margin: 0;
      -webkit-appearance: none;
  }


  // layout
  #app {
    height: 100%;
  }

 /* 
   *************************************  原子类 *******************************************
   */
  .f-pr {
    position: relative;
  }
  .f-pa {
    position: absolute;
  }
  .f-pf {
    position: fixed;
    -webkit-transform: translateZ(0);
  }
  .f-clearfix {
    &::after {
      content: '';
      clear: both;
      display: block;
      height: 0;
      font-size: 0;
    }
  }
  .f-flex {
    display: flex;
  }
  .f-levelCenter {
    display: flex;
    justify-content: center;
  }
  .f-verticalCenter {
    display: flex;
    align-items: center;
  }
  .f-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .f-flexWrap {
    flex-wrap: wrap;
  }
  .f-flex-jc-sb {
    justify-content: space-between;
  }
  .f-flex-jc-sa {
    justify-content: space-around;
  }
  .f-flex-ac-center {
    align-content: center;
  }
  .f-flex-ai-start {
    align-items: flex-start;
  }
  .f-flex-ai-end {
    align-items: flex-end;
  }
  .f-flexOne {
    flex: 1;
  }

  // 固定
  .f-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // 防止抖动
    -webkit-transform: translateZ(0);
  }
  .f-txtHide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 
   *************************************  公共组件 *******************************************
   */
  //  选择器 css
  .u-select-container {
    height: 100%;
    width: 100%;
    position: fixed;
    // top: 3.6rem;
    // left: 0;
    // right: 0;
    bottom: 0;
    z-index: 97;
    .picker-slot.picker-slot-divider {
      position: relative!important;
      z-index: 0!important;
    }

    .btn-wrap {
      background: white;
      font-size: 32px !important;
      padding: 20px 0;
      border-bottom: solid 1px #d8d8d8;
      display: flex;
      text-align: center;
      .btn{
        width: 50%;
      }
      .btn-cancel {
        color: red;
      }
      .btn-sure {
        color: #3870ce;
      }
    }

    .pick-model {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.4);
      transition: .5s;
      z-index: 98;
    }

    .pick-mark {
      position: absolute;
      z-index: 99;
      width: 100%;
      bottom: 0;

      .picker {
        background: white;
      }
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }

    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 1.0, 1.0, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateY(1.333333rem);
      opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }

    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .picker-slot {
      font-size: 30px !important;
    }
  }
  
  // mint-messagebox
  body{
    .mint-msgbox{
      width: 540px * @rem;
      border-radius:14px * @rem;
      &-header{
        padding: 0 0 18px * @rem;
      }
      &-content{
        padding: 0 20px * @rem 30px * @rem;
        min-height: 36px;
      }
      &-title{
        font-size: 36px * @rem;
        padding: 42px * @rem 15px * @rem 0;
        line-height: 1.5;
      }
      &-message{
        font-size: 30px * @rem;
        line-height: 1.5;
      }
      &-errormsg{
        min-height: 100%;
      }
      &-input{
        padding-top: 15px * @rem;
        input{
          padding: 5px * @rem;
          height: 65px * @rem;
          width: 100%;
          box-sizing: border-box;
        }
      }
      &-btns{
        padding: 0;
        height: 100px * @rem;
      }
      &-btn{
        height: auto;
        line-height: 1;
        font-size: 36px * @rem;
      }
    }

  }

</style>
