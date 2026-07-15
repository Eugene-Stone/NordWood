import React, { useEffect, useState } from 'react';
import request from '../../api/request';
import useAuthContext from '../../context/AuthContext/useAuthContext';
import { article_comment } from '@backend-types/types';
import { Pagination } from '../../types';
import { buildQuery } from '../../utils/buildQuery';
import Preloader from '../../components/Preloader';

type CommentsResponse = {
	data: article_comment.ArticleComment_Plain[];
	meta: {
		pagination: Pagination;
	};
};

export default function ProfileComments() {
	const { user } = useAuthContext();
	const [loaderComments, setLoaderComments] = useState(true);
	const [comments, setComments] = useState<article_comment.ArticleComment_Plain[]>();

	useEffect(() => {
		async function getComments() {
			try {
				setLoaderComments(true);
				const query = buildQuery({
					filters: {
						user: {
							id: {
								$eq: user?.id,
							},
						},
					},
				});

				const response = await request<CommentsResponse>(
					// `/article-comments?filters[user][id][$eq]=${user?.id}`,
					`/article-comments?populate=*&${query}`,
					{
						method: 'GET',
					},
				);

				setComments(response.data);
				setLoaderComments(false);
			} catch (error) {
				if (error instanceof Error) {
					console.log(error);
					console.log(error.message);
				} else {
					console.log('Unknown error');
				}
			} finally {
				// console.log('final');
				setLoaderComments(false);
			}
		}

		getComments();
	}, [user]);

	// console.log(comments);

	return loaderComments ? (
		<Preloader />
	) : (
		<>
			<div>
				{comments && comments?.length > 0 ? (
					<>
						<h3 className="nw-comments-title" style={{ marginTop: 0 }}>
							Оставленные комментарии ({comments.length})
						</h3>
						<ul className="nw-comments-list">
							{comments.map((comment, i) => {
								const date = new Date(comment?.createdAt || '');
								// 2. Форматируем с помощью Intl
								const formatter = new Intl.DateTimeFormat('ru-RU', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								});

								const parts = formatter.formatToParts(date);
								// console.log('date parts ', parts);

								const formattedDate = formatter
									.format(date)
									.replace(' г.', ',')
									.replace(' в ', ' ');

								return (
									<li key={i} className="nw-comment-item">
										<div className="nw-comment-meta">
											<span className="nw-comment-author">
												{comment.article?.title}
											</span>
											<span className="nw-comment-date">
												{comment.isApproved ? formattedDate : 'На проверке'}
											</span>
										</div>
										<p className="nw-comment-text">{comment.text}</p>
									</li>
								);
							})}
						</ul>
					</>
				) : (
					<h3 className="nw-comments-title" style={{ marginTop: 0 }}>
						Вы не оставляли комментариев
					</h3>
				)}
			</div>
		</>
	);
}
