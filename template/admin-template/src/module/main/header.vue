<template>
  <header class="u-mainHeader">
    <div class="u-mainHeader-logo" @click="$router.push('/admin/sys/welcome')">后台</div>
    <div class="u-mainHeader-userInfo">
      <el-dropdown trigger='click'>
        <span class="el-dropdown-link">
          <span>admin</span><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="reset">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {

  name: 'mainHeader',

  data() {
    return {
      username: 'admin'
    }
  },
  methods: {
    async handleCommand(command) {
      if (command === 'loginout') {
        const { code } = await request.post('/api/systemUser/logout')
        // TODO没有进来
        if (code === 200) {
          this.$router.push('/admin/login')
        }
      } else if (command === 'reset') {
        this.$router.push('/admin/sys/reset-pwd')
      }
    }
  }
}
</script>

<style lang="less" >
.u-mainHeader {
  z-index: 1;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
  color: @t-navbarTc;
  background-color: @t-navbarBg;
  border-bottom: solid 1px @t-navbarBb;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-logo {
    cursor: pointer;
    font-size: 18px;
    padding: 15px 0;
  }

  &-userInfo {
    width: 150px;
    .el-dropdown {
      display: block;
      width: 100%;
    }
    .el-dropdown-link {
      display: block;
      padding: 15px 0;
      text-align: center;
      user-select: none;
      &:hover {
        background: @t-navbarBb;
      }
    }
  }
}
</style>
