/**
 * privacy-policy controller
 */

import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::privacy-policy.privacy-policy');
export default factories.createCoreController(
	'api::privacy-policy.privacy-policy',
	({ strapi }) => ({
		async find(ctx) {
			const entity = await strapi.documents('api::privacy-policy.privacy-policy').findFirst({
				populate: {
					section: {
						populate: '*',
					},
				},
			});

			return { data: entity };
		},
	}),
);
