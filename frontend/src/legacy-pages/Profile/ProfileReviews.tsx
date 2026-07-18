'use client';

import { useEffect, useState } from 'react';

import useAuthContext from '../../context/AuthContext/useAuthContext';
import { review as reviewType } from '@backend-types/types';
import request from '../../api/request';
import { buildQuery } from '../../utils/buildQuery';
import { deleteReview } from '../../api/apiAuth';
import FormReview from './components/FormReview';
import Preloader from '../../components/Preloader';

export interface Review extends reviewType.Review_Plain {
	documentId: string;
}

export default function ProfileReviews() {
	const { user, jwt, refreshUser } = useAuthContext();
	const [reviews, setReviews] = useState<Review[]>();
	const [serverError, setServerError] = useState('');
	const [loadingReviews, setLoadingReviews] = useState(true);
	const [editingReview, setEditingReview] = useState<Review | null>(null);

	const propsForm = { serverError, setServerError, editingReview, setEditingReview };

	async function removeReview(reviewId: string, jwt: string) {
		try {
			await deleteReview(reviewId, jwt);
			await refreshUser();
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);
				console.log(error);
				console.log(error.message);
			}
		}
	}

	useEffect(() => {
		if (!user?.id) return; // Не делаем запрос без ID

		async function fetchReviews() {
			const query = buildQuery({
				filters: {
					user: {
						id: {
							$eq: user?.id,
						},
					},
				},
				populate: '*',
			});

			// console.log(query);

			try {
				const { data } = await request<{ data: Review[] }>(
					// `/reviews?filters[user][id][$eq]=${user?.id}&populate=*`,
					`/reviews?${query}`,
					{
						method: 'GET',
					},
				);

				// console.log(data);
				setReviews(data);
			} catch (error) {
				console.log(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setLoadingReviews(false);
			}
		}

		fetchReviews();
	}, [user, editingReview]);

	return loadingReviews ? (
		<Preloader />
	) : (
		<>
			<ul className="reviews__list">
				{reviews?.map((review, i) => {
					const date = new Date(review.createdAt).toLocaleDateString('uk-UA');
					return (
						<li key={i} className="review-slide-inner">
							<div className="review-slide-top-line">
								<button
									onClick={() => removeReview(review.documentId, jwt!)}
									className="delete"
									type="button">
									X
								</button>
								<div className="review-slide-author">{review?.user?.username}</div>
								<div className="review-slide-date">{date}</div>
							</div>
							<div className="review-slide-txt">
								Оценка <strong>{review.rating}</strong>{' '}
								{review.rating === 5 ? 'звезд!!!' : 'звезды'} <br />
								{review.text}
								<br />
								<button
									onClick={() => setEditingReview(review)}
									className="edit"
									type="button">
									Изменить отзыв
								</button>
							</div>
						</li>
					);
				})}
			</ul>

			<FormReview {...propsForm} />
		</>
	);
}
