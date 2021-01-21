'use strict';

import utilities from '../modules/_utilities';

const main = {
	init() {
		this.serviceWorker();
		utilities.isMobile();
		utilities.pageName();
	},

	serviceWorker() {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/service-worker.js');
			});
		}
	},
};

window.load = main.init();

export { main };
