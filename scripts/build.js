const shell = require('shelljs')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config/webpack.config.prod')
const paths = require('../config/paths')

function printErrors(summary, errors) {
  console.log(chalk.red(summary))
  console.log()
  errors.forEach((err) => {
    console.log(err.message || err)
    console.log()
  })
}

function build() {
  console.log('Creating an optimized production build...')
  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err])
      process.exit(1)
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors)
      process.exit(1)
    }

    console.log(chalk.green('Compiled successfully.'))
  })
}

shell.rm('-rf', paths.appBuild)

build()
