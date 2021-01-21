// Packages
const browsersync = require('browser-sync');
const { watch, series } = require('gulp');

// Import tasks
const taskImages = require('./images');
const taskScripts = require('./scripts');
const taskStyles = require('./styles');

// Path
const paths = {
	images: './src/images/**/*.+(gif|ico|jpg|jpeg|png|svg)',
	scripts: './src/scripts/**/*.js',
	styles: './src/styles/**/*.+(c|sa|sc)ss',
};

// Task
const watchFiles = () => {
	watch(paths.images, taskImages.build);
	watch(paths.scripts, taskScripts.build);
	watch(paths.styles, taskStyles.build);
};

const reload = () => {
	browsersync.reload();
};

// Exposes
module.exports = {
	build: series(watchFiles, reload),
};
