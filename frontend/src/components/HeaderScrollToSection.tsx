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

	// const scrollToSection = (to: string) => {
	// 	navigate('/', {
	// 		viewTransition: true,
	// 	});

	// 	setTimeout(() => {
	// 		scroller.scrollTo(to.replace('#', ''), {
	// 			smooth: true,
	// 			offset: -70,
	// 			duration: 900,
	// 		});
	// 	}, 500);
	// };

	const scrollToSection = (to: string) => {
		navigate('/', {
			viewTransition: true,
		});

		const targetId = to.replace('#', '');
		const PRELOADER_SELECTOR = '.preloader'; // Замени на свой класс/селектор

		const executeScroll = () => {
			scroller.scrollTo(targetId, {
				smooth: true,
				offset: -70,
				duration: 900,
			});
		};

		let preloaderDetected = false;

		const observer = new MutationObserver((mutations, obs) => {
			const preloader = document.querySelector(PRELOADER_SELECTOR);

			if (preloader) {
				// Фиксируем, что прелоадер появился в DOM
				preloaderDetected = true;
			} else if (preloaderDetected && !preloader) {
				// Если прелоадер БЫЛ, но теперь его НЕТ — скроллим и отключаем observer
				executeScroll();
				obs.disconnect();
			}
		});

		// Начинаем следить за DOM сразу после вызова navigate
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Предохранитель: если прелоадер вообще не появился в течение 1.5 секунд,
		// скроллим принудительно, чтобы страница не "зависла" без скролла
		setTimeout(() => {
			if (!preloaderDetected) {
				executeScroll();
				observer.disconnect();
			}
		}, 1500);
	};

	if (location.pathname === '/') {
		return (
			<li className={activeSection === url.replace('#', '') ? 'active-li' : ''}>
				<Link
					className="menu__link"
					href={url}
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
