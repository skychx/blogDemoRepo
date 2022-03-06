'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 输出打包目录前先把 dist/ 删掉
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将 HTML 引用路径和我们的构建结果关联起来
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离 css 文件，以 link 形式引入
const webpack = require('webpack'); // 引用 webpack 内置插件

module.exports = {
    entry: {
        index: '../src/index.js',
        // utils: '../src/utils.js',
    },
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js',
    },
    optimization: {
        // 参数详解：https://webpack.docschina.org/plugins/split-chunks-plugin
        splitChunks: {
            chunks: 'all', // 默认为 async，也就是只对异步加载的 chunk 单独打包
        }
    },
    module: {
        // 不去解析 jquery 中的依赖库
        noParse: /jquery|lodash/,
        rules: [
            // javascript
            {
                test: /\.js$/, // normal 普通的 loader
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 需要把 es6 -> es5
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器语法
                            ["@babel/plugin-proposal-class-properties", { "loose": true }], // 支持 class 语法
                            "@babel/plugin-transform-runtime", // 运行时，支持 promise 或 gen*
                            "@babel/plugin-syntax-dynamic-import", // 支持 import then 语法
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
                    MiniCssExtractPlugin.loader, // 创建一个 link 标签
                    'css-loader', // css-loader 负责解析 CSS 代码, 处理 CSS 中的依赖
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: '../src/index.html', // 配置文件模板
        }),
        new MiniCssExtractPlugin({
            filename: 'index.bundle.css'
        }),
    ]
};
