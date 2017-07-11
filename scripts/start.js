const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const detect = require('detect-port')
const chalk = require('chalk')
const webpackConfig = require('../config/webpack.config.dev.js')
const getProcessForPort = require('./getProcessForPort')
const clearConsole = require('./clearConsole')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const app = express()
let compiler

function setupCompiler() {
  compiler = webpack(webpackConfig)

  compiler.plugin('done', () => {
    console.log()
    console.log(chalk.green('Compiled successfully'))
  })
}

function runDevServer(protocol, host, port) {
  app.use(webpackDevMiddleware(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: webpackConfig.output.publicPath,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: false,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host,
    noInfo: false,
    stats: {
      colors: true,
      chunks: false,
      modules: false,
    },
  }))

  app.use(webpackHotMiddleware(compiler))

  app.listen(port, (err) => {
    if (err) {
      console.log(chalk.red(err))
    }
    console.log()
    console.log(chalk.cyan(`Listening on ${protocol}://${host}:${port}`))
  })
}

function run(port) {
  const protocol = process.env.HTTPS === 'true'
    ? 'https'
    : 'http'
  const host = process.env.HOST || 'localhost'
  setupCompiler()
  runDevServer(protocol, host, port)
}

detect(DEFAULT_PORT).then((port) => {
  clearConsole()
  if (port === DEFAULT_PORT) {
    run(DEFAULT_PORT)
    return
  }
  const existingProcess = getProcessForPort(DEFAULT_PORT)
  console.log(chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.' +
        ((existingProcess) ? ' Probably:\n  ' + existingProcess : '')))
  console.log(chalk.cyan('try port:' + port))
  run(port)
})
