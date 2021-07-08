const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    resolve: {
        modules: [
            path.resolve(__dirname, 'assets/scripts'),
            path.resolve(__dirname, 'assets'),
            'node_modules',
        ],
        extensions: ['.js'],
    },
    entry: {
        common: path.resolve(__dirname, 'assets/js/common.js'),
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')(),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif|webp|woff|woff2|eot|ttf|otf)$/,
                exclude: path.resolve('./assets/icons'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                include: path.resolve('./assets/icons'),
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'icons.svg',
                            esModule: false,
                        },
                    },
                    'svgo-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new SpriteLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/bulma-carousel/dist', to: 'bulma-carousel' },
                { from : 'node_modules/uikit/dist/js', to: 'uikit/js'}
            ],
        }),
    ],
    devServer: {
        proxy: {
            '**': 'http://rsickenberg.io',
        },
        public: 'rsickenberg.io:3000',
        host: '0.0.0.0',
        port: 3000,
        compress: true,
        // Polling is required inside Vagrant boxes
        watchOptions: {
            poll: true,
        },
        overlay: true,
        // Here you can specify folders that contain your views
        // So they’ll trigger a page reload when you change them
        // contentBase: ['./app/views'],
        // watchContentBase: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
    },
};
