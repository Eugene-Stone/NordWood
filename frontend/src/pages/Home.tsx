import useHomeData from '../hooks/useHomeData';
import DynamicSections from '../components/DynamicSections';
import Seo from '../components/Seo';

export default function Home() {
	const { homeData } = useHomeData();
	const sections = homeData?.sections ?? [];

	return (
		<>
			{homeData?.seo && <Seo seo={homeData.seo} />}
			<DynamicSections sections={sections} />
		</>
	);
}
