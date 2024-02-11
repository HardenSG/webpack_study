const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // 入口文件
    entry: './src/main.js',
    output: {
        // 输出路径
        path: path.resolve(__dirname, 'dist'),
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
    // 加载器
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // loader执行顺序：css、style
                    'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 超过15kb不打包成base64
                        maxSize: 5 * 1024
                    }
                },
                // 生成器
                generator: {
                    filename: 'static/images/[hash][ext]'
                }
            },
            {
                test: /\.js$/,
                // 排除node_modules
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    // 插件
    plugins: [
        // Eslint插件
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, 'src')
        }),
        // HTML插件
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '/view/index.html')
        })
    ],
    // 开发服务器
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true,
    },
    mode: 'development'
}