"use strict";
/**
 * privacy-policy controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
// export default factories.createCoreController('api::privacy-policy.privacy-policy');
exports.default = strapi_1.factories.createCoreController('api::privacy-policy.privacy-policy', ({ strapi }) => ({
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
}));
