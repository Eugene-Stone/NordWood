import type { Core } from '@strapi/strapi';
import { FRONTEND_URL } from '../constants';

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
});

export default config;
