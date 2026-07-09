import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAuthContext from '../../../context/AuthContext/useAuthContext';

import { useForm } from 'react-hook-form';
import { changePassword } from '../../../api/apiAuth';
import { UserExtended } from '../../../types';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface Props {
	// user: UserExtended;
	jwt: string;
	editPass: boolean;
	setEditPass: Dispatch<SetStateAction<boolean>>;
}
interface ChangePassForm {
	currentPassword: string;
	password: string;
	passwordConfirmation: string;
}

export default function FormPasswordChange({ jwt, editPass, setEditPass }: Props) {
	const { refreshUser } = useAuthContext();
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<ChangePassForm>({
		mode: 'onChange',
	});

	async function onSubmit(passUpdate: ChangePassForm) {
		try {
			setStatus('loading');
			// console.log(jwt);
			// console.log(passUpdate);

			await changePassword(passUpdate, jwt!);
			await refreshUser();

			setStatus('success');
			setEditPass(false);
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
		<>
			<h3 className="nw-password-change-title">Изменение пароля</h3>
			<form
				className={
					status === 'loading'
						? 'nw-password-change-form sending'
						: 'nw-password-change-form'
				}
				onSubmit={handleSubmit(onSubmit)}>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-current">
						Текущий пароль
					</label>
					<input
						{...register('currentPassword', {
							required: 'Введите текущий пароль',
						})}
						className="nw-password-change-input"
						type="password"
						id="password-current"
						autoComplete="current-password"
					/>
					{errors.currentPassword && (
						<span className="error-field">{errors.currentPassword?.message}</span>
					)}
				</div>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-new">
						Новый пароль
					</label>
					<input
						{...register('password', {
							required: 'Введите новый пароль',
						})}
						className="nw-password-change-input"
						type="password"
						id="password-new"
						autoComplete="new-password"
					/>
					{errors.password && (
						<span className="error-field">{errors.password?.message}</span>
					)}
				</div>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-confirm">
						Подтвердите новый пароль
					</label>
					<input
						{...register('passwordConfirmation', {
							required: 'Подтвердите новый пароль',
						})}
						className="nw-password-change-input"
						type="password"
						id="password-confirm"
						autoComplete="new-password"
					/>
					{errors.passwordConfirmation && (
						<span className="error-field">{errors.passwordConfirmation?.message}</span>
					)}
				</div>
				<button className="nw-auth-button" type="submit">
					Обновить пароль
				</button>

				{status === 'success' && <p className="success-field">Success Message</p>}
				{status === 'error' && (
					<p className="error-field">{serverError || 'Error Message'}</p>
				)}
			</form>
		</>
	);
}
