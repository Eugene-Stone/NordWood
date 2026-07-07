import { createContext, useEffect, useState } from 'react';
import { AuthUser, AuthContextType } from '../../types';
import { getMe } from '../../api/apiAuth.ts';

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: React.PropsWithChildren) {
	const [jwt, setJwt] = useState<string | null>(null);
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);

	async function login(jwt: string, user: AuthUser) {
		localStorage.setItem('jwt', jwt);

		try {
			setJwt(jwt);
			setUser(await getMe(jwt));
		} catch {
			localStorage.removeItem('jwt');
		} finally {
			setLoading(false);
		}
	}

	function logout() {
		localStorage.removeItem('jwt');

		setJwt(null);
		setUser(null);
	}

	async function restoreSession() {
		const token = localStorage.getItem('jwt');

		if (!token) {
			setLoading(false);
			return;
		}

		try {
			const user = await getMe(token);

			setJwt(token);
			setUser(user);
		} catch {
			localStorage.removeItem('jwt');
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		const restoreSessionAsync = async () => {
			await restoreSession();
		};

		restoreSessionAsync();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				jwt,
				user,
				loading,
				login,
				logout,
				isAuthenticated: !!user,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
