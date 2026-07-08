import { useForm } from 'react-hook-form';
import type { LoginRequest } from '../../types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext/useAuthContext';
import { loginUser } from '../../api/apiAuth';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SignIn() {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const { login, isAuthenticated } = useAuthContext();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<LoginRequest>({
		mode: 'onChange',
	});

	useEffect(() => {
		if (isAuthenticated) {
			// navigate('/');
			navigate('/profile', {
				viewTransition: true,
			});
		}
	}, [navigate, isAuthenticated]);

	async function onSubmit(dataAuth: LoginRequest) {
		setServerError('');
		setStatus('loading');

		try {
			const response = await loginUser(dataAuth);

			// console.log(response);
			login(response.jwt, response.user);
			setStatus('success');
			reset();

			setTimeout(() => {
				setStatus('idle');
				// navigate('/');
				navigate('/profile', {
					viewTransition: true,
				});
			}, 500);
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);
				console.log(error.message);
			}

			setStatus('error');
		}
	}
	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">Вход</h2>
				<form
					className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
					onSubmit={handleSubmit(onSubmit)}>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="login-email">
							Электронная почта
						</label>
						<input
							{...register('identifier', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="email"
							id="login-email"
							autoComplete="email"
						/>
						{errors.identifier && (
							<span className="error-field">
								{errors.identifier?.message || `identifier field error message.`}
							</span>
						)}
					</div>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="login-password">
							Пароль
						</label>
						<input
							{...register('password', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							type="password"
							id="login-password"
							autoComplete="current-password"
						/>
						{errors.password && (
							<span className="error-field">
								{errors.password?.message || `identifier field error message.`}
							</span>
						)}
					</div>
					<button className="nw-auth-button" type="submit">
						Войти
					</button>

					{status === 'success' && <p className="success-field">Success Message</p>}
					{status === 'error' && (
						<p className="error-field">{serverError || 'Error Message'}</p>
					)}
				</form>
				<div className="nw-auth-links">
					<Link to={'/forgot-password'} className="nw-auth-link">
						Забыли пароль?
					</Link>
					<Link to={'/registration'} className="nw-auth-link">
						Создать аккаунт
					</Link>
				</div>
			</div>
		</section>
	);
}
