/**
 * page controller
 */

import { factories } from '@strapi/strapi';
import { PAGE_SEO, SECTIONS_POPULATE } from '../../../../CONSTANTS';

// export default factories.createCoreController('api::page.page');
export default factories.createCoreController('api::page.page', ({ strapi }) => ({
	async find(ctx) {
		// 1. Извлекаем слаг из параметров запроса (ctx.query.filters)
		// Если фронтенд передал фильтр по слагу, используем его, иначе ищем по дефолту
		const query = ctx.query as any;
		const slug = query.filters?.slug;

		// 2. Если слаг передан, ищем одну конкретную страницу
		if (slug) {
			const entity = await strapi.documents('api::page.page').findFirst({
				filters: {
					slug: slug,
				},
				populate: {
					sections: SECTIONS_POPULATE as any,
					seo: PAGE_SEO,
				},
			});

			return { data: entity };
		}

		// 3. Если слага в запросе нет, возвращаем стандартный список страниц с популейтом
		ctx.query.populate = SECTIONS_POPULATE as any;
		return await super.find(ctx);
	},
}));
