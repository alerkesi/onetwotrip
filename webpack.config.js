'use strict';

var path = require('path');

module.exports = {
    context: path.resolve('./src/scripts'),
    entry: './index.js',
    output: {
        path: './release/scripts',
        publicPath: '/scripts/',
        filename: '[name].js'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.jsx/,
                loader: 'jsx-loader'
            },
            {
                test: /\.css/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};