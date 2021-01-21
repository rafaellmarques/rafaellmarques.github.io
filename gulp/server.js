// Packages
const browsersync = require('browser-sync');

// Paths
const paths = {
	images: './assets/images/',
	scripts: './assets/scripts/',
	styles: './assets/styles/',
};

// Task
const server = {
	local() {
		browsersync.create('local').init({
			browser: 'firefox' || 'chrome',
			https: true,
			open: true,
			port: 8541,
			server: {
				baseDir: './',
				index: 'index.html',
			},
			startPath: '/',
			ui: {
				port: 8127,
			},
			watch: true,
		});
	},
};

// Export
module.exports = {
	build: server.local,
};
