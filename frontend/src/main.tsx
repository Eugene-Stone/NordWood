import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.scss';
import App from './App.tsx';
import GlobalDataProvider from './context/GlobalDataContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GlobalDataProvider>
			<App />
		</GlobalDataProvider>
	</StrictMode>,
);
