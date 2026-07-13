import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext/useAuthContext';
import { useEffect } from 'react';
import Preloader from '../../components/Preloader';

export default function ProfileLayout() {
	const navigate = useNavigate();
	const { isAuthenticated, logout, loading } = useAuthContext();

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			navigate('/login', {
				replace: true,
				viewTransition: true,
			});
		}
	}, [navigate, isAuthenticated, loading]);

	return loading ? (
		<Preloader />
	) : (
		<section className="nw-profile-section">
			<div className="nw-profile-container">
				<h2 className="nw-auth-title">Личный кабинет</h2>
				<div className="nw-profile-grid">
					<aside className="nw-profile-sidebar">
						<ul className="nw-profile-menu">
							<li className="nw-profile-menu-item">
								<NavLink
									to="/profile/info"
									className={({ isActive }) =>
										isActive
											? 'nw-profile-menu-link nw-profile-menu-link-active'
											: 'nw-profile-menu-link'
									}>
									Профиль
								</NavLink>
							</li>
							<li className="nw-profile-menu-item">
								<NavLink
									to="/profile/reviews"
									className={({ isActive }) =>
										isActive
											? 'nw-profile-menu-link nw-profile-menu-link-active'
											: 'nw-profile-menu-link'
									}>
									История отзывов
								</NavLink>
							</li>
							<li className="nw-profile-menu-item">
								<NavLink
									to="/profile/comments"
									className={({ isActive }) =>
										isActive
											? 'nw-profile-menu-link nw-profile-menu-link-active'
											: 'nw-profile-menu-link'
									}>
									История коментариев
								</NavLink>
							</li>
							<li className="nw-profile-menu-item">
								<button onClick={logout} className="nw-profile-menu-link">
									Выйти
								</button>
							</li>
						</ul>
					</aside>
					<main className="nw-profile-content">
						<Outlet />
					</main>
				</div>
			</div>
		</section>
	);
}
