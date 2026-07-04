import { useParams, Navigate } from 'react-router-dom';
import usePageData from '../hooks/usePageData';
import DynamicSections from '../components/DynamicSections';

export default function Home() {
	const { slug } = useParams();
	const { pageData, loading } = usePageData();
	console.log(slug);

	if (loading) return null;

	if (!pageData) {
		return <Navigate to="/404" replace />;
	}

	const sections = pageData?.sections ?? [];

	return <DynamicSections sections={sections} />;
}
