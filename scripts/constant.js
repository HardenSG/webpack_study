const chalk = require('chalk')

// 彩色日志
const logUtils = {
    error: msg => console.log(chalk.red.bold(msg)),
    warn: msg => console.log(chalk.yellow.bold(msg)),
    success: msg => console.log(chalk.green.bold(msg))
}

module.exports = {
    logUtils
}