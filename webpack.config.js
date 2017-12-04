
// https://github.com/JeffGuKang/npm-webpack-boilerplate/blob/master/webpack.config.js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
    },
    module: {
        loaders: [
            {
                test: [/\.js?$/],
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                }
            },
            {
                test: /\.html$/,
                loader: 'raw',
            },
        ],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
        /*new HtmlWebpackPlugin({
            template: './views/index.ejs',
            inject: false,
        }),*/
    ],
}
