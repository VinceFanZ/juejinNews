const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve('src'),
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false&reload=true',
    './index.js'
  ],
  output: {
    publicPath: '/',
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
      filename: 'index.html',
      inject: true,
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],

  devtool: 'inline-source-map'
}
