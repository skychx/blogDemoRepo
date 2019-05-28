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
    /**
     * 增加映射文件，帮我们调试源代码
     * 
     * https://webpack.docschina.org/configuration/devtool/
     * 
     * (1) eval：以 eval 形式注入业务代码，可能会有些报错信息丢失
     * (2) cheap：报错不会显示列信息，只会显示行信息
     * (3) module：还会生成一些第三方库的 map 文件，方便调试
     *
     * 1.source-map: 产生单独的 soursemap 文件，出错会标识出错的列和行
     * 2.eval-source-map: 不产生单独的文件, 增加映射文件，帮我们调试源代码
     * 3.cheap-module-source-map: 不会产生列，但是一个单独的文件, 产生后可以保存起来（用的不多，可以在线上用【解决线上 bug】）
     * 4.cheap-module-eval-source-map: 不会长生文件，集成在打包后的文件末尾，不会产生列提示（调试模式推荐）
     * 
     */
    devtool: 'source-map',
    plugins: [
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ]
})

// 备注
/**
 * 热更新配置：
 * 
 * 1.devServer.hot 设为 true
 * 2.添加 webpack.NamedModulesPlugin()
 * 3.添加 webpack.HotModuleReplacementPlugin()
 */