import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/backend';
import Seo from '@/components/Seo';
import DynamicSections from '@/components/DynamicSections';

export const dynamic = 'force-dynamic';

export default async function PageBySlug({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const pageData = await getPageBySlug(slug);
	if (!pageData) notFound();
	return (
		<>
			{pageData.seo && <Seo seo={pageData.seo} />}
			<DynamicSections sections={pageData.sections ?? []} />
		</>
	);
}
