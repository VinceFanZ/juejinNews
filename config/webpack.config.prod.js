const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const PwaManifest = require('webpack-pwa-manifest')
const paths = require('./paths')
const baseConfig = require('./webpack.config.base')

const prodConfig = {
  cache: false,
  entry: {
    app: paths.appIndex,
    vendor: ['react', 'react-dom'],
  },
  output: {
    publicPath: paths.servedPath,
    filename: 'static/js/[name].[hash:8].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
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
