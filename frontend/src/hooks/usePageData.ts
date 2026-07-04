import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { page } from '@backend-types/types';
import request from '../api/request';

export default function usePageData() {
	const { slug } = useParams();

	const [pageData, setPageData] = useState<page.Page_Plain | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		async function fetchPageData() {
			try {
				const { data } = await request<{ data: page.Page_Plain }>(
					`/pages?filters[slug][$eq]=${slug}`,
					{
						method: 'GET',
					},
				);

				setPageData(data);
			} catch (error) {
				setErrorFetch(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		}

		fetchPageData();
	}, [slug]);

	return { pageData, loading, errorFetch };
}
