"use strict";
/**
 * page-404 controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
// export default factories.createCoreController('api::page-404.page-404');
exports.default = strapi_1.factories.createCoreController('api::page-404.page-404', ({ strapi }) => ({
    async find(ctx) {
        const entity = await strapi.documents('api::page-404.page-404').findFirst({
            populate: {
                shared_section: {
                    populate: '*',
                },
            },
        });
        return { data: entity };
    },
}));
