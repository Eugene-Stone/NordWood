import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BACKEND_URL } from '../../CONSTANTS';
import type { Seo as SeoType } from '@backend-types/types';

type Props = {
	seo: SeoType.Seo_Plain;
};

export default function Seo({ seo }: Props) {
	useEffect(() => {
		if (!seo.structuredData) return;

		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.setAttribute('data-schema', 'dynamic'); // идентификатор для удаления
		script.innerHTML = seo.structuredData;

		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, [seo.structuredData]);

	return (
		<Helmet>
			<title>{seo.metaTitle}</title>
			<meta name="description" content={seo.metaDescription} />
			<meta name="keywords" content={seo.metaKeywords} />
			<link rel="canonical" href={seo.canonical} />

			<meta
				name="robots"
				content={`${seo.noindex ? 'noindex' : 'index'}, ${
					seo.nofollow ? 'nofollow' : 'follow'
				}`}
			/>

			<meta property="og:type" content={seo.ogType} />
			<meta property="og:title" content={seo.ogTitle} />
			<meta property="og:description" content={seo.ogDescription} />
			<meta property="og:image" content={BACKEND_URL + seo?.ogImage?.url} />
		</Helmet>
	);
}
