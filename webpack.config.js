const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: './app/vendor.js',
        '09-header-footer': './app/09-header-footer/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './app/wpk')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?minimize&sourceMap'
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?minimize&sourceMap!sass-loader?sourceMap'
            })
        }]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['09-header-footer', 'vendor']
        }),
    ]
}