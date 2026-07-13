"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONSTANTS_1 = require("../CONSTANTS");
// const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});
const config = ({ env }) => ({
    'strapi-dz-component-duplicator': {
        enabled: true,
    },
    'preview-button': {
        config: {
            enabled: true,
            contentTypes: [
                {
                    uid: 'api::homepage.homepage',
                    draft: {
                        url: `${CONSTANTS_1.FRONTEND_URL}`,
                    },
                    published: {
                        url: `${CONSTANTS_1.FRONTEND_URL}`,
                    },
                },
                {
                    uid: 'api::page.page',
                    draft: {
                        // url: 'https://eugene-stone.github.io/NordWood/{slug}',
                        url: `${CONSTANTS_1.FRONTEND_URL}{slug}`,
                    },
                    published: {
                        // url: 'https://eugene-stone.github.io/NordWood/{slug}',
                        url: `${CONSTANTS_1.FRONTEND_URL}{slug}`,
                    },
                },
                // {
                // 	uid: 'api::post.post',
                // 	draft: {
                // 		url: 'http://localhost:3000/api/preview',
                // 		query: {
                // 			type: 'post',
                // 			slug: '{slug}',
                // 		},
                // 	},
                // 	published: {
                // 		url: 'http://localhost:3000/blog/{slug}',
                // 	},
                // },
            ],
        },
    },
    email: {
        config: {
            provider: '@strapi/provider-email-nodemailer',
            providerOptions: {
                host: env('SMTP_HOST'),
                port: env.int('SMTP_PORT'),
                // Включаем пул соединений и жестко ограничиваем его до 1
                pool: true,
                maxConnections: 1,
                maxMessages: 1,
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
            },
            settings: {
                defaultFrom: env('SMTP_FROM'),
                defaultReplyTo: env('SMTP_FROM'),
            },
        },
    },
});
exports.default = config;
