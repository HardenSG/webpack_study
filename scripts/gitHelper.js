const exec = require('exec-sh')
const inquirer = require('inquirer')
const { fileUtils } = require('./utils')

// git commit & tag
const gitHelper = async () => {
    const isNeedTag = await chooseUpdateTactics()
    const pkg = fileUtils()
    console.log(pkg);

    await exec.promise('git add .');
    await exec.promise(`git commit -m "chore(release): ${pkg.version} feature release"`)
    await exec.promise(`git push origin main main`)
    if (isNeedTag) {
        console.log('需要tag，推送远程标签中.....');
        await exec.promise(`git tag v${pkg.version}`);
        await exec.promise('git push origin --tags');
        console.log('推送远程成功🏅');
    }
}

// inquirer选择是否需要tag
async function chooseUpdateTactics() {
    const options = await inquirer.prompt([
        {
            type: 'list',
            name: 'tag',
            message: '是否需要tag?',
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
    return options.tag
}

gitHelper()