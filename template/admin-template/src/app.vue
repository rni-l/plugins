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
  /* 
   *************************************  样式重置 *******************************************
   */
  html, body {
    font-family: PingFangSC-Regular,"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  body {
    font-size: 12px;
    background: @t-background;
    // 优化字体渲染
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
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


</style>
