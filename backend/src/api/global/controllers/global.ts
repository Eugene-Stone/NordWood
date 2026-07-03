/**
 * global controller
 */

import { factories } from '@strapi/strapi';
import { GLOBAL_POPULATE } from '../../../../CONSTANTS';

// export default factories.createCoreController('api::global.global');
export default factories.createCoreController('api::global.global', ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents('api::global.global').findFirst({
			populate: GLOBAL_POPULATE,
		});

		return { data: entity };
	},
}));
