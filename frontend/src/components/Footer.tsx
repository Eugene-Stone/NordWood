import ReactMarkdown from 'react-markdown';
import useGlobalDataContext from '../context/useGlobalDataContext';
import { BACKEND_URL } from '../../CONSTANTS';

export default function Footer() {
	const { globalData } = useGlobalDataContext();
	const { Logo } = globalData!.Header!;
	const { Menu, textTop, textBottom, copyright } = globalData!.Footer!;
	// console.log(Logo);

	const menuFooter = Menu?.MenuLink.map((link, index) => {
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

	return (
		<>
			<footer className="foot-general">
				<div className="container-fluid">
					<div className="foot-line">
						<div className="foot-cell">
							<div className="logo-wrap">
								<a href="/" className="logo">
									<img src={BACKEND_URL + Logo?.image?.url} alt={Logo?.text} />
								</a>
							</div>
						</div>
						<div className="foot-cell">
							<div className="f-itm">{textTop}</div>
							<div className="flex-line">
								<div className="copyright">{copyright}</div>
								{menuFooter && (
									<nav className="foot-nav">
										<ul>{menuFooter}</ul>
									</nav>
								)}
							</div>
							<div className="f-itm">
								<ReactMarkdown>{textBottom}</ReactMarkdown>
							</div>
						</div>
					</div>
				</div>
			</footer>
			{/* footer END */}
		</>
	);
}
