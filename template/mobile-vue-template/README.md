## 微信 SPA 前端初始化框架

### 项目涉及技术栈

> vue、vuex、vue-router、es6、less、lodash、mint-ui

### 词汇表（持续更新...）

| 中文 | 英文 |
| --- | --- |
| 例子 | example |


### 食用指南

``` bash
# 复制配置
npm run cp (cp private-config.js.example private-config.js)

# install dependencies
npm install (cnpm i)

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 运行测试
npm run test

```

### 项目开发规范

* 文件名全小写，单词间用 `-` 连接
* CSS

```
使用 rem 代替 px
尽量不使用 id，class 前缀如下
g 全局性
m 模块
u 组件
f 功能
```

* 文件组织

```
+-- assets 静态资源。一般图片。按目录分好，以下也是。
+-- components 公共组件
+-- module 业务页面
|   +-- module-name
|   |   +-- index.vue
+-- utils
|   +-- request.js 封装的网络请求组件
|   +-- tools.js 公共方法
|   +-- wechat.js 微信 sdk
+-- index.html
+-- app.vue
+-- router.js
+-- main.js 入口文件
```

