const chalk = require('chalk')

// 彩色日志
const logUtils = {
    error: msg => console.log(chalk.red.bold(msg)),
    warn: msg => console.log(chalk.yellow.bold(msg)),
    success: msg => console.log(chalk.green.bold(msg))
}

// publish tag 枚举
const PUBLISH_TAG_ENUM = {
    0: false,
    1: 'alpha',
    2: 'beta',
    3: 'next'
}

module.exports = {
    logUtils,
    PUBLISH_TAG_ENUM
}