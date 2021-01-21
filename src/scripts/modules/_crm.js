import vtex from '../services/_api';

const catalog = {
	async getCategoryTree(level) {
		const categoryTree = await vtex
			.get(`/category/tree/${level}/`, {
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
				},
			})
			.then((response) => {
				console.info(response.data);
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	},
};

export default catalog;
