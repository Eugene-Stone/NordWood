'use client';

import About from '../sections/About';
import Gallery from '../sections/Gallery';
import Hero from '../sections/Hero';
import MapSect from '../sections/MapSect';
import OpeningHours from '../sections/OpeningHours';
import Request from '../sections/Request';
import Services from '../sections/Services';
import TextSection from '../sections/TextSection';
import Reviews from '../sections/Reviews';
import type {
	About as AboutType,
	GalleryComponent,
	Hero as HeroType,
	Map as MapType,
	OpeningHours as OpeningHoursType,
	Request as RequestType,
	Reviews as ReviewsType,
	TextSection as TextSectionType,
} from '@backend-types/types';

type CmsSection =
	Record<string, unknown> & {
		__component?: string;
	};

type Props = {
	sections?: unknown[];
};

export default function DynamicSections({ sections }: Props) {
	return (
		<>
			{sections?.map((section, i) => {
				if (!section || typeof section !== 'object') return null;

				const cmsSection = section as CmsSection;
				// Strapi отдаёт динамическую зону как массив блоков с полем __component.
				// Здесь мы переводим CMS-имя блока в настоящий React-компонент.
				switch (cmsSection.__component) {
					case 'sections.about':
						return (
							<About
								key={i + cmsSection.__component}
								data={cmsSection as AboutType.About_Plain}
							/>
						);
					case 'sections.gallery':
						return (
							<Gallery
								key={i + cmsSection.__component}
								data={cmsSection as GalleryComponent.GalleryComponent_Plain}
							/>
						);
					case 'sections.hero':
						return (
							<Hero
								key={i + cmsSection.__component}
								data={cmsSection as HeroType.Hero_Plain}
							/>
						);
					case 'sections.map':
						return (
							<MapSect
								key={i + cmsSection.__component}
								data={cmsSection as MapType.Map_Plain}
							/>
						);
					case 'sections.opening-hours':
						return (
							<OpeningHours
								key={i + cmsSection.__component}
								data={cmsSection as OpeningHoursType.OpeningHours_Plain}
							/>
						);
					case 'sections.request':
						return (
							<Request
								key={i + cmsSection.__component}
								data={cmsSection as RequestType.Request_Plain}
							/>
						);
					case 'sections.services':
						return (
							<Services
								key={i + cmsSection.__component}
								data={cmsSection as HeroType.Hero_Plain}
							/>
						);
					case 'sections.reviews':
						return (
							<Reviews
								key={i + cmsSection.__component}
								data={cmsSection as ReviewsType.Reviews_Plain}
							/>
						);
					case 'sections.text-section':
						return (
							<TextSection
								key={i + cmsSection.__component}
								data={cmsSection as TextSectionType.TextSection_Plain}
							/>
						);
					default:
						// Если в CMS добавят новый тип секции, сайт не упадёт.
						// Мы просто пропустим неизвестный блок, пока для него не появится компонент.
						return null;
				}
			})}
		</>
	);
}
