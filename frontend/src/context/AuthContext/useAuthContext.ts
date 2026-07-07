import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function useAuthContext() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('AuthContext error');
	}

	return context;
}
