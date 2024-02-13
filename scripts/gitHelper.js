const exec = require('exec-sh')
const inquirer = require('inquirer')
const { fileUtils, baseConfirmInq } = require('./utils')
const { logUtils } = require('./constant')

// git commit & tag
const gitHelper = async () => {
    const isNeedTag = await baseConfirmInq('是否需要tag？')
    const pkg = fileUtils()

    await exec.promise('git add .');
    await exec.promise(`git commit -m "chore(release): ${pkg.version} feature release"`)
    await exec.promise('git pull')
    await exec.promise(`git push`)
    if (isNeedTag) {
        logUtils.warn('需要tag，推送远程标签中.....');
        await exec.promise(`git tag v${pkg.version}`);
        await exec.promise('git push origin --tags');
        logUtils.success('推送远程成功🏅');
    }
}

gitHelper()