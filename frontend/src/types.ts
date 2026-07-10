import type { User, Media, review } from '@backend-types/types';

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

export interface UserExtended extends User.User_Plain {
	avatar?: Media.Media_Plain;
	reviews?: review.Review_Plain[];
	// role?: Role.Role_Plain;
}

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
	user: UserExtended;
}

export interface AuthContextType {
	user: UserExtended | null;
	jwt: string | null;
	isAuthenticated: boolean;
	loading: boolean;

	login: (jwt: string, user: UserExtended) => void;
	logout: () => void;
	refreshUser: () => void;
}

export interface ChangePasswordRequest {
	currentPassword: string;
	password: string;
	passwordConfirmation: string;
}

export interface CommentType {
	title: string;
	rating: number;
	text: string;
	user?: number;
}

export type ReviewResponse = review.Review_Plain;
