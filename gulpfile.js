// Packages
const { series, parallel } = require('gulp');

// Import tasks
const taskImages = require('./gulp/images');
const taskScripts = require('./gulp/scripts');
const taskServer = require('./gulp/server');
const taskStyles = require('./gulp/styles');
const taskWatch = require('./gulp/watch');

// Define tasks
const build = series(parallel(taskImages.build, taskScripts.build, taskStyles.build), parallel(taskWatch.build, taskServer.build));
const buildImages = series(taskImages.build);
const buildScripts = series(taskScripts.build);
const buildServer = series(taskServer.build);
const buildStyles = series(taskStyles.build);
const buildWatch = series(taskWatch.build);

// Expose tasks to CLI
exports.build = build;
exports.images = buildImages;
exports.scripts = buildScripts;
exports.server = buildServer;
exports.styles = buildStyles;
exports.watch = buildWatch;
