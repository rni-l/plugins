## Express 初始化框架

### 项目涉及技术栈

> nodejs express pug es6 gulp eslint

#### 版本要求

`nodejs` 6.0 以上，`npm` 3.8 以上

### 食用指南

``` bash
# 复制配置

# 生成配置文件
npm run cp

# 安装依赖
npm i // or cnpm i

# 打包
npm run build

# 使用转发中间件
# 在app.js中，将/api/*替换成需要匹配的路由；在config.js，配置serverUrl地址

# launch
NODE_ENV=development node app.js
PORT=8080 NODE_ENV=development node app.js // 指定端口、模式

# 生产环境
PORT=8080 NODE_ENV=production forever start app.js

# 开发
npm run cp

npm run dev

npm run watch // 开启 browserify，进行前端开发

# 新开一个窗口
npm run start // 开启 node 服务

```

