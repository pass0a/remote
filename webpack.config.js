const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
//const fs = require('fs-extra');
let opt_dist = 'dist';
let opt_watch = false;

module.exports = () => {
	let index_file = './src/android.ts';
	let exclude_file = [ path.resolve(__dirname, 'src/logic_arm.ts'), path.resolve(__dirname, 'src/arm.ts') ];
	if (process.env.opt == 'arm') {
		index_file = './src/arm.ts';
		exclude_file = [ path.resolve(__dirname, 'src/logic_android.ts'), path.resolve(__dirname, 'src/android.ts') ];
	}
	const nodeConfig = {
		// Change to your "entry-point".
		watch: opt_watch,
		entry: {
			index: index_file
		},
		output: {
			path: path.resolve(__dirname, opt_dist),
			filename: '[name].js',
			libraryTarget: 'commonjs2'
		},
		resolve: {
			extensions: [ '.ts', '.js', '.json' ]
		},
		module: {
			rules: [
				{
					// Include ts, tsx, js, and jsx files.
					test: /\.(js)x?$/,
					loader: 'babel-loader'
				}
			],
			rules: [
				{
					// Include ts, tsx, js, and jsx files.
					test: /\.(ts)x?$/,
					loader: 'ts-loader',
					exclude: [ exclude_file ],
					options: {
						// 指定特定的ts编译配置，为了区分脚本的ts配置
						configFile: path.resolve(__dirname, './tsconfig.json')
					}
				}
			]
		},
		node: {
			// Replace these Node.js native modules with empty objects, Mongoose's
			// browser library does not use them.
			// See https://webpack.js.org/configuration/node/
			fs: false,
			util: false,
			events: false,
			http: false,
			dgram: false,
			net: false,
			buffer: false,
			crypto: false,
			dns: false,
			assert: false,
			stream: false,
			os: false,
			url: false,
			querystring: false,
			tls: false,
			path: false,
			tty: false,
			module: false,
			zlib: false,
			__dirname: false,
			__filename: false
		},
		//plugins: [ new BundleAnalyzerPlugin() ],
		externals: {
			'@passoa/img': '@passoa/img',
			'@passoa/fb': '@passoa/fb',
			'@passoa/touch': '@passoa/touch'
		},
		devtool: 'source-map',
		target: 'node',
		mode: 'development' //'production'
	};
	return [ nodeConfig ];
};
