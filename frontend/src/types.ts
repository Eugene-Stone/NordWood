import type { User } from '@backend-types/types';

export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
}

// export interface AuthUser {
// 	id: number;
// 	username: string;
// 	email: string;
// }

export type AuthUser = User.User_Plain;

export interface LoginRequest {
	identifier: string;
	password: string;
}

export interface ForgotPasswordRequest {
	email: string;
}
export interface ResetPasswordRequest {
	code: string;
	password: string;
	passwordConfirmation: string;
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
