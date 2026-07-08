import About from '../sections/About';
import Gallery from '../sections/Gallery';
import Hero from '../sections/Hero';
import MapSect from '../sections/MapSect';
import OpeningHours from '../sections/OpeningHours';
import Request from '../sections/Request';
import Services from '../sections/Services';
import TextSection from '../sections/TextSection';
import Reviews from '../sections/Reviews';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DynamicSections({ sections }: any) {
	return (
		<>
			{/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
			{sections?.map((section: any, i: number) => {
				switch (section.__component) {
					case 'sections.about':
						return <About key={i + section.__component} data={section} />;
					case 'sections.gallery':
						return <Gallery key={i + section.__component} data={section} />;
					case 'sections.hero':
						return <Hero key={i + section.__component} data={section} />;
					case 'sections.map':
						return <MapSect key={i + section.__component} data={section} />;
					case 'sections.opening-hours':
						return <OpeningHours key={i + section.__component} data={section} />;
					case 'sections.request':
						return <Request key={i + section.__component} data={section} />;
					case 'sections.services':
						return <Services key={i + section.__component} data={section} />;
					case 'sections.reviews':
						return <Reviews key={i + section.__component} data={section} />;
					case 'sections.text-section':
						return <TextSection key={i + section.__component} data={section} />;
				}
			})}
		</>
	);
}
