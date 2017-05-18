const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PwaManifest = require('webpack-pwa-manifest')
const paths = require('./paths')

module.exports = {
  context: path.resolve('src'),
  entry: [
    paths.appIndex,
  ],
  output: {
    path: path.resolve(paths.appBuild),
    filename: 'static/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/,
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: /src/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
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
}
