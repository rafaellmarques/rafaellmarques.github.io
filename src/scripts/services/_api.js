import axios from 'axios';

const github = axios.create({
	baseURL: '//api.github.com/',
	headers: {
		'content-Type': 'application/json; charset=utf-8',
		accept: 'application/vnd.github.v3+json',
	},
});

export default github;
