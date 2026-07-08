import request from './request';
import type {
	AuthUser,
	AuthResponse,
	RegisterRequest,
	LoginRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest,
} from '../types';

export function loginUser(dataAuth: LoginRequest) {
	return request<AuthResponse>('/auth/local', {
		method: 'POST',
		body: JSON.stringify(dataAuth),
	});
}

export async function registerUser(dataAuth: RegisterRequest) {
	return request<AuthResponse>('/auth/local/register', {
		method: 'POST',
		body: JSON.stringify(dataAuth),
	});
}

export function getMe(jwt: string) {
	return request<AuthUser>('/users/me', {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
}

export function forgotPassword(dataAuth: ForgotPasswordRequest) {
	return request('/auth/forgot-password', {
		method: 'POST',
		body: JSON.stringify(dataAuth),
	});
}

export function resetPassword(dataAuth: ResetPasswordRequest) {
	return request('/auth/reset-password', {
		method: 'POST',
		body: JSON.stringify(dataAuth),
	});
}
