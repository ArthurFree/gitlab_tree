const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const formatter = require('eslint-friendly-formatter');
const webpackBaseConfig = require('./webpack.config.base.js');

const rootPath = path.join(__dirname, '..');
const basePath = './tmpl';

let _cfg = Object.assign({}, webpackBaseConfig, {
    devtool: 'cheap-eval-source-map',
    entry: {
        'app': [
            // 'webpack-dev-server/client?http://127.0.0.0:8080',
            // 'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client?path=http://localhost:8081/__webpack_hmr&reload=true',
            path.resolve(__dirname, '..', 'src/index')
        ]
    }
});

_cfg.module.rules = [
    // {
    // 	test: /\.(ts|tsx)$/,
    // 	loader: 'tslint-loader',
    // 	enforce: 'pre',
    // 	include: path.resolve(__dirname, '..', './src')
    // },
    {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
            formatter,
        }
    }
].concat(_cfg.module.rules);

function getHtmlChunks() {
    return new HtmlWebpackPlugin({
        title: 'gitlab-tree',
        name: 'app',
        // template: path.join(rootPath, basePath, 'index.html'),
        template: path.join(rootPath, 'index.html'),
        // filename: path.join(rootPath, 'index.html'),
        filename: path.join(rootPath, 'dist/index.html'),
        inject: true,
        chunks: ['commons', 'app'],
    })
}

_cfg.plugins = webpackBaseConfig.plugins
    .concat([
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                eslint: {
                    emitError: true,  // 验证失败，终止
                    configFile: '.eslintrc.js'
                }
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                "NODE_ENV": JSON.stringify('dev')
            }
        }),
        // new CopyWebpackPlugin([
        // 	{
        // 		from: path.join(rootPath, 'src/lib'),
        // 		to: path.join(rootPath, 'dist/lib')
        // 	},
        // ])
    ])
    .concat(getHtmlChunks())

// 判断 dll 文件是否已生成
let dllExist = false;
try {
    fs.statSync(path.resolve(__dirname, '..', 'dist', 'dll', 'vendor.dll.js'));
    dllExist = true;
} catch (e) {
    dllExist = false;
}

if (dllExist) {
    _cfg.plugins.push(
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            /**
             * 在这里引入 manifest 文件
             */
            manifest: require('../dist/dll/vendor-manifest.json')
        })
    );
}

module.exports = _cfg;
