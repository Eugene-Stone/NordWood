import useGlobalDataContext from '../context/useGlobalDataContext';
import { BACKEND_URL } from '../../CONSTANTS';
import HeaderLangList from './HeaderLangList';

export default function Header() {
	const { globalData } = useGlobalDataContext();
	// if (!globalData?.Header) return null;

	const { LangList, Logo, Menu } = globalData!.Header!;

	const menuHeader = Menu?.MenuLink.map((link, index) => {
		let target;
		if (link.isExternal) {
			target = '_blank';
		}
		return (
			<li key={index}>
				<a href={link.url} target={target}>
					{link.text}
				</a>
			</li>
		);
	});

	// console.log(LangList);

	return (
		<>
			<header className="head-general">
				<div className="head-top ">
					<div className="container-fluid">
						<div className="head-line">
							<div className="head-cell">
								<div className="logo-wrap">
									<a href="/" className="logo">
										<img
											src={BACKEND_URL + Logo?.image?.url}
											alt={Logo?.text}
										/>
									</a>
								</div>
							</div>
							<div className="head-cell">
								<nav className="mnu-wrap">
									<div className="menu-header-menu-container">
										{menuHeader && <ul className="main-mnu">{menuHeader}</ul>}
									</div>
								</nav>
								{LangList && <HeaderLangList langList={LangList} />}
								<button className="toggle-btn">
									<span />
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* header END */}
		</>
	);
}
