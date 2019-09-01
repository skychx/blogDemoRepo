module.exports = function (env, argv) {
    return argv.mode === 'production' ?
        require('./configs/webpack.prod.js') :
        require('./configs/webpack.dev.js')
}