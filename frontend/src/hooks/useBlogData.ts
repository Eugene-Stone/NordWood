import { useEffect, useState } from 'react';
import type { blog } from '@backend-types/types';
import request from '../api/request';

export default function useBlogData() {
	const [blogData, setBlogData] = useState<blog.Blog_Plain | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	useEffect(() => {
		async function fetchBlogData() {
			try {
				const { data } = await request<{ data: blog.Blog_Plain }>('/blog', {
					method: 'GET',
				});

				setBlogData(data);
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
