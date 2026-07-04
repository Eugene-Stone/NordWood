import useHomeData from '../hooks/useHomeData';
import DynamicSections from '../components/DynamicSections';

export default function Home() {
	const { homeData } = useHomeData();
	const sections = homeData?.sections ?? [];

	return <DynamicSections sections={sections} />;
}
