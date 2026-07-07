import request from './request';
import type { AuthUser, AuthResponse, RegisterRequest, LoginRequest } from '../types';

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
