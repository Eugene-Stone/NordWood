/**
 * article-comment controller
 */

import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::article-comment.article-comment');
export default factories.createCoreController(
	'api::article-comment.article-comment',
	({ strapi }) => ({
		async create(ctx) {
			// Проверяем наличие структуры данных в запросе
			if (
				!ctx.request.body ||
				typeof ctx.request.body !== 'object' ||
				!('data' in ctx.request.body)
			) {
				return super.create(ctx);
			}

			const bodyData = ctx.request.body.data as Record<string, any>;

			// Если комментарий не одобрен, создаем его как черновик через Document Service
			if (!bodyData.isApproved) {
				// Передаем данные напрямую в сервис документов Strapi v5
				const entity = await strapi
					.documents('api::article-comment.article-comment')
					.create({
						data: {
							...bodyData,
						},
						status: 'draft', // Явно указываем Strapi v5 создать запись как Draft
					});

				// Очищаем или подготавливаем ответ в формате REST API
				return { data: entity };
			}

			// Если одобрен (isApproved: true), отдаем стандартному контроллеру для публикации
			return super.create(ctx);
		},
	}),
);
