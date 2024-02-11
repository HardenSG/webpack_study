const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const path = require('path')

module.exports = merge(baseConfig, {
    output: {
        // 开发模式不需要输出
        path: path.resolve(__dirname, '../dist'),
        // 文件名字
        // filename: '[name].[contenthash].js'
        filename: '[name].js',
        // 产出前先🆑dist
        clean: true,
        environment: {
            // 关闭箭头函数输出
            arrowFunction: false
        }
    },
    mode: 'production'
})