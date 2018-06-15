/* eslint-env node */
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

// Extract CSS to a dedicated file when we’re not developing
const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].css',
});

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                autoprefixer: false,
                                minimize: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')(),
                                ],
                            },
                        },
                        'sass-loader',
                    ],
                }),
            },
        ]
    },
    plugins: [
        extractSass,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        })
    ],
});
