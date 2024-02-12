const baseConfig = require('./webpack.base.js')
const { merge } = require('webpack-merge')

module.exports = merge(baseConfig, {
    // 开发服务器
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true,
    },
    mode: 'development',
    devtool: 'cheap-module-source-map'
})