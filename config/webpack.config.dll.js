const path = require('path')
const webpack = require('webpack')
const paths = require('./paths')

const vendors = [
  'react',
  'react-dom'
]

module.exports = {
  entry: {
    vendor: vendors,
  },
  output: {
    path: path.resolve(paths.appBuild),
    filename: 'static/js/[name].[hash:8].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: path.resolve('src'),
    }),
  ],
}
