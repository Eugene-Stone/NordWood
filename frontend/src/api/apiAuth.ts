import request from './request';
import type {
	AuthUser,
	AuthResponse,
	RegisterRequest,
	LoginRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	UserExtended,
	ChangePasswordRequest,
} from '../types';
import { buildQuery } from '../utils/buildQuery';

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
	const query = buildQuery({
		populate: '*',
	});
	return request<UserExtended>(`/users/me?${query}`, {
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

export function changePassword(passUpdate: ChangePasswordRequest, jwt: string) {
	return request('/auth/change-password', {
		method: 'POST',
		headers: { Authorization: `Bearer ${jwt}` },
		body: JSON.stringify(passUpdate),
	});
}

export function updateProfile(
	dataUpdate: {
		username: string;
	},
	jwt: string,
	userId: number,
) {
	const query = buildQuery({
		populate: '*',
	});
	return request<UserExtended>(`/users/${userId}?${query}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(dataUpdate),
	});
}
