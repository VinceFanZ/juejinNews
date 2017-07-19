const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PwaManifest = require('webpack-pwa-manifest')
const paths = require('./paths')
const baseConfig = require('./webpack.config.base')
const vendorConfig = require('../vendor-config')
const vendorManifest = require('../vendor-manifest')

const pathsToClean = [
  'static/js/main.*.js',
  'static/styles/'
]
const cleanOptions = {
  root: path.join(__dirname, '..', paths.appBuild),
  verbose: true,
  dry: false
}

const prodConfig = {
  cache: false,
  output: {
    publicPath: paths.servedPath,
    filename: 'static/js/[name].[hash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    // }),
    new webpack.DllReferencePlugin({
      context: path.resolve('src'),
      manifest: vendorManifest,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),  // webpack3 Scope Hoisting
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'static/styles/[name].[hash:8].css'
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: path.join(__dirname, '..', paths.appBuild, 'index.html'),
      inject: true,
      vendorName: vendorConfig.vendor.js,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new PwaManifest({
      name: 'Funny',
      short_name: 'Funny',
      description: 'Funny PWA',
      display: 'standalone',
      icons: [{
        src: path.resolve('src/assets/icon.png'),
        sizes: [128, 144, 152],
      }]
    }),
  ],
  devtool: 'source-map'
}

module.exports = merge(baseConfig, prodConfig)
