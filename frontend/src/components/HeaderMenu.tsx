import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import HeaderScrollToSection from './HeaderScrollToSection';

import type { MenuMain } from '@backend-types/types';

type Props = {
	className: string;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
	links: MenuMain.MenuMain_Plain;
};

export default function HeaderMenu({ className, setMenuOpen, links }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const [activeSection, setActiveSection] = useState('');

	const menuHeader = links.MenuLink.map((link, i) => {
		const target = link.isExternal ? '_blank' : undefined;
		const url = link.url || '';
		const text = link.text || '';
		const isActive = pathname === url;

		if (link.isAnchor) {
			return (
				<HeaderScrollToSection
					key={i}
					url={url}
					pathname={pathname}
					router={router}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
					setMenuOpen={setMenuOpen}>
					{text}
				</HeaderScrollToSection>
			);
		} else {
			return (
				<li className={isActive ? 'activeLi' : ''} key={i}>
					<Link
						onClick={() => setMenuOpen(false)}
						href={url || '/'}
						target={target}>
						{text}
					</Link>
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
