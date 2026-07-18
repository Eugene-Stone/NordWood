'use client';

import type { PropsWithChildren } from 'react';
import AuthContextProvider from '@/context/AuthContext/AuthContext';

// Это единственная клиентская обёртка на весь сайт.
// В Next.js важно держать такие провайдеры как можно тоньше:
// всё, что попадает внутрь client component boundary, увеличивает браузерный bundle.
export default function AppProviders({ children }: PropsWithChildren) {
	return <AuthContextProvider>{children}</AuthContextProvider>;
}
