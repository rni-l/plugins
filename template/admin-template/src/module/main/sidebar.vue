<template>
  <div class="u-mainSidebar">
    <el-menu :default-active="'welcome'" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <!-- 用户管理 -->
      <el-menu-item index="/welcome"><i class="el-icon-date"></i>欢迎页面</el-menu-item>

      <el-menu-item index="/user"><i class="el-icon-date"></i>用户管理</el-menu-item>
      <el-menu-item index="/project/list"><i class="el-icon-date"></i>项目管理</el-menu-item>

      <el-submenu index="company">
        <template slot="title"><i class="el-icon-date"></i>公司管理</template>
        <el-menu-item index="/company/list">公司列表</el-menu-item>
        <el-menu-item index="/company/review">公司认证</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<style lang="less">
  .u-mainSidebar {
    display: block;
    width: 200px;
    background-color: @t-navbarBg;
    overflow-y: scroll;
    height: 100%;
    .el-menu {
      border-right: 0;
      background: transparent;
      li {
          &:hover {
            background: #eeeeee;
          }
      }
      .el-submenu__title:hover {
        background: #eeeeee;
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
