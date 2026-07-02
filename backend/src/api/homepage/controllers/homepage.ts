/**
 * homepage controller
 */

import { factories } from '@strapi/strapi';
import { SECTIONS_POPULATE } from '../../../../constants';

// export default factories.createCoreController('api::homepage.homepage');
export default factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents('api::homepage.homepage').findFirst({
			populate: {
				sections: SECTIONS_POPULATE,
			},
		});

		return { data: entity };
	},
}));
