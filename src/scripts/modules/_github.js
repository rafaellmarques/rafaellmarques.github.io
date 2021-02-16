'use strict';

import github from '../services/_api';

const users = {
	async getUser(login) {
		await github
			.get(`/users/${login}/`, {
				headers: {},
			})
			.then((response) => {
				console.info(response.data);
				document.querySelector('.profile').innerHTML = JSON.stringify(response.data);
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	},
};

export default users;
