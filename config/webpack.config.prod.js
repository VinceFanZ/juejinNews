const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const paths = require('./paths')
const baseConfig = require('./webpack.config.base')

const prodConfig = {
  output: {
    publicPath: paths.servedPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
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
    })
  ],
  devtool: 'source-map'
}

module.exports = merge(baseConfig, prodConfig)
