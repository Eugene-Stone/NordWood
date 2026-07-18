'use client';

import { createContext, useEffect, useState } from 'react';
import { AuthUser, AuthContextType, UserExtended } from '../../types';
import { getMe } from '../../api/apiAuth.ts';

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: React.PropsWithChildren) {
	const [jwt, setJwt] = useState<string | null>(null);
	const [user, setUser] = useState<UserExtended | null>(null);
	const [loading, setLoading] = useState(true);

	async function login(jwt: string, user: UserExtended) {
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

	const refreshUser = async () => {
		const me = await getMe(jwt!);
		setUser(me);

		// console.log(me?.username);
		// console.log(me?.email);
		// console.log(me?.avatar);
	};

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
				refreshUser,
				isAuthenticated: !!user,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
