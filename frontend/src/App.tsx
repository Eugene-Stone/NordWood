import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Page from './pages/Page';
import NotFoundPage from './pages/NotFoundPage';

import useGlobalDataContext from './context/useGlobalDataContext';
import ReloadToTop from './utils/ReloadToTop';
import ButtonScrollTop from './components/ButtonScrollTop';

function Layout() {
	return (
		<div className="wrapper">
			<ReloadToTop />
			<Header />
			<div className="layout">
				<main className="page-wrap">
					<Outlet />
				</main>
			</div>

			<Footer />
			<ButtonScrollTop />
		</div>
	);
}

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			errorElement: <NotFoundPage />,
			children: [
				{ index: true, element: <Home /> },
				{ path: '404', element: <NotFoundPage /> },
				{ path: '/:slug', element: <Page /> },
				{ path: '*', element: <NotFoundPage /> },
			],
		},
	],
	{ basename: '/NordWood' },
);

export default function App() {
	const { loading } = useGlobalDataContext();
	if (loading) return null;

	return <RouterProvider router={router} />;
}
