import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import pkg from './package.json' with { type: 'json' };
import appManifest from './public/manifest.json' with { type: 'json' };

const { homepage } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, argv) => {
    const isEnvProduction = argv.mode === 'production';
    const rootPath = homepage && isEnvProduction ? homepage : '/';

    const plugins = [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/img/logo.svg',
            isEnvProduction,
            rootPath,
            description: appManifest.name,
            title: appManifest.short_name,
            language: 'sk',
            GTM_ID: 'GTM-5Z6SFDZ',
        }),
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: homepage,
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    const m = manifest;
                    m[file.name] = file.path;
                    return m;
                }, seed);
                const entrypointFiles = entrypoints.main.filter(
                    (fileName) => !fileName.endsWith('.map')
                );

                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                };
            },
        }),
    ];
    if (isEnvProduction) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            })
        );
    }

    return {
        devtool: 'source-map',
        devServer: {
            historyApiFallback: {
                disableDotRule: true,
            },
            hot: true,
            open: [homepage],
            port: 3000,
        },
        entry: './src/index.jsx',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // Creates `style` nodes from JS strings
                        isEnvProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.svg$/i,
                    type: 'asset',
                    resourceQuery: /url/, // *.svg?url
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(jpe?g|gif|png)$/i,
                    type: 'asset',
                },
                {
                    test: /\.csv$/i,
                    type: 'asset/resource',
                },
            ],
        },
        output: {
            clean: true,
            path: path.join(__dirname, '/build'),
            pathinfo: !isEnvProduction,
            publicPath: rootPath,
            filename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : 'static/js/bundle.js',
            chunkFilename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : 'static/js/[name].chunk.js',
            assetModuleFilename: 'static/media/[name].[hash][ext]',
        },
        plugins,
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    };
};
