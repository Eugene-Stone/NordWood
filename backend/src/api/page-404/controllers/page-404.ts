/**
 * page-404 controller
 */

import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::page-404.page-404');
export default factories.createCoreController('api::page-404.page-404', ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents('api::page-404.page-404').findFirst({
			populate: {
				shared_section: {
					populate: '*',
				},
			},
		});

		return { data: entity };
	},
}));
