'use client';

import React, { useState } from 'react';
import useAuthContext from '../context/AuthContext/useAuthContext';
import { useForm } from 'react-hook-form';
import { leaveComment } from '../api/apiAuth';

type Props = {
	articleId: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type FormType = {
	comment: string;
};

export default function ArticleCommentForm({ articleId }: Props) {
	const { user, jwt } = useAuthContext();
	const [status, setStatus] = useState<FormStatus>('idle');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormType>({
		mode: 'onChange',
	});

	async function onSubmit(data: FormType) {
		if (!jwt) return;

		const { comment } = data;

		const comentData = {
			documentId: articleId,
			text: comment,
			userId: user!.id,
		};
		// console.log(comentData);

		try {
			await leaveComment(comentData, jwt);

			reset();
			setStatus('success');
		} catch (error) {
			if (error instanceof Error) {
				// setServerError(error.message);
				console.log(error);
				console.log(error.message);
			}

			setStatus('error');
		}
	}

	return (
		<div className="nw-comments-area">
			<div className="nw-comment-form-wrapper">
				<h4 className="nw-widget-title">Оставить комментарий</h4>

				<form
					className={status === 'loading' ? 'nw-comment-form sending' : 'nw-comment-form'}
					onSubmit={handleSubmit(onSubmit)}>
					<div className="nw-comment-field-group">
						<label className="nw-comment-label" htmlFor="comment-message">
							Ваш комментарий *
						</label>
						<textarea
							{...register('comment', {
								required: true,
							})}
							className="nw-comment-textarea"
							id="comment-message"
							defaultValue={''}
						/>
					</div>

					<div style={{ display: 'flex', gap: '10px' }}>
						<button className="nw-comment-submit-button" type="submit">
							Отправить
						</button>

						<button
							className="nw-comment-submit-button cancel"
							type="button"
							onClick={() => reset()}>
							Отмена
						</button>
					</div>
					{status === 'success' && (
						<p className="success-field">Ваш коментарий на проверке у модератора</p>
					)}
					{status === 'error' && <p className="error-field">Ошибка, попробуйте позже</p>}
				</form>
			</div>
		</div>
	);
}
