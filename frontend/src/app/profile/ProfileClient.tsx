'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useAuthContext from '@/context/AuthContext/useAuthContext';
import Preloader from '@/components/Preloader';
import ProfileInfo from '@/legacy-pages/Profile/ProfileInfo';
import ProfileReviews from '@/legacy-pages/Profile/ProfileReviews';
import ProfileComments from '@/legacy-pages/Profile/ProfileComments';

type ProfileView = 'info' | 'reviews' | 'comments';

type Props = {
	view: ProfileView;
};

const menuItems: Array<{ href: string; label: string; view: ProfileView }> = [
	{ href: '/profile/info', label: 'Профиль', view: 'info' },
	{ href: '/profile/reviews', label: 'История отзывов', view: 'reviews' },
	{ href: '/profile/comments', label: 'История коментариев', view: 'comments' },
];

export default function ProfileClient({ view }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const { user, isAuthenticated, loading, logout } = useAuthContext();

	if (loading) {
		return <Preloader />;
	}

	if (!isAuthenticated) {
		router.replace('/login');
		return <Preloader />;
	}

	const content = {
		info: <ProfileInfo />,
		reviews: <ProfileReviews />,
		comments: <ProfileComments />,
	}[view];

	return (
		<section className="nw-profile-section">
			<div className="nw-profile-container">
				<h2 className="nw-auth-title">Личный кабинет</h2>
				<div className="nw-profile-grid">
					<aside className="nw-profile-sidebar">
						<ul className="nw-profile-menu">
							{menuItems.map((item) => (
								<li className="nw-profile-menu-item" key={item.href}>
									<Link
										href={item.href}
										className={
											pathname === item.href
												? 'nw-profile-menu-link nw-profile-menu-link-active'
												: 'nw-profile-menu-link'
										}>
										{item.label}
									</Link>
								</li>
							))}
							<li className="nw-profile-menu-item">
								<button
									className="nw-profile-menu-link"
									onClick={() => {
										logout();
										router.push('/login');
									}}>
									Выйти
								</button>
							</li>
						</ul>
					</aside>
					<main className="nw-profile-content">{content}</main>
				</div>
			</div>
		</section>
	);
}
