'use strict';

var path = require('path');

function getPath(jsPath) {
    return path.join(__dirname, jsPath);
}

module.exports = [
    {
        entry: {
            'index': getPath('dev/js/index')
        },
        output: {
            path: getPath('dist/js/'),
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    query: {
                        presets: 'es2015'
                    }
                }
            ]
        }
    }
];