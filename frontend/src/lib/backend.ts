import 'server-only';
import { buildQuery } from '@/utils/buildQuery';
import { BACKEND_URL } from './constants';
import type { ArticleExtended, Pagination } from '@/types';
import type { global, Seo as SeoType } from '@backend-types/types';

type ApiResponse<T> = { data: T };
type ArticlesResponse = { data: ArticleExtended[]; meta: { pagination: Pagination } };
type CmsPageData = {
	seo?: SeoType.Seo_Plain;
	sections?: unknown[];
};
type BlogPageData = CmsPageData & {
	title?: string;
};
type BlogCategory = {
	slug: string;
	title?: string;
	articles?: unknown[];
};

async function request<T>(endpoint: string, init?: RequestInit): Promise<T> {
	const url = `${BACKEND_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
	const response = await fetch(url, {
		...init,
		// В Next.js серверный fetch умеет кэшироваться сам.
		// Здесь мы говорим: держи ответ до 60 секунд, а потом тихо обнови его.
		// Это хороший компромисс для CMS-контента: сайт быстрый, но данные не "застывают" навсегда.
		next: { revalidate: 60 },
	});

	if (!response.ok) {
		throw new Error(`Request failed: ${response.status}`);
	}

	return response.json();
}

export async function getGlobalData() {
	try {
		const response = await request<ApiResponse<global.Global_Plain>>('/global');
		return response.data;
	} catch (error) {
		// Глобальные данные нужны для шапки и футера.
		// Если Strapi временно недоступна при сборке или локальном запуске,
		// возвращаем null, чтобы приложение всё равно отрисовало каркас страницы.
		console.error(error);
		return null;
	}
}

export async function getHomepageData() {
	const response = await request<ApiResponse<CmsPageData>>('/homepage');
	return response.data;
}

export async function getPageBySlug(slug: string) {
	const response = await request<ApiResponse<CmsPageData[] | CmsPageData>>(
		`/pages?filters[slug][$eq]=${slug}`,
	);
	const data = response.data;
	return Array.isArray(data) ? data[0] : data;
}

export async function getBlogPageData() {
	const query = buildQuery({
		populate: {
			seo: { populate: { ogImage: { populate: '*' } } },
			sections: { on: { 'sections.about': { populate: '*' } } },
		},
	});
	const response = await request<ApiResponse<BlogPageData>>(`/blog?${query}`);
	return response.data;
}

export async function getArticles(searchParams: Record<string, string | string[] | undefined>) {
	// В блоге URL является источником правды:
	// /blog?search=...&sort=...&category=...
	// Серверная страница читает эти параметры и передаёт их сюда.
	const page = Number(searchParams.page ?? 1);
	const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'createdAt:desc';
	const search = typeof searchParams.search === 'string' ? searchParams.search : '';
	const categories = Array.isArray(searchParams.category)
		? searchParams.category
		: searchParams.category
			? [searchParams.category]
			: [];

	const filters: Record<string, unknown> = {};

	if (categories.length > 0) {
		filters.category = { slug: { $in: categories } };
	}

	if (search) {
		// $containsi — поиск Strapi без учёта регистра.
		filters.title = { $containsi: search };
	}

	const query = buildQuery({
		filters,
		sort: [sort],
		pagination: { page, pageSize: 2 },
		populate: '*',
	});

	return request<ArticlesResponse>(`/articles?${query}`);
}

export async function getCategories() {
	const response = await request<ApiResponse<BlogCategory[]>>('/categories?populate=*');
	return response.data;
}

export async function getArticleBySlug(slug: string) {
	const query = buildQuery({
		filters: { slug: { $eq: slug } },
		populate: {
			category: { populate: '*' },
			article_comments: { populate: '*' },
			image: true,
		},
	});
	const response = await request<ApiResponse<unknown[] | unknown>>(`/articles?${query}`);
	const data = response.data;
	return Array.isArray(data) ? data[0] : data;
}
