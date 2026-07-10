import { useForm } from 'react-hook-form';

import { CommentType, ReviewResponse } from '../../../types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { leaveReview, updateReview } from '../../../api/apiAuth';
import useAuthContext from '../../../context/AuthContext/useAuthContext';
import type { Review } from '../ProfileReviews';

interface Props {
	serverError: string;
	setServerError: Dispatch<SetStateAction<string>>;
	editingReview: Review | null;
	setEditingReview: Dispatch<SetStateAction<Review | null>>;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

type FormType = Omit<CommentType, 'user'>;

export default function FormReview({
	serverError,
	setServerError,
	editingReview,
	setEditingReview,
}: Props) {
	const { user, jwt, refreshUser } = useAuthContext();
	const [status, setStatus] = useState<FormStatus>('idle');

	const formRef = useRef<HTMLFormElement>(null);

	// console.log(editingReview);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<CommentType>({
		mode: 'onChange',
		defaultValues: {
			title: 'Отличная мебель',
			rating: 5,
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus incidunt facilis repellat quos commodi. Explicabo esse sapiente, ducimus reprehenderit, animi dolorum dolores velit quo magni impedit autem possimus, omnis corrupti?',
		},
	});

	// 2. Скроллим к форме, если выбрали отзыв для редактирования
	useEffect(() => {
		if (editingReview && formRef.current) {
			formRef.current.scrollIntoView({
				behavior: 'smooth', // Плавный скролл
				block: 'center', // Центрируем форму на экране
			});
		}
	}, [editingReview]);

	// Подставляем данные в форму при клике на "Изменить отзыв"
	useEffect(() => {
		if (editingReview) {
			reset({
				title: editingReview.title || 'Отзыв',
				rating: editingReview.rating,
				text: editingReview.text,
			});
		} else {
			reset({ title: '', rating: 5, text: '' });
		}
	}, [editingReview, reset]);

	async function onSubmit(comment: FormType) {
		if (!jwt) return;

		const commentData: CommentType = {
			...comment,
			user: user?.id,
		};

		try {
			setStatus('loading');

			if (editingReview) {
				// Режим редактирования, user передавать не нужно
				await updateReview(comment, editingReview.documentId, jwt);
				setEditingReview(null); // Сбрасываем режим редактирования
			} else {
				// Режим создания
				await leaveReview(commentData);
			}

			await refreshUser();

			reset();

			setStatus('success');
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
			ref={formRef}
			className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
			onSubmit={handleSubmit(onSubmit)}>
			<h3>{editingReview ? 'Редактировать отзыв' : 'Оставить отзыв'}</h3>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					Вердикт
				</label>
				<input {...register('title')} type="text" className="nw-auth-input" />
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					Оценка
				</label>
				<input
					{...register('rating', { valueAsNumber: true })}
					type="number"
					className="nw-auth-input"
					min="1"
					max="5"
				/>
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					Ваш коментарий
				</label>
				<textarea {...register('text')} className="nw-auth-input" rows={6} />
			</div>
			<div style={{ display: 'flex', gap: '10px' }}>
				<button className="nw-auth-button" type="submit">
					{editingReview ? 'Сохранить изменения' : 'Оставить комментарий'}
				</button>

				{editingReview && (
					<button
						className="nw-auth-button cancel"
						type="button"
						onClick={() => setEditingReview(null)}>
						Отмена
					</button>
				)}
			</div>

			{status === 'success' && <p className="success-field">Success Message</p>}
			{status === 'error' && <p className="error-field">{serverError || 'Error Message'}</p>}
		</form>
	);
}
