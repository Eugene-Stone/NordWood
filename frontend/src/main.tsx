import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthContextProvider from './context/AuthContext/AuthContext.tsx';
import GlobalDataProvider from './context/GlobalDataContext/GlobalDataContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './styles/style.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthContextProvider>
			<GlobalDataProvider>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</GlobalDataProvider>
		</AuthContextProvider>
	</StrictMode>,
);
