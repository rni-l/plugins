## 多页面 node 配置

配置： `npm run init`

启动： `node app.js`

```
.
├── README.md
├── app.js
├── config.example.js
├── db
│   ├── lowdb
│   └── mongodb
├── gulpfile.js
├── logs
│   ├── app.log
│   └── error.log
├── public
│   ├── dist
│   │   └── css
│   │       └── style.css
│   ├── img
│   │   └── logo.png
│   ├── lib
│   │   ├── bootstrap
│   │   ├── css
│   │   │   ├── animate.css
│   │   │   ├── animate.min.css
│   │   │   └── normalize.min.css
│   │   ├── js
│   │   │   ├── axios.js
│   │   │   ├── axios.min.js
│   │   │   ├── createjs.min.js
│   │   │   ├── flexible.min.js
│   │   │   ├── jquery.min.js
│   │   │   ├── validator.min.js
│   │   │   ├── vconsole.min.js
│   │   │   └── zepto.min.js
│   │   ├── mint
│   │   │   ├── mint.css
│   │   │   └── mint.min.js
│   │   ├── vue
│   │   │   ├── vue.js
│   │   │   └── vue.min.js
│   │   └── webuploader
│   │       ├── Uploader.swf
│   │       ├── webuploader.js
│   │       └── webuploader.min.js
│   └── robots.txt
├── routes
│   ├── api.js
│   └── index.js
├── src
│   ├── css
│   │   └── style.less
│   ├── img
│   │   └── logo.png
│   └── js
│       └── index.js
├── util
│   └── middleware.js
└── views
    ├── 404.pug
    ├── default
    │   └── error.pug
    ├── error.pug
    ├── index.pug
    └── layout.pug
```
一个很简单的多页面配置，使用 express 和 gulp，用 pug(jade) 进行 ssr

