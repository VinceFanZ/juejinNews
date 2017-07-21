const chalk = require('chalk')
const execSync = require('child_process').execSync

const execOptions = {
  encoding: 'utf8',
  stdio: [
    'pipe', // stdin (default)
    'pipe', // stdout (default)
    'ignore', //stderr
  ],
}

function getProcessIdOnport (port) {
  return execSync('lsof -i:' + port + ' -P -t -sTCP:LISTEN', execOptions).trim()
}

function getDirectoryOfProcessById (processId) {
  return execSync('lsof -p ' + processId + ' | awk \'$4=="cwd" {print $9}\'', execOptions).trim()
}

function getProcessCommand (processId) {
  return execSync('ps -o command -p ' + processId + ' | sed -n 2p', execOptions)
}

function getProcessForPort (port) {
  try {
    const processId = getProcessIdOnport(port)
    const directory = getDirectoryOfProcessById(processId)
    const command = getProcessCommand(processId)

    return chalk.cyan(command) + chalk.blue('  in ') + chalk.cyan(directory)
  } catch (e) {
    return null
  }
}

module.exports = getProcessForPort
