const { smart } = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = smart(common, {
    mode: 'development',
    // 开发服务器的配置
    devServer: {
        port: 3000, // 端口号，默认 8080
        progress: true, // 进度条
        contentBase: '../dist', // 指定默认目录
        compress: true, // gzip 压缩
        hot: true, // 开启热更新
    },
    // 监听 webpack 变动
    watch: true,
    // 监控的选项
    watchOptions: {
        poll: 1000, // 每秒检查一次变动
        aggregateTimeout: 500, // 防抖 我一直输入代码 
        ignored: /node_modules/ // 不需要进行监控哪个文件
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ]
})