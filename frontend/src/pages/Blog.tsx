import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useBlogData from '../hooks/useBlogData';
import Seo from '../components/Seo';
import DynamicSections from '../components/DynamicSections';
import { article, category } from '@backend-types/types';
import request from '../api/request';
import { buildQuery } from '../utils/buildQuery';
import { BACKEND_URL, FRONTEND_URL } from '../../CONSTANTS';
import { Link } from 'react-router-dom';
import { useDebounce } from '../utils/useDebounce';
import { ArticleExtended } from '../types';
import Preloader from '../components/Preloader';

type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

type ArticlesResponse = {
	data: ArticleExtended[];
	meta: {
		pagination: Pagination;
	};
};

// type BlogType = {

// };

export default function Blog() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { blogData, loading } = useBlogData();
	// const [blogData, setBlogData] = useState();
	// console.log(blogData);

	const sections = blogData?.sections ?? [];
	const [loadingArticles, setLoadingArticles] = useState(loading);
	const [articles, setArticles] = useState<ArticleExtended[]>();
	const [sorting, setSorting] = useState('createdAt:desc');
	const [filterItems, setFilterItems] = useState<category.Category_Plain[]>();
	const [filtersActive, setFiltersActive] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	const [pagination, setPagination] = useState<Pagination | null>(null);
	const [pageCurrent, setPageCurrent] = useState(1);

	function prevPage() {
		if (pageCurrent > 1) {
			setPageCurrent((prev) => prev - 1);
		}
	}
	function nextPage() {
		if (pagination && pageCurrent < pagination?.pageCount) {
			setPageCurrent((prev) => prev + 1);
		}
	}

	const handleFilterChange = (value: string, checked: boolean) => {
		setFiltersActive((prev) =>
			checked ? [...prev, value] : prev.filter((item) => item !== value),
		);
	};

	const searchQueryDebounce = useDebounce(searchQuery, 500);

	// Применение фильтров из адресной строки при загрузке
	useEffect(() => {
		const page = Number(searchParams.get('page'));

		if (page) {
			//eslint-disable-next-line
			setPageCurrent(page);
		}

		const sort = searchParams.get('sort');

		if (sort) {
			setSorting(sort);
		}

		const search = searchParams.get('search');

		if (search) {
			setSearchQuery(search);
		}

		const categories = searchParams.getAll('category');

		if (categories.length) {
			setFiltersActive(categories);
		}
	}, [searchParams]);

	// Запись фильтров в адресную строку
	useEffect(() => {
		const params = new URLSearchParams();

		if (pageCurrent > 1) {
			params.set('page', String(pageCurrent));
		}

		if (sorting !== 'createdAt:desc') {
			params.set('sort', sorting);
		}

		if (searchQueryDebounce) {
			params.set('search', searchQueryDebounce);
		}

		filtersActive.forEach((category) => {
			params.append('category', category);
		});

		setSearchParams(params);
	}, [setSearchParams, pageCurrent, sorting, filtersActive, searchQueryDebounce]);

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
		//eslint-disable-next-line
		setPageCurrent(1);
	}, [sorting, filtersActive, searchQueryDebounce]);

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
					pagination: {
						page: pageCurrent,
						pageSize: 2,
					},
					populate: '*',
				});

				// console.log(query);

				const response = await request<ArticlesResponse>(
					`articles?${query}`,
					// `articles/?populate=*`,
				);
				const { data, meta } = response;
				// console.log(response);
				// console.log(meta.pagination);

				setArticles(data);
				setPagination(meta.pagination);
				setLoadingArticles(false);
			} catch (error) {
				if (error instanceof Error) {
					// setServerError(error.message);
					console.log(error);
					console.log(error.message);
				}
				setLoadingArticles(false);
			}
		}
		getArticles();
	}, [sorting, filtersActive, searchQueryDebounce, pageCurrent]);

	return (
		<>
			{blogData?.seo && <Seo seo={blogData.seo} />}

			{loading ? (
				<Preloader />
			) : (
				<>
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
												value={searchQuery}
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
											value={sorting}
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
															checked={filtersActive.includes(
																filter.slug!,
															)}
															onChange={(e) =>
																handleFilterChange(
																	e.target.value,
																	e.target.checked,
																)
															}
														/>
														<span>
															{filter.title} ({filter.articles.length}
															)
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
													<p className="nw-article-excerpt">
														{post.description}
													</p>
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
								<button
									className="nw-pagination-item nw-pagination-arrow"
									onClick={prevPage}
									type="button"
									aria-label="Предыдущая страница">
									‹
								</button>

								{pagination &&
									Array.from({ length: pagination?.pageCount }, (_, i) => (
										<button
											key={i}
											className={
												pageCurrent === i + 1
													? 'nw-pagination-item nw-pagination-item-active'
													: 'nw-pagination-item'
											}
											onClick={() => setPageCurrent(i + 1)}>
											{i + 1}
										</button>
									))}

								<button
									className="nw-pagination-item nw-pagination-arrow"
									onClick={nextPage}
									type="button"
									aria-label="Следующая страница">
									›
								</button>
							</nav>
						</div>
					</section>

					<DynamicSections sections={sections} />
				</>
			)}
		</>
	);
}
