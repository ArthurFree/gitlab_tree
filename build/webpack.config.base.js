const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(pathname) {
	return path.resolve(__dirname, '..', pathname);
}

const postcssOpts = {
    ident: 'postcss',
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'Android >= 4']
        })
    ]
};

module.exports = {
	entry: {
		'app': resolve('src/index')
	},

	output: {
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
		path: resolve('dist'),
		publicPath: '/'
	},

	resolve: {
		modules: [resolve('node_modules'), resolve('src')],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less'],
		// alias: {

		// }
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				enforce: 'pre',
				include: resolve('src')
			},
			{
                test: /\.(ts|tsx)$/,
                include: resolve('src'),
                loader: 'ts-loader',
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.woff(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff",
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.woff2(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff",
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.ttf(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&minetype=application/octet-stream",
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.eot(\?t=\d+(#iefix)?)?$/,
                loader: "url-loader?limit=10000&minetype=application/octet-stream",
                include: resolve("./src/assets/iconfont")
            },
            {
                test: /\.svg(\?t=\d+(#\w+)?)?$/,
                loader: "url-loader?limit=10000&minetype=image/svg+xml",
                include: resolve("./src/assets/iconfont")
            },
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
		]
	},

	plugins: []
}
