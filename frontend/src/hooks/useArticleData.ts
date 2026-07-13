import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { article } from '@backend-types/types';
import request from '../api/request';
import { buildQuery } from '../utils/buildQuery';
import { ArticleExtended } from '../types';

export default function useArticleData() {
	const { slug } = useParams();

	const [articleData, setArticleData] = useState<ArticleExtended | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		const query = buildQuery({
			filters: {
				slug: {
					$eq: `${slug}`,
				},
			},
			populate: {
				category: {
					populate: '*',
				},
				article_comments: {
					populate: '*',
				},
				image: true,
			},
		});
		// console.log('query ', query);

		async function fetchArticleData() {
			try {
				const { data } = await request<{ data: article.Article_Plain }>(
					// `/articles?filters[slug][$eq]=${slug}`,
					// `/articles?filters[slug][$eq]=${slug}&populate[category][populate]=*&populate[image][populate]=*`,
					`/articles?${query}`,
					{
						method: 'GET',
					},
				);

				// Берем ПЕРВЫЙ элемент из массива (или null, если ничего не нашлось)
				const targetArticle = Array.isArray(data) ? data[0] : data;
				// console.log(targetArticle);

				setArticleData(targetArticle || null);
			} catch (error) {
				setErrorFetch(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		}

		fetchArticleData();
	}, [slug]);

	return { articleData, loading, errorFetch };
}
