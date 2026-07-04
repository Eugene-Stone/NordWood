import { useEffect, useState } from 'react';
import type { homepage } from '@backend-types/types';
import request from '../api/request';

export default function useHomeData() {
	const [homeData, setHomeData] = useState<homepage.Homepage_Plain | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	useEffect(() => {
		async function fetchHomeData() {
			try {
				const { data } = await request<{ data: homepage.Homepage_Plain }>('/homepage', {
					method: 'GET',
				});

				setHomeData(data);
			} catch (error) {
				setErrorFetch(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		}

		fetchHomeData();
	}, []);

	return { homeData, loading, errorFetch };
}
