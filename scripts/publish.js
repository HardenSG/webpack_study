const exec = require('exec-sh')
const inquirer = require('inquirer')
const { logUtils, PUBLISH_TAG_ENUM } = require('./constant')
const { baseConfirmInq, fileUtils } = require('./utils')

// npm publish
const publishHelper = async () => {
    const tagCode = await choosePublishTag()
    const targetTag = PUBLISH_TAG_ENUM[tagCode]

    if (!targetTag) {
        logUtils.success('💼不需要发包，分支退出..')
        return
    } 
    logUtils.success(`💼需要发包，即将推送版本： ${targetTag}`)
    copyPackageFile()
    
    const commandList = []
    if (tagCode === 3) {
        logUtils.warn(`WARNING： 你选择的是next版本，请确认是否操作`)
        const confirm = await baseConfirmInq('请确认是否操作')

        if (!confirm) {
            logUtils.error(`取消发包，分支退出..`)
            return
        }
    } else {
        commandList.push('--tag', targetTag)
    }

    const command = `npm publish ${commandList.join(' ')}`
    await exec.promise(`cd ./dist && ${command}`);
    logUtils.success('alpha 或 beta 发包成功🏅');
}

// 需要publish的tag
async function choosePublishTag() {
    const options = await inquirer.prompt([
        {
            type: 'list',
            name: 'tag',
            message: '请选择需要的tag',
            choices: [
                {
                    name: '不需要publish',
                    value: 0,
                },
                {
                    name: '需要alpha',
                    value: 1,
                },
                {
                    name: '需要beta',
                    value: 2,
                },
                {
                    name: '需要正式包',
                    value: 3,
                },
            ],
        },
    ]);
    return options.tag
}

// 将 package.json 复制到dist中
function copyPackageFile() {
    const pkg = fileUtils({
        rootFile: '../lib/copy/package.json'
    })
    fileUtils({
        action: 'write',
        rootFile: '../dist/package.json',
        content: JSON.stringify(pkg, null, 2)
    })
}

publishHelper()