import { useEffect, useState } from 'react';
import type { blog } from '@backend-types/types';
import request from '../api/request';
import { buildQuery } from '../utils/buildQuery';

type BlogResponse = {
	data: blog.Blog_Plain;
	// eslint-disable-next-line
	meta: any;
};

export default function useBlogData() {
	const [blogData, setBlogData] = useState<blog.Blog_Plain | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	useEffect(() => {
		async function fetchBlogData() {
			try {
				const query = buildQuery({
					populate: {
						seo: {
							populate: {
								ogImage: {
									populate: '*',
								},
							},
						},
						sections: {
							on: {
								'sections.about': {
									populate: '*',
									// populate: {
									// 	image: true,
									// 	image: {
									// 		fields: ["alternativeText", "url"] //  Можно перечислить конкретные
									// 	}
									// },
								},
								'sections.gallery': {
									populate: {
										gallery: {
											populate: {
												images: true,
											},
										},
									},
								},
								'sections.hero': {
									populate: {
										image: true,
									},
								},
								'sections.map': {
									populate: '*',
								},
								'sections.opening-hours': {
									populate: '*',
								},
								'sections.request': {
									// 1. У компонента request открываем populate, чтобы зайти внутрь его полей
									populate: {
										// 2. Раскрываем поле связи "form"
										form: {
											populate: {
												// 3. Внутри формы раскрываем динамическую зону "fields"
												fields: {
													on: {
														// 4. И только тут перечисляем компоненты инпутов из категории "form"
														'forms.form-checkboxes': {
															populate: '*',
														},
														'forms.form-input': {
															populate: '*',
														},
														'forms.form-select': {
															populate: '*',
														},
														'forms.form-submit': {
															populate: '*',
														},
														'forms.form-textarea': {
															populate: '*',
														},
														'forms.form-agree': {
															populate: '*',
														},
													},
												},
											},
										},
									},
								},
								'sections.reviews': {
									populate: '*',
								},
								'sections.services': {
									populate: {
										link: true,
									},
								},
								'sections.text-section': {
									populate: '*',
								},
							},
						},
					},
				});

				// console.log(`/blog?${query}`);

				// const { data } = await request<{ data: blog.Blog_Plain }>('/blog', {
				const response = await request<BlogResponse>(`/blog?${query}`, {
					method: 'GET',
				});

				setBlogData(response.data);
			} catch (error) {
				setErrorFetch(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		}

		fetchBlogData();
	}, []);

	return { blogData, loading, errorFetch };
}
