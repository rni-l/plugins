<template>
  <textarea @change="valueChange" id="editor">
  </textarea>
</template>

<script>
// import $ from 'jquery'
import 'simditor/styles/simditor.css'
import Simditor from '../../static/simditor'

export default {
  name: 'simditor',
  props: {
    content: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      editor: ''
    }
  },
  watch: {
    content() {
      // $('#editor').siblings('.simditor-body').html(this.content)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 清除编辑框内容
    cleanData() {
      // $('.simditor-body').html('')
    },
    async init() {
      const { code, data } = await this.api.get('')
      if (code === 200) {
        this.token = data
      }
      const getToken = this.token
      this.editor = new Simditor(Object.assign({}, {
        textarea: document.getElementById('editor'),
        // 自定义工具栏
        toolbar: [
          'title',
          'bold',
          'italic',
          'underline',
          'link',
          'image'],
        defaultImage: '/assets/avatar.jpg',
        upload: {
          placeHolder: '输入文章内容',
          toolbarFloat: false,
          pasteImage: true,
          url: 'http://up-z2.qiniu.com',
          params: {
            unique_names: true,
            save_key: false,
            token: getToken
          },
          fileKey: 'file', // 服务器端获取文件数据的参数名
          connectionCount: 3,
          leaveConfirm: '正在上传文件,你确定要离开这个页面吗？',
          fileSize: 2097152
        }
      }, this.options))
      if (this.content !== '') {
        // $('#editor').siblings('.simditor-body').html(this.content)
      }
      this.editor.on('valuechanged', this.valueChange)
    },
    valueChange() {
      this.$emit('change', this.editor.getValue())
    }
  }
}
</script>
