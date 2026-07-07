import { createContext } from 'react';
import useGlobalData from '../../hooks/useGlobalData';
import type { global } from '@backend-types/types';

type GlobalDataContextType = {
	globalData: global.Global_Plain | null;
	loading: boolean;
	errorFetch: string | null;
};

const GlobalDataContext = createContext<GlobalDataContextType | null>(null);

export default function GlobalDataProvider({ children }: React.PropsWithChildren) {
	const { globalData, loading, errorFetch } = useGlobalData();
	// if (loading || !globalData) {
	// 	return null;
	// }
	return (
		<GlobalDataContext.Provider value={{ globalData, loading, errorFetch }}>
			{children}
		</GlobalDataContext.Provider>
	);
}

export { GlobalDataContext };
