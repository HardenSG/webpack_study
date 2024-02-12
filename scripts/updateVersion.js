const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');  
const { countVersion } = require('./utils')
const args = process.argv.slice(2)

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));

async function release() {
    const version = pkg.version
    const versionUpdateTactics = await chooseUpdateTactics()
    let tactics = 0

    switch (versionUpdateTactics) {
        case 'patch': {
            tactics = 9
            break;
        }
        case 'beta': {
            tactics = 5
            break;
        }
        case 'next': {
            tactics = 1
            break;
        }
    }
    if (tactics) { 
        pkg.version = countVersion(version, tactics)
        fs.writeFileSync(path.resolve(__dirname, '../package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
    }
}

// inquirer选择版本更新策略
async function chooseUpdateTactics() {
    const options = await inquirer.prompt([
        {
            type: 'list',
            name: 'tactics',
            message: '版本更新策略？默认patch',
            choices: ['patch', 'beta', 'next'],
            default: 'JavaScript'
        },
      ]);
    return options.tactics
}

release();
