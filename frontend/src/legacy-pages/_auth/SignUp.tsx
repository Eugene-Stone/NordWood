'use client';

import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/apiAuth.ts';
import type { RegisterRequest } from '../../types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthContext from '../../context/AuthContext/useAuthContext';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SignUp() {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const { login, isAuthenticated } = useAuthContext();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<RegisterRequest>({
		mode: 'onChange',
	});

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/profile');
		}
	}, [router, isAuthenticated]);

	async function onSubmit(dataAuth: RegisterRequest) {
		setServerError('');
		setStatus('loading');

		try {
			const response = await registerUser(dataAuth);

			// console.log(response);
			login(response.jwt, response.user);
			setStatus('success');
			reset();

			setTimeout(() => {
				setStatus('idle');
				router.push('/');
			}, 500);
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);

				// if (error.message === 'Email or Username are already taken') {
				// 	setError('email', {
				// 		type: 'server',
				// 		message: 'Email уже используется',
				// 	});

				// 	setError('username', {
				// 		type: 'server',
				// 		message: 'Имя пользователя уже используется',
				// 	});

				// 	return;
				// }
			}

			setStatus('error');
		}
	}
	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">Регистрация</h2>
				<form
					className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
					onSubmit={handleSubmit(onSubmit)}>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="register-name">
							Имя
						</label>
						<input
							{...register('username', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="text"
							id="register-name"
							autoComplete="name"
						/>
						{errors['username'] && (
							<span className="error-field">
								{errors['username']?.message || `username field error message.`}
							</span>
						)}
					</div>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="register-email">
							Электронная почта
						</label>
						<input
							{...register('email', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="email"
							id="register-email"
							autoComplete="email"
						/>
						{errors.email && (
							<span className="error-field">{errors.email.message}</span>
						)}
					</div>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="register-password">
							Пароль
						</label>
						<input
							{...register('password', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="password"
							id="register-password"
							autoComplete="new-password"
						/>
						{errors['password'] && (
							<span className="error-field">
								{errors['password']?.message || `password field error message.`}
							</span>
						)}
					</div>
					<button className="nw-auth-button" type="submit">
						Зарегистрироваться
					</button>

					{status === 'success' && <p className="success-field">Success Message</p>}
					{status === 'error' && (
						<p className="error-field">{serverError || 'Error Message'}</p>
					)}
				</form>
				<div className="nw-auth-links">
					<Link href="/login" className="nw-auth-link">
						Уже есть аккаунт? Войти
					</Link>
				</div>
			</div>
		</section>
	);
}
