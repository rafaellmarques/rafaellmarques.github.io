// Packages
const { src, dest } = require('gulp');
const vinylnamed = require('vinyl-named');
const webpackconfig = require('../webpack.config').default;
const webpackstream = require('webpack-stream');

// Paths
const paths = {
	input: './src/scripts/pages/*.js',
	output: './assets/scripts/',
};

// Task
const scripts = {
	transpile() {
		return src(paths.input).pipe(vinylnamed()).pipe(webpackstream(webpackconfig)).pipe(dest(paths.output));
	},
};

// Export
module.exports = {
	build: scripts.transpile,
};
