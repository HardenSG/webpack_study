module.exports = {
    // 解析选项
    parserOptions: {
        ecmaVersion: 6, // ES version
        sourceType: 'module', // ES模块
        ecmaFeatures: { // ES扩展新功能
            // jsx: true
        }
    },
    env: {
        node: true, // 启用目标环境的全局变量
        browser: true,
    },
    // 检查规则
    rules: {
        // ! eslint rules website：https://eslint.nodejs.cn/docs/latest/rules/
        'no-var': 2,
    },
    // 继承规则
    extends: [
        // eslint标准规则
        'eslint:recommended',
    ]
}