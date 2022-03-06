const { smart } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 原封不动复制文件

const common = require('./webpack.common.js');

module.exports = smart(common, {
    mode: 'production',
    // optimization: {
    //     minimize: false,
    // },
    plugins: [
        new CopyWebpackPlugin([
            { from: '../src/assets/favicon.ico' },
        ]),
    ],
})