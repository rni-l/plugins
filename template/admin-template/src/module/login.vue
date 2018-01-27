<template>
  <div class="m-login">
    <div class="content">
      <h1>xxx<br>后台管理系统</h1>
      <el-alert v-show="errorMsg"
                v-bind:title="errorMsg"
                @close="closeAlert"
                type="error">
      </el-alert>

      <div class="login-form">
        <el-input
          type="email"
          placeholder="请输入用户名 ( Email )"
          icon="user"
          v-model.trim="username"
        >
        </el-input>

        <div class="el-input">
          <i class="el-input__icon el-icon-password"></i>
          <input v-model.trim="password" @keyup.enter="login" type="password" placeholder="请输入密码" autocomplete="off" class="el-input__inner">
        </div>

        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showError: false,
        errorMsg: '',
        username: localStorage.username || '',
        password: ''
      }
    },
    methods: {
      login() {
        if (!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(this.username)) {
          this.errorMsg = '请填写正确的Email!'
        } else if (this.password.length < 6) {
          this.errorMsg = '密码不少于6位!'
        } else {
          this.api.post('/api/admin/auth/login', {
            email: this.username,
            password: this.password
          }).then((res) => {
            if (res.status_code != 200) {
              this.errorMsg = res.message
            } else {
              location.href = '/admin/index'
            }
          })
        }
      },
      closeAlert() {
        this.errorMsg = ''
      }
    }
  }
</script>

<style lang="less">
  .m-login {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: url("../assets/login-bg.png") no-repeat center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 350px;
      margin-top: -250px;
      text-align: center;
      color: white;

      h1 {
        font-weight: normal;
        margin-bottom: 20px;
      }

      .el-alert {
        margin-bottom: 28px;
      }

      .login-form {
        padding: 40px 30px;
        background: rgba(255,255,255,0.30);
        box-shadow: 0px 5px 4px 1px rgba(113,116,121,0.37);
        border-radius: 10px;

        .el-input__icon {
          left: 0;
          right: auto;
        }
        .el-input__icon+.el-input__inner {
          padding-left: 35px;
          padding-right: 0;
        }
        .el-icon-user:after {
          width: 18px;
          height: 20px;
          // background: url("../assets/icon/user.png");
          background-size: 100% 100%;
          margin-top: 7px;
        }
        .el-icon-password:after {
          width: 15px;
          height: 20px;
          // background: url("../assets/icon/password.png");
          background-size: 100% 100%;
          margin-top: 7px;
        }

        .el-input:nth-child(1) {
          margin-bottom: 20px;
        }
        .el-button {
          width: 100%;
          margin-top: 30px;
        }
      }
    }
  }
</style>
