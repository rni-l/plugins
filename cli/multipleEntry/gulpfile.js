const gulp = require('gulp')
const sass = require('gulp-sass')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const eslint = require('gulp-eslint')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const babelify = require('babelify')
const gulpif = require('gulp-if')

const tiny = require('gulp-tinypng-nokey')
const gulpLoadPlugins = require('gulp-load-plugins')
const plugins = gulpLoadPlugins()

// browserify
const browserify = require("browserify")
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

// 配置文件
const Config = require('./config.js')

// 配置路径
const publicPath = './public'
const jsPath = './src/js'
const cssPath = './src/css'
const imagePath = './src/img'

// 是否压缩文件
let ifUglify = false

// function swallowError(error) {
//   // If you want details of the error in the console
//   console.error(error.toString())
//   this.emit('end')
// }

// 自动刷新
const browserSync = require('browser-sync').create()
// 配置代理
gulp.task('server', function() {
  ifUglify = false
  // 初始化
  browserSync.init({
    proxy: 'localhost:' + Config.port, // 开启代理
    browser: 'chrome', // 打开浏览器
    logLevel: 'debug'
  })
  // watch,当文件变化后，自动生成相应的文件
  gulp.watch([`${jsPath}/*.js`, `${jsPath}/js/*.js`], ['js'])
  gulp.watch([`${cssPath}/*.scss`, `${cssPath}/*/*.scss`], ['sass'])
  gulp.watch([`${cssPath}/*.less`, `${cssPath}/*/*.less`], ['less'])
  gulp.watch([`${imagePath}/*`, `${imagePath}/*/*`], ['img'])
  // 浏览器重载，会根据情况是否重新加载页面
  gulp.watch("*.html").on('change', browserSync.reload);
})

// eslint 检测
gulp.task('lint', function() {
  gulp.src([`${jsPath}/*.js`, `${jsPath}/js/*.js`])
    .pipe(plumber())
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

const buildJs = function(path) {
  browserify({
    entries: [`${jsPath}${path.entry}`], // 入口文件
    debug: true // 告知Browserify在运行同时生成内联sourcemap用于调试
  })
  .transform(babelify) // 转换es6代码，es7
  .bundle() // 合并打包
  .pipe(plumber())
  .pipe(source(`${path.outputName}`)) // 将常规流转换为包含Stream的vinyl对象，并且重命名
  .pipe(buffer()) // 将vinyl对象内容中的Stream转换为Buffer
  // .pipe(sourcemaps.init({ loadMaps: true })) // 从 browserify 文件载入 map
  .pipe(gulpif(ifUglify, uglify()))
  // .pipe(sourcemaps.write('.')) // 写入 .map 文件
  .pipe(gulp.dest(`${publicPath}/dist${path.output}`)) // 输出打包
  .pipe(browserSync.reload({ stream: true })) // browser-sync自动刷新
  // .pipe(notify({ message: 'browserify task complete' })) // 告知完成任务
}

// js入口文件
const jsEntryPath = [
  {
    entry: '/index.js', // 入口文件名
    output: '/js', // 输出文件路径
    outputName: 'index.js' // 输出文件名
  },
  {
    entry: '/welcome.js', // 入口文件名
    output: '/js', // 输出文件路径
    outputName: 'welcome.js' // 输出文件名
  },
  {
    entry: '/detail.js', // 入口文件名
    output: '/js', // 输出文件路径
    outputName: 'detail.js' // 输出文件名
  },
  {
    entry: '/cart.js', // 入口文件名
    output: '/js', // 输出文件路径
    outputName: 'cart.js' // 输出文件名
  },
  {
    entry: '/address.js', // 入口文件名
    output: '/js', // 输出文件路径
    outputName: 'address.js' // 输出文件名
  },
  {
    entry: '/pay.js', // 入口文件名
    output: '/js', // 输出文件路径
    outputName: 'pay.js' // 输出文件名
  },
  {
    entry: '/business.js', // 入口文件名
    output: '/js', // 输出文件路径
    outputName: 'business.js' // 输出文件名
  }
]
// js
gulp.task('js', ['lint'], ()=> {
  jsEntryPath.forEach((v) => {
    buildJs(v)
  })
})

// 编辑 less
gulp.task('less', function() {
  gulp.src([`${cssPath}/*.less`, `${cssPath}/*/*.less`])
    .pipe(less())
    .pipe(plumber()) // 报错不会终止进程
    .pipe(autoprefixer({ 
      browsers: ['last 2 versions', 'last 3 Explorer versions']
    })) // 自动补全前缀
    .pipe(gulpif(ifUglify, cleanCSS({compatibility: 'ie9'}))) // 压缩文件
    .pipe(gulp.dest(`${publicPath}/dist/css`))
    .pipe(browserSync.stream())
    .pipe(notify('CSS Task Complete!'))
})

// sass
gulp.task('sass', function() {
  gulp.src([`${cssPath}/*.scss`, `${cssPath}/*/*.scss`])
    .pipe(sass())
    .pipe(plumber()) // 报错不会终止进程
    .pipe(autoprefixer({ 
      browsers: ['last 2 versions', 'last 3 Explorer versions']
    })) // 自动补全前缀
    .pipe(gulpif(ifUglify, cleanCSS({compatibility: 'ie9'}))) // 压缩文件
    .pipe(gulp.dest(`${publicPath}/dist/css`))
    .pipe(browserSync.stream())
    .pipe(notify('CSS Task Complete!'))
})

gulp.task('css', ['less', 'sass'])

gulp.task('moveImg', function() {
  gulp.src(`${imagePath}/**/*`)
    .pipe(gulp.dest(`${publicPath}/img`))
})

gulp.task('tinypng', function(cb) {
  gulp.src(`${imagePath}/**/*.{jpg,jpeg,png,gif}`)
    .pipe(tiny())
    .pipe(plugins.rename(function(path) {
      path.dirname = `/${path.dirname}`
    }))
    .pipe(gulp.dest(`${publicPath}/img`))
})


gulp.task('openUglify', function() {
  ifUglify = true
})


// 监视文件变动
gulp.task('watch', ['server'])
gulp.task('dev', ['js', 'css', 'moveImg'])
// 生成文件
gulp.task('build', ['openUglify', 'js', 'css', 'moveImg'])
