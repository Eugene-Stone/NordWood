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
	CommentType,
	ReviewResponse,
	ArticleCommentResponse,
} from '../types';
import { buildQuery } from '../utils/buildQuery';
import { BACKEND_URL } from '@/lib/constants';
import { article_comment, review } from '@backend-types/types';

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
	dataUpdate: { username: string; email: string; avatar?: number },
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

export async function uploadFile(file: File, jwt: string): Promise<{ id: number; url: string }[]> {
	const formData = new FormData();
	formData.append('files', file);

	// Используем нативный fetch напрямую или модифицируем request,
	// так как для FormData НЕЛЬЗЯ ставить заголовок Content-Type вручную (браузер сделает это сам)
	const response = await fetch(`${BACKEND_URL}/api/upload`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${jwt}`,
			// Никаких 'Content-Type': 'application/json' тут быть не должно!
		},
		body: formData,
	});

	if (!response.ok) throw new Error('Ошибка загрузки файла');
	return response.json();
}

export async function leaveReview(commentData: CommentType) {
	const data = { data: commentData };

	return await request<ReviewResponse>('/reviews', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export async function updateReview(commentData: CommentType, reviewId: string, jwt: string) {
	const data = { data: commentData };

	return await request<ReviewResponse>(`/reviews/${reviewId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(data),
	});
}

export async function deleteReview(reviewId: string, jwt: string) {
	return await request(`/reviews/${reviewId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		// body: JSON.stringify(reviewId),
	});
}

export async function leaveComment(
	comentData: { documentId: string; text: string; userId: number },
	jwt: string,
) {
	return await request<ArticleCommentResponse>('/article-comments', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			data: {
				text: comentData.text,
				article: comentData.documentId,
				user: comentData.userId,
			},
		}),
	});
}
