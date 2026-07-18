import { getBlogPageData, getArticles, getCategories } from '@/lib/backend';
import Seo from '@/components/Seo';
import BlogClient from '@/components/blog/BlogClient';
import DynamicSections from '@/components/DynamicSections';

export const dynamic = 'force-dynamic';

export default async function BlogPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;
	const clientStateKey = JSON.stringify(params);
	const [blogData, articles, categories] = await Promise.all([
		getBlogPageData(),
		getArticles(params),
		getCategories(),
	]);

	return (
		<>
			{blogData?.seo && <Seo seo={blogData.seo} />}
			<BlogClient
				key={clientStateKey}
				blogData={blogData}
				categories={categories}
				initialArticles={articles}
				initialSearchParams={params}
			/>
			<DynamicSections sections={blogData?.sections} />
		</>
	);
}
