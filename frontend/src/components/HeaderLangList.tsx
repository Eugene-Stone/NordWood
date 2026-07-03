import React from 'react';
import type { LangList } from '@backend-types/types';

type Props = {
	langList: LangList.LangList_Plain;
};

export default function HeaderLangList({ langList }: Props) {
	return (
		<div className="lang-choose hover-dropdown">
			<div className="hover-dropdown-btn">
				<span>Ru</span>
				<i className="hover-dropdown-ic">
					<svg
						width={24}
						height={25}
						viewBox="0 0 24 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3.87039 6.66504L2.10039 8.43504L12.0004 18.335L21.9004 8.43504L20.1304 6.66504L12.0004 14.795L3.87039 6.66504V6.66504Z"
							fill="currentColor"
						/>
					</svg>
				</i>
			</div>
			<div className="lang-lst hover-dropdown-box">
				<div className="hover-dropdown-inner">
					{langList.Link.map((link, i) => (
						<li key={i}>
							<a href={link.url}>{link.text}</a>
						</li>
					))}
				</div>
			</div>
		</div>
	);
}
