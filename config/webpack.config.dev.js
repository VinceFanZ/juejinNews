const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const paths = require('./paths')

const devConfig = {
  output: {
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  devtool: 'cheap-module-source-map'
}

module.exports = merge(baseConfig, devConfig)
