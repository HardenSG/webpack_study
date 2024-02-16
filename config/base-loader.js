const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const os = require('os')

// 基础loader
const baseLoader = [
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
]

// 根据环境匹配不同策略的loader
const getEnvLoader = env => [
    {
        test: /\.css$/,
        use: [
            // 如果是prod，提取css ｜ 否则使用style-loader即可
            env === 'prod' ? MiniCssExtractPlugin.loader : MiniCssExtractPlugin.loader,
            'css-loader',
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
    {
        test: /\.js$/,
        // 排除node_modules
        exclude: /node_modules|scripts/,
        use: [
            {
                loader: 'thread-loader',
                options: {
                    works: os.cpus().length
                }
            },
            {
                loader: 'babel-loader',
                options: {
                    // 开启babel缓存
                    cacheDirectory: true,
                    // 关闭缓存压缩
                    cacheCompression: false,
                    // 减少babel体积
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        ]
    }
]


module.exports = {
    baseLoader,
    getEnvLoader
}