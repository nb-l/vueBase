'use strict'
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

const utils = require('./utils')
const config = require('../config')

let pack_env = process.env.PACK_ENV
let configObj = config[pack_env.trim()]

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: utils.entries(),
  output: {
    path: configObj.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    publicPath: process.env.NODE_ENV === 'production' ?
      configObj.assetsPublicPath : config.dev.assetsPublicPath
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  optimization: {
    runtimeChunk: {
      "name": "manifest"
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          enforce: true,
          priority: 10,
          name: 'vendor'
        },
        common: {
          chunks: "all",
          minChunks: 2,
          name: 'common',
          enforce: true,
          priority: 5
        },
        styles: {
          name: 'styles',
          test: /\.(s*)css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../'
          }
        }, 'css-loader', 'postcss-loader'],
      }, {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../'
          }
        }, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            include: [resolve('src')]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[contenthash:8].[ext]'),
            esModule: false
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[contenthash:8].[ext]'),
            esModule: false
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[contenthash:8].[ext]'),
            esModule: false
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': process.env.PACK_ENV === 'build' ? require('../config/prod.env') : require('../config/beta.env')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css'),
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, `../${configObj.assetsSubDirectory}`),
        to: path.resolve(__dirname, `../dist/${configObj.assetsSubDirectory}`),
      }]
    }),
  ].concat(utils.htmlPlugin()),

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

if (configObj.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig