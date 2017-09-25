const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        'app.prod': './app/main.js',
        'install.prod': './app/install/install.js'
    },
    output: {
        path: path.resolve(__dirname, './app/wpk'),
        filename: '[name].js'
    },
};