import useHomeData from '../hooks/useHomeData';
import DynamicSections from '../components/DynamicSections';
import Seo from '../components/Seo';
import Preloader from '../components/Preloader';

export default function Home() {
	const { homeData, loading } = useHomeData();
	const sections = homeData?.sections ?? [];

	return (
		<>
			{homeData?.seo && <Seo seo={homeData.seo} />}
			{loading ? <Preloader /> : <DynamicSections sections={sections} />}
		</>
	);
}
