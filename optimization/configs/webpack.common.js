'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 输出打包目录前先把 dist/ 删掉
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将 HTML 引用路径和我们的构建结果关联起来
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 顾名思义，把资源加到 html 里
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离 css 文件，以 link 形式引入
const AutoDllPlugin = require('autodll-webpack-plugin'); // 自动引入 DLL 链接库插件
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack'); // 引用 webpack 内置插件

module.exports = {
    entry: {
        index: '../src/index.js',
    },
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].bundle.js',
    },
    optimization: {
        // 参数详解：https://webpack.docschina.org/plugins/split-chunks-plugin
        splitChunks: {
            chunks: 'async', // 默认为 async，也就是只对异步加载的 chunk 单独打包，可以配置为 all ，对同步的 chunk 也拆分
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
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: '../src/index.html', // 配置文件模板
        }),
        new MiniCssExtractPlugin({
            filename: 'index.bundle.css'
        }),
        // 自动引入 DLL 自动链接库
        // new AutoDllPlugin({
        //     inject: true, // will inject the DLL bundles to index.html
        //     filename: '[name].dll.js',
        //     context: path.resolve(__dirname, '../'),
        //     entry: {
        //         react: [
        //             'react',
        //             'react-dom'
        //         ]
        //     }
        // })
        // 手动引入 DLL 动态链接库
        // new webpack.DllReferencePlugin({
        //     // 注意！！！
        //     // DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
        //     context: path.resolve(__dirname, '../'),
        //     manifest: path.resolve(__dirname, '../dll/react.manifest.json'),
        // }),
        // new AddAssetHtmlPlugin({
        //     filepath: path.resolve(__dirname, '../dll/_dll_react.js'),
        // }),
        // 字如其名，提供 webpack 硬缓存
        // new HardSourceWebpackPlugin(),
    ]
};
