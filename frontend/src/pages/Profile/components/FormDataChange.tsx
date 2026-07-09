import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAuthContext from '../../../context/AuthContext/useAuthContext';

import { useForm } from 'react-hook-form';
import { updateProfile } from '../../../api/apiAuth';
import { UserExtended } from '../../../types';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface Props {
	user: UserExtended;
	jwt: string;
	edit: boolean;
	setEdit: Dispatch<SetStateAction<boolean>>;
}
interface ProfileForm {
	username: string;
	email: string;
}

export default function FormDataChange({ user, jwt, edit, setEdit }: Props) {
	const { refreshUser } = useAuthContext();
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<ProfileForm>({
		mode: 'onChange',
	});

	console.log(user);

	useEffect(() => {
		if (edit && user) {
			reset({
				username: user.username,
				email: user.email,
			});
		}
	}, [edit, user, reset]);

	async function onSubmit(dataUpdate: ProfileForm) {
		try {
			setStatus('loading');
			await updateProfile(dataUpdate, jwt!, user!.id!);
			await refreshUser();

			setStatus('success');
			setEdit(false);
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
		<form
			className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
			onSubmit={handleSubmit(onSubmit)}>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					Никнейм
				</label>
				<input
					{...register('username', {
						required: 'Введите никнейм',
						minLength: {
							value: 3,
							message: 'Минимум 3 символа',
						},
					})}
					className="nw-auth-input"
					type="text"
					id="profile-firstname"
					required
				/>
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-email">
					Электронная почта
				</label>
				<input
					{...register('email', {
						required: 'Введите email',
					})}
					className="nw-auth-input"
					type="email"
					id="profile-email"
					autoComplete="email"
				/>
			</div>
			<button className="nw-auth-button" type="submit">
				Сохранить данные
			</button>

			{status === 'success' && <p className="success-field">Success Message</p>}
			{status === 'error' && <p className="error-field">{serverError || 'Error Message'}</p>}
		</form>
	);
}
