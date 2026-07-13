import { useForm } from 'react-hook-form';
import type { ForgotPasswordRequest } from '../../types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext/useAuthContext';
import { forgotPassword } from '../../api/apiAuth';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
export default function ForgotPassword() {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const { isAuthenticated } = useAuthContext();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<ForgotPasswordRequest>({
		mode: 'onChange',
	});

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		// navigate('/');
	// 		navigate('/', {
	// 			viewTransition: true,
	// 		});
	// 	}
	// }, [navigate, isAuthenticated]);

	async function onSubmit(dataAuth: ForgotPasswordRequest) {
		setServerError('');
		setStatus('loading');

		// console.log(dataAuth);
		try {
			const response = await forgotPassword(dataAuth);

			// console.log(response);
			// login(response.jwt, response.user);
			setStatus('success');
			reset();

			// setTimeout(() => {
			// 	setStatus('idle');
			// 	// navigate('/');
			// }, 500);
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
				<h2 className="nw-auth-title">Восстановление пароля</h2>
				<form
					className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
					onSubmit={handleSubmit(onSubmit)}>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="forgot-email">
							Электронная почта
						</label>
						<input
							{...register('email', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="email"
							id="forgot-email"
							autoComplete="email"
						/>
						{errors.email && (
							<span className="error-field">
								{errors.email?.message || `email field error message.`}
							</span>
						)}
					</div>
					<button className="nw-auth-button" type="submit">
						Сбросить пароль
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
				<div className="nw-auth-links">
					<Link to={'/login'} className="nw-auth-link">
						Вернуться к авторизации
					</Link>
				</div>
			</div>
		</section>
	);
}
