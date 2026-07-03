import { useEffect, useState } from 'react';
import type { global } from '@backend-types/types';
import request from '../api/request';

export default function useGlobalData() {
	const [globalData, setGlobalData] = useState<global.Global_Plain | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	useEffect(() => {
		async function fetchGlobalData() {
			try {
				const { data } = await request<{ data: global.Global_Plain }>('/global', {
					method: 'GET',
				});

				setGlobalData(data);
			} catch (error) {
				setErrorFetch(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		}

		fetchGlobalData();
	}, []);

	return { globalData, loading, errorFetch };
}
