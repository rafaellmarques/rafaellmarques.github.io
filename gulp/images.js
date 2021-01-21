// Packages
const { src, dest } = require('gulp');
const cache = require('gulp-cache');
const flatten = require('gulp-flatten');
const imagemin = require('gulp-imagemin');

// Paths
const paths = {
	input: './src/images/**/*.{gif,ico,jpg,jpeg,png,svg}',
	output: './assets/images/',
};

// Task
const images = {
	minify() {
		return src(paths.input)
			.pipe(cache(imagemin()))
			.pipe(flatten())
			.pipe(dest([paths.output]));
	},
};

// Export
module.exports = {
	build: images.minify,
};
