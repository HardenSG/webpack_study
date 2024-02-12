const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { baseLoader, getEnvLoader } = require('./base-loader')

module.exports = (env = 'prod') => ({
    // 入口文件
    entry: './src/main.js',
    // 加载器
    module: {
        rules: [
            ...baseLoader,
            ...getEnvLoader(env)
        ]
    },
    // 插件
    plugins: [
        // Eslint插件
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, 'src'),
            exclude: 'node_modules',
            cache: env === 'prod',
            cacheLocation: env === 'prod' ? path.resolve(__dirname, '../node_modules/.cache/eslintcache') : undefined
        }),
        // HTML插件
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../view/index.html')
        }),
        // 提取CSS文件
        new MiniCssExtractPlugin()
    ],
})