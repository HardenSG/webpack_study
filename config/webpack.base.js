const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // 入口文件
    entry: './src/main.js',
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
                exclude: /node_modules|scripts/,
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
            template: path.resolve(__dirname, '../view/index.html')
        })
    ],
}