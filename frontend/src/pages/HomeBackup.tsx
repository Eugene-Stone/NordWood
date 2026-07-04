import type { ComponentType } from 'react';
import type {
	About as AboutType,
	GalleryComponent as GalleryType,
	Hero as HeroType,
	Map as MapType,
	OpeningHours as OpeningHoursType,
	Request as RequestType,
	Services as ServicesType,
	TextSection as TextSectionType,
} from '@backend-types/types';
import useHomeData from '../hooks/useHomeData';

import About from '../sections/About';
import Gallery from '../sections/Gallery';
import Hero from '../sections/Hero';
import MapSect from '../sections/MapSect';
import OpeningHours from '../sections/OpeningHours';
import Request from '../sections/Request';
import Services from '../sections/Services';
import TextSection from '../sections/TextSection';

type SectionType =
	| (AboutType.About_Plain & {
			id: number;
			__component: 'sections.about';
	  })
	| (GalleryType.GalleryComponent_Plain & {
			id: number;
			__component: 'sections.gallery';
	  })
	| (HeroType.Hero_Plain & {
			id: number;
			__component: 'sections.hero';
	  })
	| (MapType.Map_Plain & {
			id: number;
			__component: 'sections.map';
	  })
	| (OpeningHoursType.OpeningHours_Plain & {
			id: number;
			__component: 'sections.opening-hours';
	  })
	| (RequestType.Request_Plain & {
			id: number;
			__component: 'sections.request';
	  })
	| (ServicesType.Services_Plain & {
			id: number;
			__component: 'sections.services';
	  })
	| (TextSectionType.TextSection_Plain & {
			id: number;
			__component: 'sections.text-section';
	  });

type AboutSection = Extract<SectionType, { __component: 'sections.about' }>;
type GallerySection = Extract<SectionType, { __component: 'sections.gallery' }>;
type HeroSection = Extract<SectionType, { __component: 'sections.hero' }>;
type MapSection = Extract<SectionType, { __component: 'sections.map' }>;
type OpeningHoursSection = Extract<SectionType, { __component: 'sections.opening-hours' }>;
type RequestSection = Extract<SectionType, { __component: 'sections.request' }>;
type ServicesSection = Extract<SectionType, { __component: 'sections.services' }>;
type TextSectionSection = Extract<SectionType, { __component: 'sections.text-section' }>;

const sectionComponents = {
	'sections.about': About,
	'sections.gallery': Gallery,
	'sections.hero': Hero,
	'sections.map': MapSect,
	'sections.opening-hours': OpeningHours,
	'sections.request': Request,
	'sections.services': Services,
	'sections.text-section': TextSection,
} satisfies {
	'sections.about': ComponentType<{ data: AboutSection }>;
	'sections.gallery': ComponentType<{ data: GallerySection }>;
	'sections.hero': ComponentType<{ data: HeroSection }>;
	'sections.map': ComponentType<{ data: MapSection }>;
	'sections.opening-hours': ComponentType<{ data: OpeningHoursSection }>;
	'sections.request': ComponentType<{ data: RequestSection }>;
	'sections.services': ComponentType<{ data: ServicesSection }>;
	'sections.text-section': ComponentType<{ data: TextSectionSection }>;
};

export default function Home() {
	const { homeData } = useHomeData();
	const sections = (homeData?.sections ?? []) as SectionType[];

	return (
		<>
			{sections?.map((section) => {
				switch (section.__component) {
					case 'sections.hero':
						return <Hero key={section.id} data={section} />;

					case 'sections.request':
						return <Request key={section.id} data={section} />;
				}
			})}
		</>
	);
}
