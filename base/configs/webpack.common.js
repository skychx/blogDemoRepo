'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 输出打包目录前先把 dist/ 删掉
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将 HTML 引用路径和我们的构建结果关联起来

// https://webpack.js.org/plugins/extract-text-webpack-plugin/#usage
// [已淘汰] 单独把 CSS 文件分离出来，注意这里的版本为 ^4.0.0-beta.0，webpack4 使用需要指定版本
// 官方推荐使用 mini-css-extract-plugin 抽离 css
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离 css 文件，以 link 形式引入
const webpack = require('webpack'); // 引用 webpack 内置插件

module.exports = {
    entry: {
        index: '../src/index.js',
    },
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.[hash:8].js',
    },
    module: {
        rules: [
            // html
            // {
            //     test: /\.html$/,
            //     use: 'html-withimg-loader' // 处理 html 中引用的 img
            // },
            // js
            {
                test: /\.js$/, // normal 普通的 loader
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 需要把 es6 -> es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器语法
                            ["@babel/plugin-proposal-class-properties", { "loose": true }], // 支持 class 语法
                            "@babel/plugin-transform-runtime" // 运行时，支持 promise 或 gen*
                        ]
                    }
                },
                include: path.resolve(__dirname, '../src'), // 指定为 src 文件
                exclude: /node_modules/, // 排除 node_modules
            },
            // css
            {
                test: /\.css$/,
                // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                use: [
                    {
                        // 将 css 插入 style 标签里
                        // 注意！！！：插入 style 标签是 js 动态插入的！打包好的 html 文件中并没有此 css 的 style 标签
                        loader: 'style-loader', 
                        options: {
                            insertAt: 'top', // 插入 css 的位置，是头部追加还是尾部追加
                        }
                    },
                    'css-loader', // css-loader 负责解析 CSS 代码, 处理 CSS 中的依赖, @import url 这种
                    'postcss-loader', // 预处理 css 文件，例如加浏览器前缀什么的，具体功能看 postcss.config.js 的配置
                ]
            },
            // less
            {
                test: /\.less$/,
                // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                use: [
                    MiniCssExtractPlugin.loader, // 创建一个 link 标签
                    'css-loader', // css-loader 负责解析 CSS 代码, 处理 CSS 中的依赖
                    'less-loader', // less 处理
                ],
            },
            // jpg | gif
            {
                test: /\.(jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader', // 主要作用是直接输出文件，把构建后的文件路径返回
                        options: {
                            name: 'assets/[hash:8].[ext]',
                        },
                    },
                ],
            },
            // png
            {
                test: /\.(png)$/,
                use: [
                    {
                        // 把小于某个限制的图片转为 base64 格式，转换失败的话默认用 file-loader
                        loader: 'url-loader',
                        options: {
                            limit: 6000, // 像素限制
                            name: 'assets/[hash:8].[ext]',
                        }
                    }
                ]
            },
             // 把 jQuery 和 $ 置为全局对象
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
        ]
    },
    // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
    externals: {
        bootstrap: "bootstrap"
    },
    resolve: {
        // 告诉 webpack 解析模块时应该搜索的目录
        modules: [
            "node_modules",
            path.resolve(__dirname, '../src'),
        ],
        // alias: 取别名的意思
        alias: {
            // 用 import 'utils' 来代替 import './utils'，减少引用路径
            utils: path.resolve(__dirname, '../src/utils'),
        },
        // 这里的顺序代表匹配后缀的优先级, webpack 会尝试帮你补全那些后缀名来进行查找
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: '../src/index.html', // 配置文件模板
            minify: {
                removeScriptTypeAttributes: true, // 移除脚本属性的引号
                removeStyleLinkTypeAttributes: true, // 移除样式属性的引号
                collapseWhitespace: false, // 压缩为单行
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[hash:8].css'
        }),
        // 在每个模块（都是闭包模块）中注入 _map 对象, 只是注入到每个模块，而不是放在 window 全局下
        // 这样可以实现自动加载模块的作用
        // new webpack.ProvidePlugin({
        //     _map: ['lodash', 'map']
        // }),
        // new ExtractTextWebpackPlugin('index.[hash:8].css'),
    ]
};
