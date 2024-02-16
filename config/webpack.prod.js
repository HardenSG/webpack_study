const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const baseConfig = require('./webpack.base.js')
const { merge } = require('webpack-merge')
const path = require('path')
const os = require('os')

module.exports = merge(baseConfig(), {
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
    optimization: {
        // 压缩操作
        minimizer: [
            // 压缩css体积
            new CssMinimizerPlugin(),
            // 配置压缩插件
            new TerserWebpackPlugin({
                // 配置多进程
                parallel: os.cpus().length
            }),
            // 配置压缩本地图片
            // ! 速度非常慢.....，没必要使用这个，用小熊猫压缩吧还是
            // new ImageMinimizerPlugin({
            //     minimizer: {
            //         implementation: ImageMinimizerPlugin.imageminGenerate,
            //         options: {
            //             plugins: [
            //                 ['gifsicle', { interlaced: true }],
            //                 ['jpegtran', { progressive: true }],
            //                 ['optipng', { optimizationLevel: 5 }],
            //                 [
            //                     'svgo',
            //                     {
            //                         plugins: [
            //                             'preset-default',
            //                             'prefixIds',
            //                             {
            //                                 name: 'sortAttrs',
            //                                 params: {
            //                                     xmlnsOrder: 'alphabetical'
            //                                 }
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             ]
            //         }
            //     }
            // })
        ]
    },
    mode: 'production',
    devtool: 'source-map'
})