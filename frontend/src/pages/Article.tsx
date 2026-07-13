import { useParams, Navigate, Link } from 'react-router-dom';
import useArticleData from '../hooks/useArticleData';
import DynamicSections from '../components/DynamicSections';
import Seo from '../components/Seo';
import { BACKEND_URL } from '../../CONSTANTS';
import RichText from '../utils/RichText';
import useAuthContext from '../context/AuthContext/useAuthContext';
import ArticleCommentForm from '../components/ArticleCommentForm';
import { article, article_comment } from '@backend-types/types';
import Preloader from '../components/Preloader';

// interface ArticleExtended extends article.Article_Plain {
// 	documentId: string;
// }

export default function Article() {
	const { slug } = useParams();
	const { isAuthenticated } = useAuthContext();
	const { articleData, loading } = useArticleData();
	// console.log(articleData);

	if (loading) return null;

	const date = new Date(articleData?.createdAt || '');
	// 2. Форматируем с помощью Intl
	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	console.log(articleData);

	const formattedDate = formatter.format(date);

	const approvedComments = articleData?.article_comments.filter((comment) => comment.isApproved);

	if (!articleData) {
		return <Navigate to="/404" replace />;
	}

	// const sections = articleData?.sections ?? [];

	return (
		<>
			{articleData?.seo && <Seo seo={articleData.seo} />}

			{loading ? (
				<Preloader />
			) : (
				<section className="nw-blog-section">
					<article className="nw-post-container">
						{/* Post Header */}
						<header className="nw-post-header">
							<div className="nw-post-meta">
								Опубликовано: {formattedDate} • Категория:{' '}
								{articleData?.category?.title}
							</div>
							<h1 className="nw-post-title">{articleData?.title}</h1>
						</header>
						{/* Main Image */}
						<div className="nw-post-main-img-wrapper">
							<img
								className="nw-post-main-img"
								src={BACKEND_URL + articleData?.image?.url}
								alt={articleData?.title}
							/>
						</div>
						{/* Post Content Body */}
						<RichText className="nw-post-body">{articleData?.text}</RichText>

						{articleData && articleData.article_comments.length >= 1 ? (
							<>
								<h3 className="nw-comments-title">
									Комментарии ({approvedComments?.length})
								</h3>
								<ul className="nw-comments-list">
									{articleData?.article_comments.map((coment, i) => {
										if (coment.isApproved) {
											const date = new Date(coment?.createdAt || '');
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
															{coment.user?.username}
														</span>
														<span className="nw-comment-date">
															{formattedDate}
														</span>
													</div>
													<p className="nw-comment-text">{coment.text}</p>
												</li>
											);
										}
									})}
								</ul>
							</>
						) : (
							<h3 className="nw-comments-title">Комментариев пока нет</h3>
						)}

						{isAuthenticated ? (
							<ArticleCommentForm articleId={articleData.documentId} />
						) : (
							<div className="reviews__leave-notice">
								<p>
									Чтобы оставлять комментарии,{' '}
									<Link to="/login">авторизируйтесь</Link> или{' '}
									<Link to="/registration">зарегистрируйтесь</Link> на&nbsp;сайте.
								</p>
							</div>
						)}

						{/* Post Footer Navigation */}
						<footer className="nw-post-footer">
							<Link className="nw-post-back-link" to="/blog">
								← Назад ко всем статьям
							</Link>
						</footer>
					</article>
				</section>
			)}
		</>
	);
}
