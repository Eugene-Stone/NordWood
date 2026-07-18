import type { NextConfig } from 'next';

// Next.js использует этот файл вместо vite.config.ts.
// Оставляем конфиг минимальным: маршрутизация, серверные компоненты и загрузка данных
// теперь описаны в папке src/app, а не в настройках сборщика.
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nordwood.onrender.com',
			},
		],
	},
};

export default nextConfig;
