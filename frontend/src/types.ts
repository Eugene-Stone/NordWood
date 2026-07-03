export type ImageFormat = {
	name: string;
	width: number;
	height: number;
	url: string;
	path: string | null;
};

export type ImageFormats = {
	thumbnail?: ImageFormat;
	small?: ImageFormat;
	medium?: ImageFormat;
	large?: ImageFormat;
};

export type Image = {
	id: number;
	alternativeText: string | null;
	url: string | null;
	height: number;
	width: number;
	formats: ImageFormats;
};

export type Link = {
	id: number;
	text: string;
	url: string;
	isExternal: boolean;
	isButton: boolean;
	isLogo: boolean;
	buttonType: 'PRIMARY' | 'SECONDARY';
	image: Image | null;
};

export type Logo = {
	id: number;
	image: Image;
};

export type Menu = {
	id: number;
	MenuLink: Link[];
};

export type LangList = {
	id: number;
	Link: Link[];
};

export type Header = {
	LangList: LangList;
	Logo: Logo;
	Menu: Menu;
};
export type Footer = {
	id: number;
	textTop: string | null;
	textBottom: string | null;
	copyright: string | null;
	Menu: {
		id: number;
		MenuLink: Link[];
	};
};

export type GlobalData = {
	id: string;
	title: string | null;
	description: string | null;
	Header: Header;
	Footer: Footer;
};
