const { smart } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 把文件从 a 文件夹复制到 b 文件夹

const common = require('./webpack.common.js');

module.exports = smart(common, {
    mode: 'production',
    // https://webpack.docschina.org/guides/build-performance/#devtool
    devtool: 'nosources-source-map',
    plugins: [
        new CopyWebpackPlugin([
            // 顾名思义，from 配置来源，to 配置目标路径（默认为 output）
            { from: '../src/assets/favicon.ico' },
        ]),
    ],
})