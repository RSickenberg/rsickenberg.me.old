/* eslint-env node */
const webpack = require('webpack');
const path = require('path');

const src = './assets/';
const dest = './www/static/';

module.exports = {
    entry: {
        bundle: [
            path.resolve(src, 'js/index.js'),
            path.resolve(src, 'scss/zebra.scss'),
            'react-hot-loader/patch'
        ],
        bill: [
            path.resolve(src, 'js/apps/projects/Bill.js'),
            'react-hot-loader/patch'
        ],
    },
    resolve: {
        modules: [
            path.resolve(src),
            path.resolve(`${src}js`),
            'node_modules',
        ],
        extensions: ['.js'],
    },
    output: {
        path: path.resolve(dest),
        publicPath: '/static/',
        filename: 'js/[name].js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(`${src}js`),
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.(eot|svg|ttf|woff2?)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                },
            }
        ]
    }
};
