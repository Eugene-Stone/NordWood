import type { Seo as SeoType } from '@backend-types/types';
import { BACKEND_URL } from '@/lib/constants';

type Props = {
	seo: SeoType.Seo_Plain;
};

// В Next.js SEO обычно описывают через metadata/generateMetadata прямо в route-файлах.
// Этот компонент пока оставлен как удобная "шпаргалка" по структуре SEO из Strapi
// и как простой вариант без client component.
export default function Seo({ seo }: Props) {
	const title = seo.metaTitle ? `NordWood | ${seo.metaTitle}` : 'NordWood';
	const robots = `${seo.noindex ? 'noindex' : 'index'}, ${seo.nofollow ? 'nofollow' : 'follow'}`;

	return (
		<>
			<title>{title}</title>
			{seo.metaDescription && <meta name="description" content={seo.metaDescription} />}
			{seo.metaKeywords && <meta name="keywords" content={seo.metaKeywords} />}
			{seo.canonical && <link rel="canonical" href={seo.canonical} />}
			<meta name="robots" content={robots} />
			{seo.ogType && <meta property="og:type" content={seo.ogType} />}
			{seo.ogTitle && <meta property="og:title" content={seo.ogTitle} />}
			{seo.ogDescription && <meta property="og:description" content={seo.ogDescription} />}
			{seo.ogImage?.url && <meta property="og:image" content={BACKEND_URL + seo.ogImage.url} />}
		</>
	);
}
