import type { Core } from '@strapi/strapi';
import { FRONTEND_URL } from '../CONSTANTS';

// const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
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
						url: `${FRONTEND_URL}`,
					},
					published: {
						url: `${FRONTEND_URL}`,
					},
				},
				{
					uid: 'api::page.page',
					draft: {
						// url: 'https://eugene-stone.github.io/NordWood/{slug}',
						url: `${FRONTEND_URL}{slug}`,
					},
					published: {
						// url: 'https://eugene-stone.github.io/NordWood/{slug}',
						url: `${FRONTEND_URL}{slug}`,
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

export default config;
