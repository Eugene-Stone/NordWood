import React, { useEffect, useState } from 'react';
import useBlogData from '../hooks/useBlogData';
import Seo from '../components/Seo';
import DynamicSections from '../components/DynamicSections';
import { article, category } from '@backend-types/types';
import request from '../api/request';
import { buildQuery } from '../utils/buildQuery';
import { BACKEND_URL, FRONTEND_URL } from '../../CONSTANTS';
import { Link } from 'react-router-dom';
import { useDebounce } from '../utils/useDebounce';

export default function Blog() {
	const { blogData } = useBlogData();
	const sections = blogData?.sections ?? [];
	const [articles, setArticles] = useState<article.Article_Plain[]>();
	const [sorting, setSorting] = useState('createdAt:desc');
	const [filterItems, setFilterItems] = useState<category.Category_Plain[]>();
	const [filtersActive, setFiltersActive] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	const handleFilterChange = (value: string, checked: boolean) => {
		setFiltersActive((prev) =>
			checked ? [...prev, value] : prev.filter((item) => item !== value),
		);
	};

	const searchQueryDebounce = useDebounce(searchQuery, 500);
	// console.log('searchQueryDebounce ', searchQueryDebounce);

	useEffect(() => {
		async function getCategories() {
			try {
				const { data } = await request<{ data: category.Category_Plain[] }>(
					`categories/?populate=*`,
				);

				setFilterItems(data);
			} catch (error) {
				if (error instanceof Error) {
					// setServerError(error.message);
					console.log(error);
					console.log(error.message);
				}
			}
		}
		getCategories();
	}, []);

	useEffect(() => {
		async function getArticles() {
			try {
				const query = buildQuery({
					filters: {
						// Фильтра
						category: {
							slug: {
								// Множество фильтров в массиве
								$in: filtersActive,

								// Если будет только один фильтр
								// $eq: 'proizvodstvo',

								// Множество фильтров c условием $or
								// $or: [
								// 	{ slug: { $eq: 'proizvodstvo' } },
								// 	{ slug: { $eq: 'qwerty' } },
								// ],
							},
						},
						// Поиск
						title: {
							$containsi: searchQueryDebounce,
						},
					},
					// Сортировка
					sort: [sorting],
					populate: '*',
				});

				// console.log(query);

				const { data } = await request<{ data: article.Article_Plain[] }>(
					`articles?${query}`,
					// `articles/?populate=*`,
				);
				// console.log(data);

				setArticles(data);
			} catch (error) {
				if (error instanceof Error) {
					// setServerError(error.message);
					console.log(error);
					console.log(error.message);
				}
			}
		}
		getArticles();
	}, [sorting, filtersActive, searchQueryDebounce]);

	return (
		<>
			{blogData?.seo && <Seo seo={blogData.seo} />}

			<section className="nw-blog-section">
				<div className="nw-blog-container">
					<h2 className="nw-auth-title">{blogData?.title}</h2>
					<div className="nw-blog-grid">
						{/* Sidebar with filters */}
						<aside className="nw-blog-sidebar">
							{/* Search Widget */}
							<div className="nw-widget">
								<h3 className="nw-widget-title">Поиск</h3>
								<form
									className="nw-search-form"
									onSubmit={(e) => {
										e.preventDefault();

										/* const formData = new FormData(e.currentTarget);
										const query = formData.get('search') as string; // Получаем значение по атрибуту name

										setSearchQuery(query); */
									}}>
									<input
										className="nw-search-input"
										name="search" // ОБЯЗАТЕЛЬНО добавить name, если обработчик формы будет у тега form
										type="text"
										placeholder="Поиск по статьям..."
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<button className="nw-search-button" type="submit">
										Найти
									</button>
								</form>
							</div>
							{/* Sorting Widget */}
							<div className="nw-widget">
								<h3 className="nw-widget-title">Сортировка</h3>
								<select
									className="nw-sort-select"
									onChange={(e) => setSorting(e.target.value)}>
									<option value="createdAt:desc">Сначала новые</option>
									<option value="createdAt:asc">Сначала старые</option>
								</select>
							</div>
							{/* Category Filter Widget */}
							<div className="nw-widget">
								<h3 className="nw-widget-title">Категории</h3>
								<ul className="nw-filter-list">
									{filterItems?.map((filter) => (
										<li key={filter.slug}>
											<label className="nw-filter-label">
												<input
													className="nw-filter-checkbox"
													type="checkbox"
													value={filter.slug}
													checked={filtersActive.includes(filter.slug!)}
													onChange={(e) =>
														handleFilterChange(
															e.target.value,
															e.target.checked,
														)
													}
												/>
												<span>
													{filter.title} ({filter.articles.length})
												</span>
											</label>
										</li>
									))}
								</ul>
							</div>
						</aside>
						{/* Articles Feed */}
						<main className="nw-articles-grid">
							{articles?.map((post, i) => {
								// const date = new Date(post.createdAt).toLocaleDateString('uk-UA');

								const date = new Date(post.createdAt);
								// 2. Форматируем с помощью Intl
								const formatter = new Intl.DateTimeFormat('ru-RU', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								});

								const formattedDate = formatter.format(date);
								// console.log(formattedDate);

								return (
									<article key={i} className="nw-article-card">
										<Link
											viewTransition
											to={`${FRONTEND_URL}/blog/${post.slug}`}
											className="nw-article-img-wrapper">
											<img
												className="nw-article-img"
												src={BACKEND_URL + post.image?.url}
												alt={post.title}
											/>
										</Link>
										<div className="nw-article-content">
											<div className="nw-article-meta">
												{formattedDate} • {post.category?.title}
											</div>
											<h3 className="nw-article-card-title">
												<Link
													viewTransition
													to={`${FRONTEND_URL}/blog/${post.slug}`}>
													{post.title}
												</Link>
											</h3>
											<p className="nw-article-excerpt">{post.description}</p>
											<Link
												viewTransition
												className="nw-article-more"
												to={`${FRONTEND_URL}/blog/${post.slug}`}>
												Читать далее
											</Link>
										</div>
									</article>
								);
							})}
						</main>
					</div>

					<nav className="nw-pagination" aria-label="Навигация по страницам">
						<a
							className="nw-pagination-item nw-pagination-arrow"
							href="#"
							aria-label="Предыдущая страница">
							‹
						</a>
						<a
							className="nw-pagination-item nw-pagination-item-active"
							href="#"
							aria-current="page">
							1
						</a>
						<a className="nw-pagination-item" href="#">
							2
						</a>
						<a className="nw-pagination-item" href="#">
							3
						</a>
						<span className="nw-pagination-spacer">...</span>
						<a className="nw-pagination-item" href="#">
							8
						</a>
						<a
							className="nw-pagination-item nw-pagination-arrow"
							href="#"
							aria-label="Следующая страница">
							›
						</a>
					</nav>
				</div>
			</section>

			<DynamicSections sections={sections} />
		</>
	);
}
