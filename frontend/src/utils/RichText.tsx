type Props = {
	className?: string;
	children?: string | null;
};

export default function RichText({ className, children }: Props) {
	// Компонент используется и в Server Components.
	// Браузерный DOMPurify здесь не подходит: на сервере нет window/document.
	// Поэтому HTML должен быть очищен на стороне CMS или отдельным серверным sanitizer.
	const html = children ?? '';

	return (
		<div className={className ? className : ''} dangerouslySetInnerHTML={{ __html: html }} />
	);
}
