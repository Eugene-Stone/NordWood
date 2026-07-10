import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, scroller } from 'react-scroll';
import { FRONTEND_URL } from '../../CONSTANTS';

type Props = {
	url: string;
	children: ReactNode;
	activeSection: string;
	setActiveSection: Dispatch<SetStateAction<string>>;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderScrollToSection({
	url,
	activeSection,
	setActiveSection,
	children,
	setMenuOpen,
}: Props) {
	const location = useLocation();
	const navigate = useNavigate();
	// console.log(url);

	const handleSetActive = (to: string) => {
		setActiveSection(to);
	};
	// console.log(activeSection);

	const scrollToSection = (to: string) => {
		// navigate('/');
		navigate('/', {
			viewTransition: true,
		});

		setTimeout(() => {
			scroller.scrollTo(to.replace('#', ''), {
				smooth: true,
				offset: -70,
				duration: 900,
			});
		}, 500);
	};

	// console.log(location.pathname);
	// console.log(url);

	if (location.pathname === '/') {
		return (
			<li className={activeSection === url.replace('#', '') ? 'active-li' : ''}>
				<Link
					className="menu__link"
					to={url.replace('#', '')}
					spy={true}
					activeClass="active"
					onSetActive={handleSetActive}
					smooth={true}
					offset={-70}
					duration={900}
					onClick={() => setMenuOpen(false)}>
					{children}
				</Link>
			</li>
		);
	} else {
		return (
			<li>
				<button
					className="menu__link"
					onClick={() => (setMenuOpen(false), scrollToSection(url))}>
					{children}
				</button>
			</li>
		);
	}
}
