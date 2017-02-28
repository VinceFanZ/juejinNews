const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }

}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname + '/src'))

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
