const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const autoprefixer = require('autoprefixer');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack.config.base.js');

const rootPath = path.join(__dirname, '..');
const basePath = './tmpl';

const postcssOpts = {
    ident: 'postcss',
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'Android >= 4']
        })
    ]
};

let _cfg = Object.assign({}, webpackBaseConfig, {
    devtool: 'source-map',
});

_cfg.module.rules = _cfg.module.rules.concat([
    {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'
            ]
        })
    },
    {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader', { loader: 'postcss-loader', options: postcssOpts }
            ]
        })
    }
]);

function getHtmlChunks() {
    return new HtmlWebpackPlugin({
        title: 'gitlab-tree',
        name: 'app',
        template: path.join(rootPath, 'index.html'),
        filename: path.join(rootPath, 'dist/index.html'),
        inject: true,
        // chunks: ['vendor', 'app'],
    })
}

_cfg.plugins = webpackBaseConfig.plugins
    .concat([
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                "NODE_ENV": JSON.stringify('prod')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // filename: 'commons.js',
            minChunks (module) {
                return (
                    module.resource
                    && /.js$/.test(module.resource)
                    && module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor-async',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true,
            options: {
                // eslint: {
                //     emitError: true,  // 验证失败，终止
                //     configFile: '.eslintrc.js'
                // }
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            allChunks: true,
        }),
        new ManifestPlugin({
            filename: 'mapping.json',
            publicPath: '/',
            seed: {
                title: 'gitlab tree'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compressor: {
                warnings: false,
            },
            mangle: {
                except: [] // 设置不混淆变量名
            }
        })
        // new CopyWebpackPlugin([
        // 	{
        // 		from: path.join(rootPath, 'src/lib'),
        // 		to: path.join(rootPath, 'dist/lib')
        // 	},
        // ])
    ])
    .concat(getHtmlChunks())

module.exports = _cfg;
