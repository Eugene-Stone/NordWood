import { useNavigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext/useAuthContext';
import { useEffect } from 'react';

export default function useProtectRoute(url: string) {
	const { isAuthenticated } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			// navigate('/login', {
			navigate(url, {
				replace: true,
				viewTransition: true,
			});
		}
	}, [navigate, url, isAuthenticated]);
}
