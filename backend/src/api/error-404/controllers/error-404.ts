/**
 * error-404 controller
 */

import { factories } from '@strapi/strapi';
import { SECTIONS_POPULATE } from '../../../constants';

// export default factories.createCoreController('api::error-404.error-404');
export default factories.createCoreController('api::error-404.error-404', ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents('api::error-404.error-404').findFirst({
			populate: {
				Link: {
					populate: '*',
				},
				all_sections: {
					populate: {
						sections: SECTIONS_POPULATE,
					},
				} as any,
				// all_sections: {
				// 	populate: '*', // Вытащит базовые поля привязанных секций
				// },
			},
		});

		return { data: entity };
	},
}));
