"use strict";
/**
 * global controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const CONSTANTS_1 = require("../../../../CONSTANTS");
// export default factories.createCoreController('api::global.global');
exports.default = strapi_1.factories.createCoreController('api::global.global', ({ strapi }) => ({
    async find(ctx) {
        const entity = await strapi.documents('api::global.global').findFirst({
            populate: CONSTANTS_1.GLOBAL_POPULATE,
        });
        return { data: entity };
    },
}));
