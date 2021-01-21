'use strict';

import vtex from '../services/_api';

const header = {
	init() {
		// this.cartQuantity();
		// this.menuHome();
		// this.menuMobile();
		// this.menuPrincipal();
		// this.menuCategoryTree(3);
	},

	cartQuantity() {
		vtexjs.checkout.getOrderForm().done((orderForm) => {
			const cq = document.querySelector('.header__middle-cart-quantity');
			const oi = vtexjs.checkout.orderForm.items;

			const cqi = oi.reduce((sum, item) => {
				return sum + item.quantity;
			}, 0);

			parseInt(cq.innerHTML) !== cqi ? (cq.innerHTML = cqi) : '';
		});
	},

	menuHome() {
		const menuPrincipal = document.querySelector('.menu-principal');

		const itemHome = `
      <li class='itemMenu home'>
        <a class='menuLink' href='/' title='Home'>Home</a>
      </li>
		`;

		if (menuPrincipal) {
			menuPrincipal.insertAdjacentHTML('afterbegin', itemHome);
		}
	},

	menuMobile() {
		const body = document.querySelector('body');
		const mobileHeader = document.querySelector('.header');
		const mobileButton = document.querySelector('.header__middle-menu-button');
		const mobileOptions = document.querySelector('.header__bottom');

		mobileButton.addEventListener('click', () => {
			if (!mobileOptions.classList.contains('show')) {
				mobileOptions.setAttribute(
					'style',
					`height: auto; max-height: ${window.outerHeight - mobileHeader.clientHeight - 1}px; min-height: ${mobileOptions.querySelector('.header__bottom-menu').clientHeight + 16}px;`
				);
				mobileOptions.classList.add('show');
				mobileButton.classList.add('open');
				body.classList.add('block');
			} else {
				mobileOptions.setAttribute('style', 'height: 0px');
				mobileOptions.classList.remove('show');
				mobileButton.classList.remove('open');
				body.classList.remove('block');
			}
		});
	},

	async menuCategoryTree(level) {
		const categoryTree = await vtex
			.get(`/category/tree/${level}/`, {
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
				},
			})
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});

		const subMenu = document.querySelector('.subMenu');

		categoryTree.forEach((ct) => {
			if (ct.children.length > 0) {
				const subMenuItem = `
            <li class='subMenuItem'>
              <a class='subMenuLink' href='${ct.url}' title='${ct.name}'>${ct.name}</a>
              <ul class='subMenuThird-${ct.id}'></ul>
            </li>
          `;

				subMenu.insertAdjacentHTML('beforeend', subMenuItem);

				const subMenuThird = document.querySelector(`.subMenuThird-${ct.id}`);
				const categoryChildren = ct.children;

				categoryChildren.forEach((cc) => {
					if (cc.children.length > 0) {
						const subMenuThirdItem = `
              <li class='subMenuThirdItem'>
                <a class='subMenuThirdLink' href='${cc.url}' title='${cc.name}'>${cc.name}</a>
                <ul class='subMenuFourth-${ct.id}'></ul>
              </li>
            `;

						subMenuThird.insertAdjacentHTML('beforeend', subMenuThirdItem);

						const subMenuFourth = document.querySelector(`.subMenuFourth-${ct.id}`);
						const categoryGrandChildren = cc.children;

						categoryGrandChildren.forEach((cgc) => {
							const subMenuFourthItem = `
                <li class='subMenuFourthItem'>
                  <a class='subMenuFourthLink' href='${cgc.url}' title='${cgc.name}'>${cgc.name}</a>
                </li>
              `;

							subMenuFourth.insertAdjacentHTML('beforeend', subMenuFourthItem);
						});
					} else {
						const subMenuThirdItem = `
              <li class='subMenuThirdItem'>
                <a class='subMenuThirdLink' href='${cc.url}' title='${cc.name}'>${cc.name}</a>
              </li>
            `;

						subMenuThird.insertAdjacentHTML('beforeend', subMenuThirdItem);
					}
				});
			} else {
				const subMenuItem = `
            <li class='subMenuItem'>
              <a class='subMenuLink' href='${ct.url}' title='${ct.name}'>${ct.name}</a>
            </li>
          `;

				subMenu.insertAdjacentHTML('beforeend', subMenuItem);
			}
		});

		const subMenuController = document.createElement('button');
		subMenuController.classList.add('subMenuController');

		subMenu.parentNode.insertBefore(subMenuController, subMenu.nextSibling);
	},
};

export default header;
