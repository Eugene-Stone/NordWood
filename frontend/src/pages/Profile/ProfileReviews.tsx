import { useEffect, useState } from 'react';

import useAuthContext from '../../context/AuthContext/useAuthContext';
import { review as reviewType } from '@backend-types/types';
import request from '../../api/request';
import { buildQuery } from '../../utils/buildQuery';

export default function ProfileReviews() {
	const { user } = useAuthContext();
	const [reviews, setReviews] = useState<reviewType.Review_Plain[]>();

	useEffect(() => {
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

			console.log(query);

			try {
				const { data } = await request<{ data: reviewType.Review_Plain[] }>(
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
				// setLoading(false);
			}
		}

		fetchReviews();
	}, [user]);

	return (
		<ul className="reviews__list">
			{reviews?.map((review, i) => {
				const date = new Date(review.createdAt).toLocaleDateString('uk-UA');
				return (
					<li key={i} className="review-slide-inner">
						<div className="review-slide-top-line">
							<div className="review-slide-author">{review?.user?.username}</div>
							<div className="review-slide-date">{date}</div>
						</div>
						<div className="review-slide-txt">
							Оценка <strong>{review.rating}</strong>{' '}
							{review.rating === 5 ? 'звезд!!!' : 'звезды'} <br />
							{review.text}
						</div>
					</li>
				);
			})}
		</ul>
	);
}
