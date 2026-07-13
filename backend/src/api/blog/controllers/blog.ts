/**
 * blog controller
 */

import { factories } from '@strapi/strapi';
import { PAGE_SEO, SECTIONS_POPULATE } from '../../../../CONSTANTS';

export default factories.createCoreController('api::blog.blog');
// export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
// 	async find(ctx) {
// 		const entity = await strapi.documents('api::blog.blog').findFirst({
// 			populate: {
// 				sections: SECTIONS_POPULATE,
// 				seo: PAGE_SEO,
// 			},
// 		});

// 		return { data: entity };
// 	},
// }));
