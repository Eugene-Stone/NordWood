import { useParams, Navigate, Link } from 'react-router-dom';
import useArticleData from '../hooks/useArticleData';
import DynamicSections from '../components/DynamicSections';
import Seo from '../components/Seo';
import { BACKEND_URL } from '../../CONSTANTS';
import RichText from '../utils/RichText';

export default function Article() {
	const { slug } = useParams();
	const { articleData, loading } = useArticleData();
	console.log(articleData);

	if (loading) return null;

	const date = new Date(articleData?.createdAt || '');
	// 2. Форматируем с помощью Intl
	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const formattedDate = formatter.format(date);

	// if (!articleData) {
	// 	return <Navigate to="/404" replace />;
	// }

	// const sections = articleData?.sections ?? [];

	return (
		<>
			{articleData?.seo && <Seo seo={articleData.seo} />}

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
					{/* Post Footer Navigation */}
					<footer className="nw-post-footer">
						<Link className="nw-post-back-link" to="/blog">
							← Назад ко всем статьям
						</Link>
					</footer>
				</article>
			</section>

			{/* <DynamicSections sections={sections} /> */}
		</>
	);
}
