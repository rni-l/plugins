<template>
  <div class="g-wrapper">
    <main-header></main-header>
    <div class="g-main">
      <main-sidebar></main-sidebar>
      <div class='g-main-view'>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from './header.vue'
import mainSidebar from './sidebar.vue'

export default {
  name: 'home',

  components: {
    mainHeader,
    mainSidebar
  },

  data() {
    return {
      username: 'xx',
      navbars: [
        { name: '内容管理', route: '/admin/site/test' },
        { name: '系统管理', route: '/admin/sys/welcome' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
  .g-wrapper {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
  }
  .g-main {
    height: 100%;
    width: 100%;
    display: flex;
    &-view {
      margin-left: 20px;
    }
  }
</style>
