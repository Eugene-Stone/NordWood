import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // или твой плагин для реакта

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Загружаем переменные окружения из .env файлов в текущем рабочем каталоге
	const env = loadEnv(mode, process.cwd(), '');

	// Если VITE_FRONTEND задан, используем пустую строку '', иначе '/NordWood'
	const base = env.VITE_FRONTEND ? '' : '/NordWood';

	return {
		plugins: [react()],
		base: base,
	};
});
