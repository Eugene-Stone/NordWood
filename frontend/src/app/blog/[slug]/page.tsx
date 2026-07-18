import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug } from '@/lib/backend';
import Seo from '@/components/Seo';
import RichText from '@/utils/RichText';
import ArticleCommentGate from '@/components/ArticleCommentGate';
import { BACKEND_URL } from '@/lib/constants';
import type { Seo as SeoType } from '@backend-types/types';

export const dynamic = 'force-dynamic';

type ArticleComment = {
	isApproved?: boolean;
	text?: string;
	createdAt?: string;
	user?: {
		username?: string;
	};
};

type ArticlePageData = {
	documentId: string;
	title: string;
	text?: string;
	createdAt?: string;
	seo?: SeoType.Seo_Plain;
	category?: {
		title?: string;
	};
	image?: {
		url: string;
		width?: number;
		height?: number;
	};
	article_comments?: ArticleComment[];
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const articleData = (await getArticleBySlug(slug)) as ArticlePageData | null;
	if (!articleData) notFound();
	const image = articleData.image;
	const approvedComments = articleData.article_comments?.filter((comment) => comment.isApproved);
	const formattedDate = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(articleData.createdAt || ''));

	return (
		<>
			{articleData.seo && <Seo seo={articleData.seo} />}
			<section className="nw-blog-section">
				<article className="nw-post-container">
					<header className="nw-post-header">
						<div className="nw-post-meta">
							Опубликовано: {formattedDate} • Категория: {articleData.category?.title}
						</div>
						<h1 className="nw-post-title">{articleData.title}</h1>
					</header>
					<div className="nw-post-main-img-wrapper">
						{image && (
							<img
								className="nw-post-main-img"
								src={BACKEND_URL + image.url}
								alt={articleData.title}
								width={image.width ?? 1200}
								height={image.height ?? 800}
							/>
						)}
					</div>
					<RichText className="nw-post-body">{articleData.text}</RichText>
					{articleData.article_comments?.length ? (
						<>
							<h3 className="nw-comments-title">
								Комментарии ({approvedComments?.length ?? 0})
							</h3>
							<ul className="nw-comments-list">
								{articleData.article_comments.map((comment, i) =>
									comment.isApproved ? (
										<li key={i} className="nw-comment-item">
											<div className="nw-comment-meta">
												<span className="nw-comment-author">{comment.user?.username}</span>
												<span className="nw-comment-date">
													{new Intl.DateTimeFormat('ru-RU', {
														day: 'numeric',
														month: 'long',
														year: 'numeric',
														hour: '2-digit',
														minute: '2-digit',
													}).format(new Date(comment.createdAt || ''))}
												</span>
											</div>
											<p className="nw-comment-text">{comment.text}</p>
										</li>
									) : null,
								)}
							</ul>
						</>
					) : (
						<h3 className="nw-comments-title">Комментариев пока нет</h3>
					)}
					<ArticleCommentGate articleId={articleData.documentId} />
					<footer className="nw-post-footer">
						<Link className="nw-post-back-link" href="/blog">
							← Назад ко всем статьям
						</Link>
					</footer>
				</article>
			</section>
		</>
	);
}
