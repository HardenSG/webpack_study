const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    // 入口文件
    entry: './src/main.js',
    // 加载器
    module: {
        rules: [
            // 处理样式
            {
                test: /\.css$/,
                use: [
                    // ! loader执行顺序：css、style、extract
                    MiniCssExtractPlugin.loader,
                    // ! 'style-loader',  // 有提取loader就不需要style-loader
                    'css-loader',
                    // ! 在css-loader前面处理兼容问题,在package中使用browserslist告知
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    }
                ],
            },
            // 处理静态资源
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
            // babel
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
        }),
        // 提取CSS文件
        new MiniCssExtractPlugin()
    ],
}