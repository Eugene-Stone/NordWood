import { useMemo } from 'react';
import DOMPurify from 'dompurify';

type Props = {
	className?: string;
	children?: string | null;
};

export default function RichText({ className, children }: Props) {
	const html = useMemo(() => DOMPurify.sanitize(children ?? ''), [children]);

	return (
		<div className={className ? className : ''} dangerouslySetInnerHTML={{ __html: html }} />
	);
}
