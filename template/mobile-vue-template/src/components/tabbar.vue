<template>
  <div class="mint-tabbar m-tabbar is-fixed">
    <a class="mint-tab-item" :class='selectedData === "home" ? "is-selected" : ""' @touchend='selectTab("home")'>
      <!-- 
      <div class="mint-tab-item-icon"><img :src="{ selectedData === 'home ? '' : ''}" slot="icon"></div> -->
      <div class="mint-tab-item-label">首页</div>
    </a>
    <a class="mint-tab-item" :class='selectedData === "release" ? "is-selected" : ""' @touchend='selectTab("release")'>
      <!-- <div class="mint-tab-item-icon"><img :src="{ selectedData === 'home ? '' : ''}" slot="icon"></div> -->
      <div class="mint-tab-item-label">发布</div>
    </a>
    <a class="mint-tab-item" :class='selectedData === "personal" ? "is-selected" : ""' @touchend='selectTab("personal")'>
      <!-- <div class="mint-tab-item-icon"><img :src="{ selectedData === 'home ? '' : ''}" slot="icon"></div> -->
      <div class="mint-tab-item-label">个人中心</div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'tabbar',
    props: {
      selected: {
        type: String,
        default: 'home'
      }
    },
    data() {
      return {
        selectedData: 'personal'
      }
    },
    created() {
      this.selectedData = this.selected
    },
    methods: {
      selectTab(type) {
        this.selectedData = type
        this.$router.push({ name: type })
      }
    }
  }
</script>

<style lang="less">
.m-tabbar{
  .mint-tabbar {
    color: #9B9B9B;
  }
  .mint-tab-item{
    .mint-tab-item-icon{
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:nth-child(1) {
      img{
        width: 45.5px;
        height: 45.5px;
      }
    }
    &:nth-child(2) {
      img{
        width: 44px;
        height: 44px;
      }
    }
    &:nth-child(3) {
      img{
        width: 40px;
        height: 48px;
      }
    }
  }
  .mint-tabbar > .mint-tab-item.is-selected  {
    background-color: transparent !important;
    .mint-tab-item-label {
      color: #1168C6;
    }
  }
  .mint-tab-item.is-selected{
    background: transparent !important;
  }
}
</style>
