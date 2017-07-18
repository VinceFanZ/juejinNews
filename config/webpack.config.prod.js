const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const PwaManifest = require('webpack-pwa-manifest')
const paths = require('./paths')
const baseConfig = require('./webpack.config.base')
const vendorManifest = require('../vendor-manifest')

const dll = {
  name: 'vendor',
  context: path.resolve('src'),
  entry: {
    vendor: [
      'react',
      'react-dom'
    ],
  },
  output: {
    path: path.resolve(paths.appBuild),
    filename: 'static/js/[name].[hash:8].js',
    library: '[name]_[hash]'
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: path.resolve('src'),
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: path.join(__dirname, '..', paths.appBuild, 'index.temp.html'),
      inject: true,
    })
  ],
}

const prodConfig = {
  cache: false,
  dependencies: ['vendor'],
  output: {
    publicPath: paths.servedPath,
    filename: 'static/js/[name].[hash:8].js'
  },
  plugins: [
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
      filename: 'static/styles/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', paths.appBuild, 'index.temp.html'),
      filename: path.join(__dirname, '..', paths.appBuild, 'index.html'),
      inject: true,
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

module.exports = [dll, merge(baseConfig, prodConfig)]
