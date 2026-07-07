export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
}

export interface AuthUser {
	id: number;
	username: string;
	email: string;
}

export interface AuthUser {
	id: number;
	username: string;
	email: string;
}
export interface LoginRequest {
	identifier: string;
	password: string;
}

export interface AuthResponse {
	jwt: string;
	user: AuthUser;
}

export interface AuthContextType {
	user: AuthUser | null;
	jwt: string | null;
	isAuthenticated: boolean;
	loading: boolean;

	login: (jwt: string, user: AuthUser) => void;
	logout: () => void;
}
