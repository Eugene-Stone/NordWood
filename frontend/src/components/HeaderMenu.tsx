import { Dispatch, SetStateAction, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import HeaderScrollToSection from './HeaderScrollToSection';

import type { MenuMain } from '@backend-types/types';

type Props = {
	className: string;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
	links: MenuMain.MenuMain_Plain;
};

export default function HeaderMenu({ className, setMenuOpen, links }: Props) {
	const location = useLocation();

	const [activeSection, setActiveSection] = useState('');

	const menuHeader = links.MenuLink.map((link, i) => {
		const target = link.isExternal ? '_blank' : undefined;
		const url = link.url || '';
		const text = link.text || '';
		const isActive = location.pathname === url;

		if (link.isAnchor) {
			return (
				<HeaderScrollToSection
					key={i}
					url={url}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
					setMenuOpen={setMenuOpen}>
					{text}
				</HeaderScrollToSection>
			);
		} else {
			return (
				<li className={isActive ? 'active-li' : ''} key={i}>
					<NavLink
						onClick={() => setMenuOpen(false)}
						to={url}
						target={target}
						viewTransition>
						{text}
					</NavLink>
				</li>
			);
		}
	});

	return (
		<nav className={`mnu-wrap ${className}`}>
			<div className="menu-header-menu-container">
				{menuHeader && <ul className="main-mnu">{menuHeader}</ul>}
			</div>
		</nav>
	);
}
