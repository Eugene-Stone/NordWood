import useGlobalDataContext from '../context/GlobalDataContext/useGlobalDataContext';
import { BACKEND_URL } from '../../CONSTANTS';
import HeaderMenu from './HeaderMenu';
import HeaderLangList from './HeaderLangList';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthContext from '../context/AuthContext/useAuthContext';
import { scrollToTop } from '../utils/scrollToTop';

export default function Header() {
	const { globalData } = useGlobalDataContext();
	const { LangList, Logo, Menu } = globalData!.Header!;
	const [menuOpen, setMenuOpen] = useState(false);

	const { isAuthenticated, logout } = useAuthContext();

	function toggleMenu() {
		setMenuOpen(!menuOpen);
	}

	return (
		<header className="head-general">
			<div className="head-top ">
				<div className="container-fluid">
					<div className="head-line">
						<div className="head-cell">
							<div className="logo-wrap">
								<NavLink
									to={'/'}
									onClick={scrollToTop}
									className="logo"
									viewTransition>
									<img src={BACKEND_URL + Logo?.image?.url} alt={Logo?.text} />
								</NavLink>
								{/* <a href={'/'} className="logo">
									<img src={BACKEND_URL + Logo?.image?.url} alt={Logo?.text} />
								</a> */}
							</div>
						</div>
						<div className="head-cell">
							{Menu && (
								<HeaderMenu
									className={`${menuOpen ? 'open' : ''}`}
									setMenuOpen={setMenuOpen}
									links={Menu}
								/>
							)}

							{/* {LangList && <HeaderLangList langList={LangList} />} */}

							<div className="login-link">
								{isAuthenticated ? (
									<>
										<Link to="/profile" viewTransition>
											<svg
												style={{ display: 'block' }}
												fill="none"
												height={30}
												viewBox="0 0 24 24"
												width={30}
												xmlns="http://www.w3.org/2000/svg">
												<g
													stroke="#000"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}>
													<path d="m16 7c0 2.20914-1.7909 4-4 4-2.20914 0-4-1.79086-4-4s1.79086-4 4-4c2.2091 0 4 1.79086 4 4z" />
													<path d="m12 14c-3.86599 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z" />
												</g>
											</svg>
										</Link>

										{/* <button onClick={logout}>Выйти</button> */}
									</>
								) : (
									<Link to="/login" viewTransition>
										Войти
									</Link>
								)}
							</div>

							<button
								className={`toggle-btn ${menuOpen ? 'on' : ''}`}
								onClick={toggleMenu}>
								<span />
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
