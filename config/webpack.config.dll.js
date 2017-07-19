const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const paths = require('./paths')

module.exports = {
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: path.resolve('src'),
    }),
    new AssetsPlugin({
      filename: 'vendor-config.json',
      path: path.join(__dirname, '..')
    }),
  ],
}
