'use client';

import { useForm } from 'react-hook-form';
import type { ForgotPasswordRequest, ResetPasswordRequest } from '../../types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useAuthContext from '../../context/AuthContext/useAuthContext';
import { forgotPassword, resetPassword } from '../../api/apiAuth';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
export default function ResetPassword() {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const { isAuthenticated } = useAuthContext();

	const params = useSearchParams();
	const code = params.get('code');

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<ResetPasswordRequest>({
		mode: 'onChange',
	});

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		// navigate('/');
	// 		navigate('/profile', {
	// 			viewTransition: true,
	// 		});
	// 	}
	// }, [navigate, isAuthenticated]);

	async function onSubmit(dataAuth: ResetPasswordRequest) {
		setServerError('');
		setStatus('loading');

		// console.log(dataAuth);
		try {
			const response = await resetPassword({
				...dataAuth,
				code: code!,
			});

			// console.log(response);
			// login(response.jwt, response.user);
			setStatus('success');
			reset();

			setTimeout(() => {
				setStatus('idle');
				// navigate('/');
			}, 500);
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);
				console.log(error);
				console.log(error.message);
			}

			setStatus('error');
		}
	}

	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">Новый пароль</h2>
				<form
					className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
					onSubmit={handleSubmit(onSubmit)}>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="reset-password-new">
							Новый пароль
						</label>
						<input
							{...register('password', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="password"
							id="reset-password-new"
							autoComplete="new-password"
						/>
						{errors.password && (
							<span className="error-field">
								{errors.password?.message || `password field error message.`}
							</span>
						)}
					</div>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="reset-password-confirm">
							Подтвердите пароль
						</label>
						<input
							{...register('passwordConfirmation', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="password"
							id="reset-password-confirm"
							required
							autoComplete="new-password"
						/>
						{errors.passwordConfirmation && (
							<span className="error-field">
								{errors.passwordConfirmation?.message ||
									`passwordConfirmation field error message.`}
							</span>
						)}
					</div>
					<button className="nw-auth-button" type="submit">
						Сохранить изменения
					</button>

					{status === 'success' && (
						<p className="success-field">
							Если аккаунт с такой электронной почтой существует, мы отправили
							инструкции для восстановления пароля.
						</p>
					)}
					{status === 'error' && (
						<p className="error-field">{serverError || 'Error Message'}</p>
					)}
				</form>
			</div>
		</section>
	);
}
