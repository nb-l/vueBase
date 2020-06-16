'use strict'
const path = require('path')
const packageConfig = require('../package.json')

const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const config = require('../config')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

let pack_env = process.env.PACK_ENV
let configObj = config[pack_env.trim()]


exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}


// 多页面入口
exports.entries = function () {
  var entryFiles = glob.sync(PAGE_PATH + '/*/index.js')
  var map = {}
  entryFiles.forEach((filePath) => {
    var arry = filePath.split('/')
    var filename = arry[arry.length - 2]
    map[filename] = filePath
  })
  return map
}

// 多页面输出
exports.htmlPlugin = function () {
  var htmls = glob.sync(PAGE_PATH + '/*/*.html')
  var output = []
  htmls.forEach((filePath) => {
    var arry = filePath.split('/')
    var filename = arry[arry.length - 2]
    var confg = {
      template: filePath,
      filename: filename + '.html',
      chunks: ['manifest', 'vendor', 'common', filename],
      inject: true
    }

    confg.wmxy_jsapi = process.env.NODE_ENV === 'production' ? configObj.wmxy_jsapi : config.dev.wmxy_jsapi
    confg.vconsole = process.env.NODE_ENV === 'production' ? configObj.vconsole : config.dev.vconsole

    if (process.env.NODE_ENV === 'production') {
      confg = merge(confg, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      })
    }
    output.push(new HtmlWebpackPlugin(confg))
  })
  return output
}