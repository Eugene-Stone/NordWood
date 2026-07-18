'use client';

import Link from 'next/link';
import ArticleCommentForm from './ArticleCommentForm';
import useAuthContext from '@/context/AuthContext/useAuthContext';

type Props = {
	articleId: string;
};

export default function ArticleCommentGate({ articleId }: Props) {
	const { isAuthenticated, loading } = useAuthContext();

	if (loading) {
		return null;
	}

	if (isAuthenticated) {
		return <ArticleCommentForm articleId={articleId} />;
	}

	return (
		<div className="reviews__leave-notice">
			<p>
				Чтобы оставлять комментарии, <Link href="/login">авторизируйтесь</Link> или{' '}
				<Link href="/registration">зарегистрируйтесь</Link> на&nbsp;сайте.
			</p>
		</div>
	);
}
