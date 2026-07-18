import type { Metadata } from 'next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './globals.scss';
import { getGlobalData } from '@/lib/backend';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ButtonScrollTop from '@/components/ButtonScrollTop';
import AppProviders from '@/components/AppProviders';

export const metadata: Metadata = {
	title: 'NordWood',
	description: 'NordWood',
	icons: {
		icon: '/img/favicon.png',
	},
};

// Контент приходит из Strapi, поэтому корневой layout делаем динамическим.
// Шапка и футер берут данные из Strapi.
// Поэтому layout нельзя полностью собрать один раз во время npm run build:
// иначе меню/логотип/футер могут устареть до следующей пересборки проекта.
// force-dynamic говорит Next.js рендерить этот layout на сервере при запросах.
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	// Это серверный компонент: данные для шапки/футера грузятся на сервере,
	// а в браузер уходит уже готовая HTML-разметка.
	const globalData = await getGlobalData();

	return (
		<html lang="ru" data-scroll-behavior="smooth">
			<body>
				<AppProviders>
					<div className="wrapper">
						<Header globalData={globalData} />
						<div className="layout">
							<main className="page-wrap">{children}</main>
						</div>
						<Footer globalData={globalData} />
						<ButtonScrollTop />
					</div>
				</AppProviders>
			</body>
		</html>
	);
}
