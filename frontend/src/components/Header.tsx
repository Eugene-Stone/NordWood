import useGlobalDataContext from '../context/GlobalDataContext/useGlobalDataContext';
import { BACKEND_URL } from '../../CONSTANTS';
import HeaderMenu from './HeaderMenu';
import HeaderLangList from './HeaderLangList';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from '../context/AuthContext/useAuthContext';

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
								{/* <NavLink to={'/'} onClick={scrollToTop} className="logo">
									<img src={BACKEND_URL + Logo?.image?.url} alt={Logo?.text} />
								</NavLink> */}
								<a href={'/'} className="logo">
									<img src={BACKEND_URL + Logo?.image?.url} alt={Logo?.text} />
								</a>
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

							{LangList && <HeaderLangList langList={LangList} />}
							<div className="login-link">
								{isAuthenticated ? (
									<button onClick={logout}>Выйти</button>
								) : (
									<Link to="/login">Войти</Link>
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
