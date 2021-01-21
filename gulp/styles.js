// Packages
const autoprefixer = require('autoprefixer');
const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const pkg = require('../package.json');

sass.compiler = require('node-sass');

// Paths
const paths = {
	input: './src/styles/pages/*.scss',
	output: './assets/styles/',
};

// Task
const styles = {
	sass() {
		return src(paths.input)
			.pipe(sourcemaps.init())
			.pipe(sass({ outputStyle: 'extended' }).on('error', sass.logError))
			.pipe(
				postcss([
					autoprefixer({
						overrideBrowserslist: ['last 2 versions'],
						cascade: false,
					}),
				])
			)
			.pipe(rename({ prefix: `${pkg.name}-` }))
			.pipe(sourcemaps.write('.'))
			.pipe(dest(paths.output));
	},
};

// Export
module.exports = {
	build: styles.sass,
};
