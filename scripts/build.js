const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config/webpack.config.prod')

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

    console.log(chalk.green(`compiling ${stats.compilation.compiler.name}`))
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
    const options = {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      warnings: false,
      errors: false
    }
    console.log(`${stats.toString(options)}\n`)

    console.log(chalk.green('Compiled successfully!'))
  })
}

build()
