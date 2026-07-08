import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import useGlobalDataContext from './context/GlobalDataContext/useGlobalDataContext.ts';

import ReloadToTop from './utils/ReloadToTop';
import ButtonScrollTop from './components/ButtonScrollTop';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Page from './pages/Page';
import NotFoundPage from './pages/NotFoundPage';

import SignUp from './pages/_auth/SignUp';
import SignIn from './pages/_auth/SignIn';
import ForgotPassword from './pages/_auth/ForgotPassword';
import ResetPassword from './pages/_auth/ResetPassword';
import Profile from './pages/Profile/Profile';
import ProfileLayout from './pages/Profile/ProfileLayout.tsx';
import ProfileInfo from './pages/Profile/ProfileInfo.tsx';
import ProfileReviews from './pages/Profile/ProfileReviews.tsx';
import ProfileComments from './pages/Profile/ProfileComments.tsx';

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
				{ path: '/login', element: <SignIn /> },
				{ path: '/registration', element: <SignUp /> },
				{ path: '/forgot-password', element: <ForgotPassword /> },
				{ path: '/reset-password', element: <ResetPassword /> },
				// { path: '/profile', element: <Profile /> },
				{
					path: 'profile',
					element: <ProfileLayout />,
					children: [
						{
							index: true,
							element: <Navigate to="info" replace />,
						},
						{
							path: 'info',
							element: <ProfileInfo />,
						},
						{
							path: 'reviews',
							element: <ProfileReviews />,
						},
						{
							path: 'comments',
							element: <ProfileComments />,
						},
					],
				},
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
