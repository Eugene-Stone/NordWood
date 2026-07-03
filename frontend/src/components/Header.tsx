import useGlobalDataContext from '../context/useGlobalDataContext';
import { BACKEND_URL } from '../../CONSTANTS';
import HeaderMenu from './HeaderMenu';
import HeaderLangList from './HeaderLangList';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

export default function Header() {
	const { globalData } = useGlobalDataContext();
	const { LangList, Logo, Menu } = globalData!.Header!;

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
							{Menu && <HeaderMenu links={Menu} />}

							{LangList && <HeaderLangList langList={LangList} />}
							<button className="toggle-btn">
								<span />
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
