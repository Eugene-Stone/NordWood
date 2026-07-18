import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { BACKEND_URL } from '@/lib/constants';
import type { global } from '@backend-types/types';

type Props = {
	globalData: global.Global_Plain | null;
};

export default function Footer({ globalData }: Props) {
	const { Header, Footer: footerData } = globalData ?? {};
	const { Logo } = Header ?? {};
	const { Menu, textTop, textBottom, copyright } = footerData ?? {};

	return (
		<footer className="foot-general">
			<div className="container-fluid">
				<div className="foot-line">
					<div className="foot-cell">
						<div className="logo-wrap">
							<Link href="/" className="logo">
								{Logo?.image?.url && (
									<img
										src={BACKEND_URL + Logo.image.url}
										alt={Logo.text ?? 'NordWood'}
										width="61"
										height="36"
									/>
								)}
							</Link>
						</div>
					</div>
					<div className="foot-cell">
						<div className="f-itm">{textTop}</div>
						<div className="flex-line">
							<div className="copyright">{copyright}</div>
							{Menu?.MenuLink?.length ? (
								<nav className="foot-nav">
									<ul>
										{Menu.MenuLink.map((link, index) => (
											<li key={index}>
												<a href={link.url || '/'} target={link.isExternal ? '_blank' : undefined}>
													{link.text}
												</a>
											</li>
										))}
									</ul>
								</nav>
							) : null}
						</div>
						<div className="f-itm">
							<ReactMarkdown>{textBottom ?? ''}</ReactMarkdown>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
