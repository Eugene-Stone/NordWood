'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Pagination, ArticleExtended } from '@/types';
import { BACKEND_URL } from '@/lib/constants';

type BlogPageData = {
	title?: string;
};

type BlogCategory = {
	slug: string;
	title?: string;
	articles?: unknown[];
};

type Props = {
	blogData: BlogPageData | null;
	categories: BlogCategory[];
	initialArticles: { data: ArticleExtended[]; meta: { pagination: Pagination } };
	initialSearchParams: Record<string, string | string[] | undefined>;
};

function getParam(params: Props['initialSearchParams'], key: string, fallback = '') {
	// searchParams в Next.js могут прийти как строка или массив строк.
	// Для одиночных полей берём только строковое значение, иначе используем fallback.
	const value = params[key];
	return typeof value === 'string' ? value : fallback;
}

function getArrayParam(params: Props['initialSearchParams'], key: string) {
	// Категорий может быть несколько: ?category=a&category=b.
	// Поэтому нормализуем значение в массив и дальше работаем с одним форматом.
	const value = params[key];
	if (Array.isArray(value)) return value;
	return value ? [value] : [];
}

function buildPageHref(params: Props['initialSearchParams'], page: number) {
	// Пагинация сохраняет текущие фильтры.
	// Иначе пользователь нажал бы "2", а поиск/категории внезапно сбросились бы.
	const nextParams = new URLSearchParams();
	const sort = getParam(params, 'sort');
	const search = getParam(params, 'search');
	const categories = getArrayParam(params, 'category');

	if (page > 1) nextParams.set('page', String(page));
	if (sort && sort !== 'createdAt:desc') nextParams.set('sort', sort);
	if (search) nextParams.set('search', search);
	categories.forEach((category) => nextParams.append('category', category));

	const query = nextParams.toString();
	return query ? `/blog?${query}` : '/blog';
}

function buildBlogHref({
	page,
	sort,
	search,
	categories,
}: {
	page?: number;
	sort: string;
	search: string;
	categories: string[];
}) {
	// Собираем URL вручную, чтобы не хранить состояние фильтров только в браузере.
	// Когда URL меняется, Next заново рендерит серверную страницу блога и получает свежие статьи.
	const params = new URLSearchParams();

	if (page && page > 1) params.set('page', String(page));
	if (sort !== 'createdAt:desc') params.set('sort', sort);
	if (search.trim()) params.set('search', search.trim());
	categories.forEach((category) => params.append('category', category));

	const query = params.toString();
	return query ? `/blog?${query}` : '/blog';
}

