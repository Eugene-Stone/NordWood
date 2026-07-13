"use strict";
/**
 * homepage controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const CONSTANTS_1 = require("../../../../CONSTANTS");
// export default factories.createCoreController('api::homepage.homepage');
exports.default = strapi_1.factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
    async find(ctx) {
        const entity = await strapi.documents('api::homepage.homepage').findFirst({
            populate: {
                sections: CONSTANTS_1.SECTIONS_POPULATE,
                seo: CONSTANTS_1.PAGE_SEO,
            },
        });
        return { data: entity };
    },
}));
