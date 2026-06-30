/**
 * global controller
 */

import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::global.global');
export default factories.createCoreController('api::global.global', ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents('api::global.global').findFirst({
			populate: {
				Header: {
					populate: {
						Logo: {
							populate: '*',
						},
						Menu: {
							populate: {
								MenuLink: {
									populate: '*',
								},
							},
						},
						LangList: {
							populate: {
								Link: {
									populate: '*',
								},
							},
						},
					},
				},
				Footer: {
					populate: {
						Menu: {
							populate: {
								MenuLink: {
									populate: '*',
								},
							},
						},
					},
				},
			},
		});

		return { data: entity };
	},
}));