export default function BlogClient({
	blogData,
	categories,
	initialArticles,
	initialSearchParams,
}: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const articles = initialArticles.data;
	const pagination = initialArticles.meta?.pagination;
	const activeCategories = getArrayParam(initialSearchParams, 'category');
	const pageCurrent = Number(getParam(initialSearchParams, 'page', '1'));
	const [search, setSearch] = useState(getParam(initialSearchParams, 'search'));
	const [sort, setSort] = useState(getParam(initialSearchParams, 'sort', 'createdAt:desc'));
	const [selectedCategories, setSelectedCategories] = useState(activeCategories);
	// В src/app/blog/page.tsx компонент получает key из searchParams.
	// Когда URL меняется, React размонтирует старую форму и создаёт новую уже с актуальными initial* значениями.
	// Так мы избегаем синхронных setState внутри useEffect и сохраняем поддержку кнопок браузера назад/вперёд.

	function navigateToFilters(nextState: {
		search?: string;
		sort?: string;
		categories?: string[];
		page?: number;
	}) {
		// startTransition говорит React: это навигация/обновление данных,
		// её можно выполнить не блокируя ввод пользователя в форме.
		const href = buildBlogHref({
			page: nextState.page ?? 1,
			sort: nextState.sort ?? sort,
			search: nextState.search ?? search,
			categories: nextState.categories ?? selectedCategories,
		});

		startTransition(() => {
			router.push(href, { scroll: false });
		});
	}

	function toggleCategory(value: string, checked: boolean) {
		// Сначала обновляем чекбоксы локально, чтобы интерфейс реагировал мгновенно,
		// затем меняем URL и позволяем серверной странице загрузить правильный список статей.
		const nextCategories = checked
			? [...selectedCategories, value]
			: selectedCategories.filter((category) => category !== value);

		setSelectedCategories(nextCategories);
		navigateToFilters({ categories: nextCategories });
	}

	return (
		<section className="nw-blog-section">
			<div className="nw-blog-container">
				<h2 className="nw-auth-title">{blogData?.title}</h2>
				<div className="nw-blog-grid">
					<aside className="nw-blog-sidebar">
						<div className="nw-widget">
							<h3 className="nw-widget-title">Поиск</h3>
							<form
								className="nw-search-form"
								onSubmit={(event) => {
									event.preventDefault();
									navigateToFilters({ search });
								}}>
								<input
									className="nw-search-input"
									name="search"
									type="text"
									value={search}
									placeholder="Поиск по статьям..."
									onChange={(event) => setSearch(event.target.value)}
								/>
								<button className="nw-search-button" type="submit">
									Найти
								</button>
							</form>
						</div>

						<div className="nw-widget">
							<h3 className="nw-widget-title">Сортировка</h3>
							<select
								className="nw-sort-select"
								name="sort"
								value={sort}
								onChange={(event) => {
									const nextSort = event.target.value;
									setSort(nextSort);
									navigateToFilters({ sort: nextSort });
								}}>
								<option value="createdAt:desc">Сначала новые</option>
								<option value="createdAt:asc">Сначала старые</option>
							</select>
						</div>

						<div className="nw-widget">
							<h3 className="nw-widget-title">Категории</h3>
							<ul className="nw-filter-list">
								{categories?.map((filter) => (
									<li key={filter.slug}>
										<label className="nw-filter-label">
											<input
												className="nw-filter-checkbox"
												type="checkbox"
												name="category"
												value={filter.slug}
												checked={selectedCategories.includes(filter.slug)}
												onChange={(event) =>
													toggleCategory(event.target.value, event.target.checked)
												}
											/>
											<span>
												{filter.title} ({filter.articles?.length ?? 0})
											</span>
										</label>
									</li>
								))}
							</ul>
							{selectedCategories.length > 0 || search || sort !== 'createdAt:desc' ? (
								<button
									className="nw-search-button"
									type="button"
									onClick={() => {
										setSearch('');
										setSort('createdAt:desc');
										setSelectedCategories([]);
										startTransition(() => router.push('/blog', { scroll: false }));
									}}>
									Сбросить
								</button>
							) : null}
							{isPending ? <p className="nw-article-meta">Обновляем список...</p> : null}
						</div>
					</aside>

					<main className="nw-articles-grid">
						{articles.length === 0 ? (
							<h3 className="nw-comments-title" style={{ marginTop: 0 }}>
								Статьи не найдены
							</h3>
						) : null}
						{articles.map((article) => (
							<article key={article.id} className="nw-article-card">
								<Link href={`/blog/${article.slug}`} className="nw-article-img-wrapper">
									{article.image && (
										<picture>
											{article.image.formats && (
												<source
													srcSet={`
														${BACKEND_URL + article.image.formats.large.url} ${article.image.formats.large.width}w,
														${BACKEND_URL + article.image.formats.medium.url} ${article.image.formats.medium.width}w,
														${BACKEND_URL + article.image.formats.small.url} ${article.image.formats.small.width}w,
														${BACKEND_URL + article.image.formats.thumbnail.url} ${article.image.formats.thumbnail.width}w
													`}
													sizes="
														(min-width: 1200px) 420px,
														(min-width: 992px) 33vw,
														(min-width: 640px) 50vw,
														100vw
													"
												/>
											)}

											<img
												className="nw-article-img"
												src={BACKEND_URL + article.image.url}
												alt={article.title}
												width={article.image.width}
												height={article.image.height}
												loading="lazy"
											/>
										</picture>
									)}
								</Link>
								<div className="nw-article-content">
									<div className="nw-article-meta">
										{new Intl.DateTimeFormat('ru-RU', {
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										}).format(new Date(article.createdAt))}{' '}
										• {article.category?.title}
									</div>
									<h3 className="nw-article-card-title">
										<Link href={`/blog/${article.slug}`}>{article.title}</Link>
									</h3>
									<p className="nw-article-excerpt">{article.description}</p>
									<Link className="nw-article-more" href={`/blog/${article.slug}`}>
										Читать далее
									</Link>
								</div>
							</article>
						))}
					</main>
				</div>

				{pagination && pagination.pageCount > 1 && (
					<nav className="nw-pagination" aria-label="Навигация по страницам">
						<Link
							className="nw-pagination-item nw-pagination-arrow"
							href={buildPageHref(initialSearchParams, Math.max(pageCurrent - 1, 1))}
							aria-label="Предыдущая страница">
							‹
						</Link>
						{Array.from({ length: pagination.pageCount }, (_, i) => (
							<Link
								key={i}
								className={
									pageCurrent === i + 1
										? 'nw-pagination-item nw-pagination-item-active'
										: 'nw-pagination-item'
								}
								href={buildPageHref(initialSearchParams, i + 1)}>
								{i + 1}
							</Link>
						))}
						<Link
							className="nw-pagination-item nw-pagination-arrow"
							href={buildPageHref(
								initialSearchParams,
								Math.min(pageCurrent + 1, pagination.pageCount),
							)}
							aria-label="Следующая страница">
							›
						</Link>
					</nav>
				)}
			</div>
		</section>
	);
}
