import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.scss';
import App from './App.tsx';
import GlobalDataProvider from './context/GlobalDataContext/GlobalDataContext';
import { HelmetProvider } from 'react-helmet-async';
import AuthContextProvider from './context/AuthContext/AuthContext.tsx';

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
