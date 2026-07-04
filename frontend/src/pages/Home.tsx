import useHomeData from '../hooks/useHomeData';

import About from '../sections/About';
import Gallery from '../sections/Gallery';
import Hero from '../sections/Hero';
import MapSect from '../sections/MapSect';
import OpeningHours from '../sections/OpeningHours';
import Request from '../sections/Request';
import Services from '../sections/Services';
import TextSection from '../sections/TextSection';

export default function Home() {
	const { homeData } = useHomeData();
	const sections = homeData?.sections ?? [];

	return (
		<>
			{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
			{sections?.map((section: any, index: number) => {
				switch (section.__component) {
					case 'sections.about':
						return <About key={section.__component} data={section} />;
					case 'sections.gallery':
						return <Gallery key={section.__component} data={section} />;
					case 'sections.hero':
						return <Hero key={section.__component} data={section} />;
					case 'sections.map':
						return <MapSect key={section.__component} data={section} />;
					case 'sections.opening-hours':
						return <OpeningHours key={section.__component} data={section} />;
					case 'sections.request':
						return <Request key={section.__component} data={section} />;
					case 'sections.services':
						return <Services key={section.__component} data={section} />;
					case 'sections.text-section':
						return <TextSection key={section.__component} data={section} />;
				}
			})}
		</>
	);
}
