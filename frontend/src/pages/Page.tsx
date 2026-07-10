import { useParams, Navigate } from 'react-router-dom';
import usePageData from '../hooks/usePageData';
import DynamicSections from '../components/DynamicSections';
import Seo from '../components/Seo';

export default function Home() {
	const { slug } = useParams();
	const { pageData, loading } = usePageData();
	console.log(slug);

	if (loading) return null;

	if (!pageData) {
		return <Navigate to="/404" replace />;
	}

	const sections = pageData?.sections ?? [];

	return (
		<>
			{pageData?.seo && <Seo seo={pageData.seo} />}
			<DynamicSections sections={sections} />
			{/* All Articles Page Section */}
			<section className="nw-blog-section">
				<div className="nw-blog-container">
					<h2 className="nw-auth-title">Статьи и материалы</h2>
					<div className="nw-blog-grid">
						{/* Sidebar with filters */}
						<aside className="nw-blog-sidebar">
							{/* Search Widget */}
							<div className="nw-widget">
								<h3 className="nw-widget-title">Поиск</h3>
								<form className="nw-search-form" action="#" method="GET">
									<input
										className="nw-search-input"
										type="text"
										placeholder="Поиск по статьям..."
									/>
									<button className="nw-search-button" type="submit">
										Найти
									</button>
								</form>
							</div>
							{/* Sorting Widget */}
							<div className="nw-widget">
								<h3 className="nw-widget-title">Сортировка</h3>
								<select className="nw-sort-select">
									<option value="newest">Сначала новые</option>
									<option value="oldest">Сначала старые</option>
									<option value="popular">По популярности</option>
								</select>
							</div>
							{/* Category Filter Widget */}
							<div className="nw-widget">
								<h3 className="nw-widget-title">Категории</h3>
								<ul className="nw-filter-list">
									<li>
										<label className="nw-filter-label">
											<input
												className="nw-filter-checkbox"
												type="checkbox"
												defaultValue="interiors"
												defaultChecked
											/>
											<span>Интерьеры (12)</span>
										</label>
									</li>
									<li>
										<label className="nw-filter-label">
											<input
												className="nw-filter-checkbox"
												type="checkbox"
												defaultValue="materials"
											/>
											<span>Материалы и дерево (8)</span>
										</label>
									</li>
									<li>
										<label className="nw-filter-label">
											<input
												className="nw-filter-checkbox"
												type="checkbox"
												defaultValue="process"
											/>
											<span>Производство (5)</span>
										</label>
									</li>
								</ul>
							</div>
						</aside>
						{/* Articles Feed */}
						<main className="nw-articles-grid">
							{/* Card 1 */}
							<article className="nw-article-card">
								<div className="nw-article-img-wrapper">
									<img
										className="nw-article-img"
										src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
										alt="Статья"
									/>
								</div>
								<div className="nw-article-content">
									<div className="nw-article-meta">15 Мая 2026 • Интерьеры</div>
									<h3 className="nw-article-card-title">
										<a href="#">Как выбрать массив дерева для гостиной</a>
									</h3>
									<p className="nw-article-excerpt">
										Разбираем ключевые различия между дубом, ясенем и орехом при
										проектировании современной мебели премиального сегмента.
									</p>
									<a className="nw-article-more" href="#">
										Читать далее
									</a>
								</div>
							</article>
							{/* Card 2 */}
							<article className="nw-article-card">
								<div className="nw-article-img-wrapper">
									<img
										className="nw-article-img"
										src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=600&q=80"
										alt="Статья"
									/>
								</div>
								<div className="nw-article-content">
									<div className="nw-article-meta">
										10 Мая 2026 • Производство
									</div>
									<h3 className="nw-article-card-title">
										<a href="#">Секреты идеальной матовой шлифовки</a>
									</h3>
									<p className="nw-article-excerpt">
										Подробно рассказываем о технологическом процессе обработки
										древесины в нашей мастерской NordWood.
									</p>
									<a className="nw-article-more" href="#">
										Читать далее
									</a>
								</div>
							</article>
						</main>
					</div>
				</div>
			</section>

			{/* Single Post Page Section */}
			<section className="nw-blog-section">
				<article className="nw-post-container">
					{/* Post Header */}
					<header className="nw-post-header">
						<div className="nw-post-meta">
							Опубликовано: 15 Мая 2026 • Категория: Интерьеры • Автор: NordWood
							Редакция
						</div>
						<h1 className="nw-post-title">Как выбрать массив дерева для гостиной</h1>
					</header>
					{/* Main Image */}
					<div className="nw-post-main-img-wrapper">
						<img
							className="nw-post-main-img"
							src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
							alt="Заглавное изображение статьи"
						/>
					</div>
					{/* Post Content Body */}
					<div className="nw-post-body">
						<p>
							Выбор материала для будущей мебели — это основополагающий этап
							проектирования. Натуральное дерево обладает уникальным рисунком и
							текстурой, которые невозможно полностью сымитировать искусственными
							покрытиями. Каждая порода имеет свой характер, плотность и особенности
							эксплуатации.
						</p>
						<h3>Дуб: Вечная классика и прочность</h3>
						<p>
							Дуб традиционно считается эталоном прочности и долговечности. Его
							выраженная крупная текстура отлично смотрится как под прозрачным лаком,
							так и при глубоком тонировании. Мебель из дуба устойчива к механическим
							повреждениям и со временем приобретает благородный благородный оттенок.
						</p>
						<blockquote>
							«Качественная обработка дерева сохраняет его тепло и позволяет мебели
							служить поколениями. Мы не маскируем природу, а подчеркиваем её.»
						</blockquote>
						<h3>Ясень: Свет и динамика</h3>
						<p>
							Ясень не уступает дубу в твердости, но обладает более светлым оттенком и
							ярко выраженными, широкими годовыми кольцами. Изделия из ясеня выглядят
							визуально легче, что идеально подходит для скандинавских интерьеров или
							стиля минимализм.
						</p>
					</div>
					{/* Post Footer Navigation */}
					<footer className="nw-post-footer">
						<a className="nw-post-back-link" href="#">
							← Назад ко всем статьям
						</a>
					</footer>
				</article>
			</section>
		</>
	);
}
