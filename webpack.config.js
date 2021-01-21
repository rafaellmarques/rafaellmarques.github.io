const pkg = require('./package.json');

const config = {
	mode: 'development',
	output: {
		filename: `${pkg.name}-[name].js`,
		sourceMapFilename: `${pkg.name}-[name].map.js`,
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs|ts|tsx)?$/i,
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: { fix: true },
			},
			{
				test: /\.(js|jsx|mjs|ts|tsx)?$/i,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(gif|jp(e*)g|png|svg)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
		],
	},
	stats: {
		env: true,
	},
};

exports.default = config;
