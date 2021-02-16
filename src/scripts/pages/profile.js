'use strict';

import utilities from '../modules/_utilities';
import tilt from 'vanilla-tilt';

const profile = {
	init() {
		utilities.isMobile();
		this.githubUser('rafaellmarques');
	},

	async githubUser(login) {
		const divProfile = document.querySelector('.profile');

		const profile = await fetch(`//api.github.com/users/${login}`, {
			headers: {
				accept: 'application/vnd.github.v3+json',
				'content-type': 'application/json; charset=utf-8',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				const icoBio = `
				<?xml version='1.0' encoding='UTF-8'?>
				<svg viewBox="-2 -5.6375 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<g transform="translate(-0.6294, -4.2496)">
						<g transform="matrix(0.0571, 0, 0, 0.0571, 0, 0)">
							<path d="M160, 389A20.91 20.91 0 0 1 146.18, 383.8L18.18, 271.8A21 21 0 0 1 18.18, 240.2L146.18, 128.2A21 21 0 0 1 173.84, 159.81L63.89, 256L173.83, 352.19A21 21 0 0 1 160, 389z" />
						</g>
					</g>
					<g transform="translate(-0.6294, -4.2496)">
						<g transform="matrix(0.0571, 0, 0, 0.0571, 0, 0)">
							<path d="M352, 389A21 21 0 0 1 338.16, 352.19L448.11, 256L338.17, 159.81A21 21 0 0 1 365.83, 128.2L493.83, 240.2A21 21 0 0 1 493.83, 271.8L365.83, 383.8A20.89 20.89 0 0 1 352, 389z" />
						</g>
					</g>
					<g transform="translate(-0.6294, -4.2496)">
						<g transform="matrix(0.0571, 0, 0, 0.0571, 0, 0)">
							<path d="M208, 437A21 21 0 0 1 187.88, 410L283.88, 90A21 21 0 1 1 324.11, 102L228.11, 422A21 21 0 0 1 208, 437z" />
						</g>
					</g>
				</svg>`;
				const icoLocation = `
				<?xml version='1.0' encoding='UTF-8'?>
				<svg viewBox="-6 -2 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<g transform="translate(-6.0005, -2.0001)">
						<g transform="matrix(0.0625, 0, 0, 0.0625, 0, 0)">
							<circle cx="256" cy="192" r="32" />
						</g>
					</g>
					<g transform="translate(-6.0005, -2.0001)">
						<g transform="matrix(0.0625, 0, 0, 0.0625, 0, 0)">
							<path d="M256, 32C167.78, 32 96, 100.65 96, 185C96, 225.17 114.31, 278.59 150.42, 343.78C179.42, 396.12 212.97, 443.45 230.42, 467A31.75 31.75 0 0 0 281.64, 467C299.06, 443.45 332.64, 396.12 361.64, 343.78C397.69, 278.61 416, 225.19 416, 185C416, 100.65 344.22, 32 256, 32zM256, 256A64 64 0 1 1 320, 192A64.07 64.07 0 0 1 256, 256z" />
						</g>
					</g>
				</svg>`;
				data.id && data.id != typeof undefined ? document.querySelector('.profile-card').id = `${data.id}` : '';
				document.querySelector('.profile-avatar').innerHTML = `<img src='${data.avatar_url}' alt='${data.login}' class='profile-image'/>`;
				document.querySelector('.profile-name').innerHTML = `${data.name}`;
				document.querySelector('.profile-bio').innerHTML = `${icoBio}<span>${data.bio}</span>`;
				document.querySelector('.profile-location').innerHTML = `${icoLocation}<span>${data.location}</span>`;
				data.twitter_username ? document.querySelector('#twitter a').setAttribute('href', `//twitter.com/${data.twitter_username}`) : utilities.remove(document.querySelector('#twitter'));
			})
			.catch((error) => console.error(error));
	},
};

window.load = profile.init();

export { profile };
