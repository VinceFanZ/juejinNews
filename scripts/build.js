const shell = require('shelljs')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config/webpack.config.prod')
const paths = require('../config/paths')

const compiler = webpack(config)

function build() {
  console.log('Creating an optimized production build...')
  compiler.run((err, stats) => {
    if (err) {
      console.log(chalk.red('Failed to compile.'))
      console.log(chalk.red(err.stack || err))
      if (err.details) {
        console.log(chalk.red(err.details))
      }
      process.exit(1)
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.log(chalk.red('Error:'))
      console.log(chalk.red(info.errors))
      process.exit(1)
    }

    if (stats.hasWarnings()) {
      console.log(chalk.yellow('Warning:'))
      console.log(chalk.yellow(info.warnings))
    }
    // compile print
    console.log(`${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      warnings: false,
      errors: false
    })}\n`)
    console.log(chalk.green('Compiled successfully!'))
  })
}

shell.rm('-rf', paths.appBuild)

build()
