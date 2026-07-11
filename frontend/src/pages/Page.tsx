import { useParams, Navigate } from 'react-router-dom';
import usePageData from '../hooks/usePageData';
import DynamicSections from '../components/DynamicSections';
import Seo from '../components/Seo';

export default function Page() {
	const { slug } = useParams();
	const { pageData, loading } = usePageData();
	console.log(pageData);

	if (loading) return null;

	if (!pageData) {
		return <Navigate to="/404" replace />;
	}

	const sections = pageData?.sections ?? [];

	return (
		<>
			{pageData?.seo && <Seo seo={pageData.seo} />}
			<DynamicSections sections={sections} />
		</>
	);
}
