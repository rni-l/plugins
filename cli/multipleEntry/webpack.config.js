'use strict'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const ENV = process.env.NODE_ENV
const isDevelopment = ENV === 'development'

const resolveModuleToJs = (path) => {
  return `./src/js/${path}.js`
}

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const assetsPath = function(_path) {
  const assetsSubDirectory = 'public'
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  // mode: isDevelopment ? 'development' : 'production',

  // context: path.resolve(__dirname, './'),

  entry: {
    index: resolveModuleToJs('index'),
    detail: resolveModuleToJs('welcome')
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: 'dist/js'
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.scss$/,
        use: isDevelopment ? [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ] : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [].concat(isDevelopment ? [] : [
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     ie8: true
    //   }
    // }),
    new ExtractTextPlugin('styles.css')
  ]),

  devServer: {
    contentBase: './',
    host: 'localhost',
    port: 3100,
    proxy: {
      '/page': {
        target: 'http://localhost:3200',
        pathRewrite: {
          '^/page': '/'
        }
      }
    }
  }
}
