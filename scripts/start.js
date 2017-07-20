const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const detect = require('detect-port')
const chalk = require('chalk')
const webpackConfig = require('../config/webpack.config.dev.js')
const getProcessForPort = require('./getProcessForPort')
const clearConsole = require('./clearConsole')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || 'localhost'
let compiler

function setupCompiler() {
  compiler = webpack(webpackConfig)

  compiler.plugin('done', () => {
    console.log(chalk.green('\nCompiled successfully\n'))
  })
}

function runDevServer(protocol, host, port) {
  const devServer = new WebpackDevServer(compiler, {
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
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:2999',
        changeOrigin: true
      },
    }
  })

  devServer.listen(port, host, (err) => {
    if (err) {
      console.log(chalk.red(err))
    }
    console.log(chalk.cyan(`\nListening on ${protocol}://${host}:${port}`))
  })
}

function run(port) {
  const protocol = process.env.HTTPS === 'true'
    ? 'https'
    : 'http'
  const host = HOST
  setupCompiler()
  runDevServer(protocol, host, port)
}

detect(DEFAULT_PORT).then((port) => {
  clearConsole()

  const devServerEntry = [`webpack-dev-server/client?http://${HOST}:${port}`, 'webpack/hot/only-dev-server']
  const baseEntryMain = webpackConfig.entry.main
  webpackConfig.entry.main = devServerEntry.concat(baseEntryMain)

  if (port === DEFAULT_PORT) {
    run(port)
    return
  }
  const existingProcess = getProcessForPort(DEFAULT_PORT)
  console.log(chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.' +
        ((existingProcess) ? ' Probably:\n  ' + existingProcess : '')))
  console.log(chalk.cyan('try port:' + port))

  run(port)
})
