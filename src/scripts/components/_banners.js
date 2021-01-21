'use strict';

import swiper from 'swiper/bundle';

const banner = {
	init(element) {
		this.dataAttribute(element);
		this.lazyload(element);
		this.sliderSwiper(element);
	},

	dataAttribute(element) {
		const el = document.querySelectorAll(element);

		if (el) {
			el.forEach((e) => {
				const boxBanner = e.querySelectorAll('.box-banner');

				if (boxBanner) {
					boxBanner.forEach((bb, i) => {
						bb.dataset.bannerIndex = i;
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
						img.setAttribute('loading', 'lazy');
					});
				}
			});
		}
	},

	sliderSwiper(element) {
		const el = document.querySelectorAll(element);
		const tpl = `
			<div class="swiper-container swiper-banner">
				<div class="swiper-button-prev"></div>
				<div class="swiper-wrapper"></div>
				<div class="swiper-button-next"></div>
				<div class="swiper-pagination"></div>
			</div>
		`;

		el.forEach((e) => {
			const boxBanner = e.querySelectorAll('.box-banner');

			if (boxBanner && boxBanner.length > 1) {
				boxBanner[0].parentNode.classList.add('swiper');
				boxBanner[0].parentNode.insertAdjacentHTML('afterbegin', tpl);

				const swiperWrapper = boxBanner[0].parentNode.querySelector('.swiper-wrapper');

				if (swiperWrapper) {
					boxBanner.forEach((bb) => {
						bb.classList.add('swiper-slide');
						swiperWrapper.insertBefore(bb, swiperWrapper.lastChild);
					});
				}

				const swiperBanner = new swiper('.swiper-banner', {
					autoplay: {
						delay: 3000,
					},
					centeredSlides: true,
					loop: true,
					slidesPerView: 1,
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
				});
			}
		});
	},
};

export default banner;
