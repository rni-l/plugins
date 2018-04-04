const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const pkg = require('./package.json')
const rootPath = path.resolve(__dirname)
const pluginName = pkg.pluginName
const ENV = process.env.NODE_ENV
const isDevelopment = ENV === 'development'

console.log('isDevelopment:', isDevelopment);

const config = {
  mode: ENV,

  entry: {
    app: path.resolve(rootPath, 'src', 'index.js')
  },

  devServer: {},

  output: {
    filename: `${pluginName}.js`,
    path: path.resolve(rootPath, 'dist'),
    library: {
      root: pluginName,
      amd: pluginName,
      commonjs: pluginName
    },
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(rootPath, 'src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: isDevelopment ? [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ] : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader' ]
        })
      }
    ]
  },

  plugins: isDevelopment ? 
    [] : 
    [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true
        }
      }),
      new ExtractTextPlugin("styles.css")
   ]
}

new Promise(() => {
  // 构建全量压缩包
  let building = ora('building...')
  building.start()
  rm(path.resolve(rootPath, 'dist'), err => {
    if (err) throw (err)
    webpack(config, function (err, stats) {
      if (err) throw (err)
      building.stop()
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      console.log(chalk.cyan('  Build complete.\n'))
    })
  })
})