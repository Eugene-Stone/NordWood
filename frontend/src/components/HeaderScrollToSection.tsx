import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { Link, scroller } from 'react-scroll';

type RouterLike = {
	push: (href: string) => void;
};

type Props = {
	url: string;
	pathname: string;
	router: RouterLike;
	children: ReactNode;
	activeSection: string;
	setActiveSection: Dispatch<SetStateAction<string>>;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderScrollToSection({
	url,
	pathname,
	router,
	activeSection,
	setActiveSection,
	children,
	setMenuOpen,
}: Props) {
	const handleSetActive = (to: string) => {
		setActiveSection(to);
	};

	const scrollToSection = (to: string) => {
		// Если пользователь находится не на главной, сначала переходим на `/`,
		// потому что якорные секции живут именно там.
		router.push('/');

		const targetId = to.replace('#', '');
		const PRELOADER_SELECTOR = '.preloader';

		const executeScroll = () => {
			// react-scroll отвечает только за плавную прокрутку внутри уже открытой страницы.
			// Навигацию между страницами делает Next router выше.
			scroller.scrollTo(targetId, {
				smooth: true,
				offset: -70,
				duration: 900,
			});
		};

		let preloaderDetected = false;

		// После перехода на главную может появиться прелоадер.
		// MutationObserver ждёт, пока он исчезнет, и только потом скроллит к секции.
		const observer = new MutationObserver((mutations, obs) => {
			const preloader = document.querySelector(PRELOADER_SELECTOR);

			if (preloader) {
				preloaderDetected = true;
			} else if (preloaderDetected && !preloader) {
				executeScroll();
				obs.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Предохранитель: если прелоадер не появился, всё равно скроллим.
		// Без этого редкий сценарий мог бы оставить пользователя на верху страницы.
		setTimeout(() => {
			if (!preloaderDetected) {
				executeScroll();
				observer.disconnect();
			}
		}, 1500);
	};

	if (pathname === '/') {
		return (
			<li className={activeSection === url.replace('#', '') ? 'activeLi' : ''}>
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
