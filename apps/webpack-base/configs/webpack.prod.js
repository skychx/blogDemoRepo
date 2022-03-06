const { smart } = require('webpack-merge');
const OptimizeCss = require('optimize-css-assets-webpack-plugin'); // 压缩 css 文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // [不支持压缩 ES6] 压缩 js 文件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 原封不动复制文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack'); // 引用 webpack 内置插件

const common = require('./webpack.common.js');

module.exports = smart(common, {
    mode: 'production',
    optimization: { // 优化项
        minimizer: [
            // webpack4 默认 production 环境开启压缩，并默认使用 TerserPlugin 压缩 JS
            // webpack4 没有内置 CSS 压缩，配置 CSS 压缩插件的时候，会覆盖原来的 TerserPlugin，
            // 所以要压缩 JS 时，要同时要配置 JS 压缩工具，这里试了另一个 JS 压缩插件：UglifyJsPlugin
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 是否并发压缩
                sourceMap: true
            }),
            new OptimizeCss() 
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            // 顾名思义，from 配置来源，to 配置目标路径（默认为 output）
            { from: '../src/assets/favicon.ico' },
            { from: '../doc', to: 'doc/' }, // Copy directory contents to {output}/doc/
        ]),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的 http 服务器
            generateStatsFile: true, // 是否生成 stats.json 文件
        }),
        new webpack.BannerPlugin('make 2019 by skychx'), // 版权所有插件
    ],
})