/**
 * homepage controller
 */

import { factories } from '@strapi/strapi';
import { PAGE_SEO, SECTIONS_POPULATE } from '../../../../CONSTANTS';

// export default factories.createCoreController('api::homepage.homepage');
export default factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents('api::homepage.homepage').findFirst({
			populate: {
				sections: SECTIONS_POPULATE,
				seo: PAGE_SEO,
			},
		});

		return { data: entity };
	},
}));
