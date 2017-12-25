<template>
  <form class="u-uploadFile" action="http://up-z2.qiniu.com">
    <input type="file" name='file' class='file' :accept='accept' @change='uploadImg'>
    <input type="hidden" name="token" v-model="token">
  </form>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import NProgress from 'nprogress'
// import { Indicator } from 'mint-ui'

export default {

  name: 'uploadFile',
  props: {
    ifGetToken: {
      type: Boolean,
      default: true
    },
    parentToken: {
      type: String,
      default: ''
    },
    beforeCallback: {
      type: Function
    },
    completeCallback: {
      type: Function
    },
    successCallback: {
      type: Function
    },
    failCallback: {
      type: Function
    },
    size: {
      type: Number,
      default: 4
    },
    accept: {
      type: String,
      default: 'image/jpg, image/png, image/jpeg, image/gif'
    }
  },
  data() {
    return {
      pics: '',
      token: ''
    }
  },
  created() {
    if (!this.ifGetToken) {
      this.getToken()
    }
  },
  watch: {
    parentToken() {
      if (this.ifGetToken) {
        this.token = this.parentToken
      }
    }
  },
  methods: {
    async getToken() {
      const { code, data } = await request.get('/api/upload/token')
      if (code === 200) {
        this.token = data.token
      }
    },
    checkFile(file) {
      // 判断图片是否过大
      if (file.size / (1024 * 1024) > this.size) {
        console.log('big')
        // 大于2M
        this.$toast('图片过大，请选择低于4M的图片')
        return false
      }
      return true
    },
    init(result, oFile) {
      const client = new window.OSS.Wrapper({
        accessKeyId: result.AccessKeyId,
        accessKeySecret: result.AccessKeySecret,
        stsToken: result.SecurityToken,
        endpoint: '<oss endpoint>',
        bucket: '<Your bucket name>'
      })
      client.multipartUpload('upload-file', oFile).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    },
    /* eslint-disable */
    uploadImg(e) {
      const oFile = e.target.files[0]
      if (!this.checkFile(oFile)) {
        return false
      }
      this.beforeCallback && this.beforeCallback()
      // 上传图片时，判断是否有 OSS sdk
      window.tools.loadJS(() => {
        // axios({
        //   url: 'http://up-z2.qiniu.com',
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   data: form
        // }).then(res => {
        //   NProgress.done()
        //   this.$indicator.close()
        //   const resData = res.data
        //   this.completeCallback && this.completeCallback()
        //   if (resData.status.errCode === 200) {
        //     // 成功
        //     this.pics = resData.data.url
        //     this.$toast('上传成功')
        //     this.$emit('getPics', this.pics, resData.data.key)
        //     this.successCallback && this.successCallback()
        //   } else {
        //     this.$toast(resData.status.errCode)
        //     this.failCallback && this.failCallback()
        //   }
        // }).catch(err => {
        //   NProgress.done()
        //   console.log(err)
        //   this.$toast(err)
        // })
        this.init({}, oFile)
      })
    }
  }
}
</script>

<style lang="less">
.u-uploadFile{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  .file{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
