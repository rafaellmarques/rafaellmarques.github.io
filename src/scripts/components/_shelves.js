'use strict';

import swiper from 'swiper/bundle';

const shelf = {
	init(element) {
		this.clear(element);
		this.dataAttribute(element);
		this.lazyload(element);
		this.normalization(element);
		// this.sliderSwiper(element);
	},

	clear(element) {
		const el = document.querySelectorAll(element);

		if (el) {
			el.forEach((e) => {
				const helperComplement = e.querySelectorAll('.helperComplement');

				if (helperComplement) {
					helperComplement.forEach((hc) => {
						hc.parentNode.removeChild(hc);
					});
				}
			});
		}
	},

	dataAttribute(element) {
		const el = document.querySelectorAll(element);

		if (el) {
			el.forEach((e, i) => {
				e.dataset.shelf = i;
				e.firstElementChild.classList.add(`${e.classList[0]}-list`);

				const listItem = e.querySelectorAll('li');

				if (listItem) {
					listItem.forEach((li) => {
						li.classList.add(`${e.classList[0]}-item`);
					});
				}
			});
		}
	},

	lazyload(element) {
		const el = document.querySelectorAll(element);

		if (el) {
			el.forEach((e) => {
				const image = e.querySelectorAll('img');

				if (image) {
					image.forEach((img) => {
						const file = img.getAttribute('src');

						if (file) {
							console.warn('Image source is empty!');
						} else {
							console.warn('Image source has content!');
						}

						img.setAttribute('loading', 'lazy');
					});
				}
			});
		}
	},

	normalization() {
		const spd = document.querySelectorAll('.shelf-product-details');

		spd.forEach((childElement) => {
			const ce = childElement.childNodes;

			ce.forEach((child) => {
				const c = child;
				if (c.classList != 'shelf-product-skus') {
					setTimeout(() => {
						const children = document.getElementsByClassName(c.className);
						const arrayLength = children.length;
						const heights = [];

						for (let i = 0; i < arrayLength; i++) {
							heights.push(children[i].offsetHeight);
						}

						const getHighest = () => {
							return Math.max(...heights);
						};

						const tallest = getHighest();

						for (let i = 0; i < children.length; i++) {
							children[i].style.height = tallest + 'px';
						}
					}, 2000);
				} else {
					setTimeout(() => {
						const children = document.getElementsByClassName(c.className);
						const arrayLength = children.length;
						const heights = [];

						for (let i = 0; i < arrayLength; i++) {
							heights.push(children[i].offsetHeight);
						}

						const getHighest = () => {
							return Math.max(...heights);
						};

						const tallest = getHighest();

						for (let i = 0; i < children.length; i++) {
							children[i].style.height = tallest + 'px';
						}
					}, 5000);
				}
			});
		});
	},

	observerShelf(element) {
		const el = document.querySelector(element);
		const config = { childList: true };
		const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		const observer = new MutationObserver((mutations) => {
			mutations.forEach(() => {
				console.info(mutation.type);

				if (mutation.type === 'childList') {
					console.info('Mutation Child Works');
				}
			});
		});
		observer.observe(el, config);
	},

	sliderSwiper(element) {
		const el = document.querySelectorAll(element);
		const tpl = `
			<div class="swiper-container swiper-shelf">
				<div class="swiper-button-prev"></div>
				<div class="swiper-wrapper"></div>
				<div class="swiper-button-next"></div>
				<div class="swiper-pagination"></div>
			</div>
		`;

		el.forEach((e) => {
			console.info(e);

			const listItem = e.querySelectorAll('li');

			if (listItem && listItem.length > 4) {
				listItem[0].parentNode.classList.add('swiper');
				listItem[0].parentNode.insertAdjacentHTML('afterbegin', tpl);

				const swiperWrapper = listItem[0].parentNode.querySelector('.swiper-wrapper');

				if (swiperWrapper) {
					listItem.forEach((li) => {
						li.classList.add('swiper-slide');
						swiperWrapper.insertBefore(li, swiperWrapper.lastChild);
					});
				}

				const swiperShelf = new swiper('.swiper-shelf', {
					slidesPerGroup: 2,
					slidesPerView: 2,
					spaceBetween: 16,
					speed: 1500,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					breakpoints: {
						300: {
							slidesPerGroup: 2,
							slidesPerView: 2,
						},
						600: {
							slidesPerGroup: 3,
							slidesPerView: 3,
						},
						1200: {
							slidesPerGroup: 4,
							slidesPerView: 4,
						},
					},
				});
			}
		});
	},
};

export default shelf;
