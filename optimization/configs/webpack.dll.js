'use strict';

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // [不支持压缩 ES6] 压缩 js 文件
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom',],
        // react: ['lodash',],
    },
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '_dll_[name].js',
        library: '_dll_[name]',
    },
    plugins: [
        new webpack.DllPlugin({ // name === library
            name: '_dll_[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
};
