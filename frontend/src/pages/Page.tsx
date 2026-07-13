import { useParams, Navigate } from 'react-router-dom';
import usePageData from '../hooks/usePageData';
import DynamicSections from '../components/DynamicSections';
import Seo from '../components/Seo';
import Preloader from '../components/Preloader';

export default function Page() {
	const { slug } = useParams();
	const { pageData, loading } = usePageData();
	// console.log(pageData);

	if (loading) return null;

	if (!pageData) {
		return <Navigate to="/404" replace />;
	}

	const sections = pageData?.sections ?? [];

	return (
		<>
			{pageData?.seo && <Seo seo={pageData.seo} />}

			{loading ? <Preloader /> : <DynamicSections sections={sections} />}
		</>
	);
}
