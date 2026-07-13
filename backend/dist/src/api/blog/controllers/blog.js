"use strict";
/**
 * blog controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::blog.blog');
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
