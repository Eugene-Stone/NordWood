"use strict";
/**
 * page controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const CONSTANTS_1 = require("../../../../CONSTANTS");
// export default factories.createCoreController('api::page.page');
exports.default = strapi_1.factories.createCoreController('api::page.page', ({ strapi }) => ({
    async find(ctx) {
        var _a;
        // 1. Извлекаем слаг из параметров запроса (ctx.query.filters)
        // Если фронтенд передал фильтр по слагу, используем его, иначе ищем по дефолту
        const query = ctx.query;
        const slug = (_a = query.filters) === null || _a === void 0 ? void 0 : _a.slug;
        // 2. Если слаг передан, ищем одну конкретную страницу
        if (slug) {
            const entity = await strapi.documents('api::page.page').findFirst({
                filters: {
                    slug: slug,
                },
                populate: {
                    sections: CONSTANTS_1.SECTIONS_POPULATE,
                    seo: CONSTANTS_1.PAGE_SEO,
                },
            });
            return { data: entity };
        }
        // 3. Если слага в запросе нет, возвращаем стандартный список страниц с популейтом
        ctx.query.populate = CONSTANTS_1.SECTIONS_POPULATE;
        return await super.find(ctx);
    },
}));
