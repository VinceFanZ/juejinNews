const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const manifestPlugin = require('pwa-manifest-webpack-plugin')
const paths = require('./paths')

module.exports = {
  context: path.resolve('src'),
  entry: [
    paths.appIndex
  ],
  output: {
    path: path.resolve(paths.appBuild),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: /src/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new manifestPlugin({
      name: 'Funny',
      description: 'Funny',
      display: 'standalone',
      icon: {
        src: path.resolve('src/assets/icon.png'),
        sizes: [128, 144, 152]
      }
    })
  ]
}
