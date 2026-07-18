import { notFound } from 'next/navigation';
import { getHomepageData } from '@/lib/backend';
import Seo from '@/components/Seo';
import DynamicSections from '@/components/DynamicSections';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
	const homeData = await getHomepageData();
	if (!homeData) notFound();
	return (
		<>
			{homeData.seo && <Seo seo={homeData.seo} />}
			<DynamicSections sections={homeData.sections} />
		</>
	);
}
