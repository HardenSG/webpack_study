const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

// 根据tag更新版本策略
const UPDATE_VERSION_TACTICS = {
    'patch': (major, middle, patch) => [major, middle, patch + 1],
    'beta': (major, middle) => [major, middle + 1, 0],
    'next': major => [major + 1, 0, 0],
}

// 获得详细版本
function getVersion(versionStr) {
    const [major, middle, patch] = versionStr.split('.').map(v => Number(v))
    return {
        major,
        middle,
        patch
    }
}

/**
 * 更新版本的计算策略
 * @param {String} versionStr 字符串版本
 * @param {String} tactics 更新版本阈值策略
 * @returns {String} 更新后版本值
 */
function countVersion(versionStr, tactics) {
    const { major, middle, patch } = getVersion(versionStr)
    return UPDATE_VERSION_TACTICS[tactics](major, middle, patch).join('.')
}



/**
 * 文件读写操作
 * @param {Object} {
 *     action = 'read', 
 *     rootFile = '../package.json',
 *     content
 * }
 * @return {String | Boolean} 
 */
function fileUtils({
    action = 'read',
    rootFile = '../package.json',
    content
} = {
    action: 'read',
    rootFile: '../package.json',
    content: ''
}) {
    if (action === 'read') {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, rootFile)));
    } else {
        fs.writeFileSync(path.resolve(__dirname, rootFile), `${content}\n`);
        return true
    }
}

// inquirer 基础确认prompt
async function baseConfirmInq(prompt) {
    const options = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: prompt,
            choices: [
                {
                    name: 'YES',
                    value: true,
                },
                {
                    name: 'NO',
                    value: false,
                },
            ],
        },
    ]);
    return options.choice
}

module.exports = {
    countVersion,
    fileUtils,
    baseConfirmInq
}