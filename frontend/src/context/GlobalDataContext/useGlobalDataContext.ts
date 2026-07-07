import { useContext } from 'react';
import { GlobalDataContext } from './GlobalDataContext';

export default function useGlobalDataContext() {
	const context = useContext(GlobalDataContext);

	if (!context) {
		throw new Error('GlobalContext error');
	}

	return context;
}
